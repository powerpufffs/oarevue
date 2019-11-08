<template>
  <v-progress-linear v-if="loading" indeterminate />
  <OareContentView v-else :title="groupName">
    <template v-slot:header>
      <router-link to="/admin">&larr; Back to admin view</router-link>
    </template>
    <OareSubheader>Members of {{groupName}}</OareSubheader>
    <OareListItem v-for="user in groupUsers" :key="user.id">
      {{user.name}}
      <v-btn text icon small @click="deleteUserDialog=true; deleteUser=user">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </OareListItem>

    <!-- Dialog for adding a new user to the group -->
    <v-dialog v-model="addUserDialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn class="mt-4" color="primary" v-on="on">
          <v-icon>mdi-plus</v-icon>Add users
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add Users</v-card-title>
        <v-card-text>
          <v-checkbox
            v-for="user in filteredUsers"
            v-model="userChecked[user.id]"
            :key="user.id"
            :label="`${user.name} - ${user.email}`"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn @click="addUserDialog=false" color="error" text>Cancel</v-btn>
          <v-btn @click="addUsers" color="primary">
            <OareButtonSpinner v-if="addUsersLoading" />
            <span v-else>Add</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for removing a user from the group -->
    <v-dialog v-model="deleteUserDialog" width="500">
      <v-card>
        <v-card-title>Confirm delete</v-card-title>
        <v-card-text>
          Are you sure you want to remove
          {{ !!deleteUser ? deleteUser.name : ""}}
          from this group?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="error" @click="deleteUserDialog=false">No, don't delete</v-btn>
          <v-btn color="primary" @click="deleteUserGroup">
            <OareButtonSpinner v-if="deleteUserLoading" />
            <span v-else>Yes, delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </OareContentView>
</template>

<script>
export default {
  props: {
    groupId: {
      required: true
    }
  },
  data() {
    return {
      groupName: "",
      groupUsers: [],
      allUsers: [],
      userChecked: {}, // Maps user id to if they are checked
      loading: true,
      addUserDialog: false,
      addUsersLoading: false,
      deleteUserDialog: false,
      deleteUser: null,
      deleteUserLoading: false
    };
  },

  computed: {
    filteredUsers() {
      let userIds = this.groupUsers.map(item => item.user_id);
      return this.allUsers.filter(item => !userIds.includes(item.id));
    },

    checkedUsers() {
      let checkedUsers = [];

      this.allUsers.forEach(item => {
        if (this.userChecked[item.id]) {
          checkedUsers.push(item);
        }
      });
      return checkedUsers;
    }
  },

  methods: {
    async addUsers() {
      this.addUsersLoading = true;
      let postForm = {
        group_id: Number(this.groupId),
        users: []
      };
      this.checkedUsers.forEach(user => {
        postForm.users.push(Number(user.id));
      });

      try {
        let { data } = await this.$axios.post("/user_group", postForm);
        this.groupUsers = data.users;
        this.addUserDialog = false;
      } catch (err) {
      } finally {
        this.addUsersLoading = false;
      }
    },

    async deleteUserGroup() {
      this.deleteUserLoading = true;
      let { data } = await this.$axios.delete(
        `/user_group?user_id=${this.deleteUser.user_id}&group_id=${this.groupId}`
      );
      this.deleteUserLoading = false;
      this.deleteUserDialog = false;
      this.groupUsers = data;
    }
  },

  async mounted() {
    let response = await this.$axios.get(`/group/${this.groupId}`);
    this.groupName = response.data.name;
    this.groupUsers = response.data.users;

    response = await this.$axios.get("/get_users");
    this.allUsers = response.data;
    this.allUsers.forEach(user => {
      this.$set(this.userChecked, user.id, false);
    });

    this.loading = false;
  },

  watch: {
    addUserDialog(open) {
      if (!open) {
        for (let id in this.userChecked) {
          this.$set(this.userChecked, id, false);
        }
      }
    },
    deleteUserDialog(open) {
      if (!open) {
        this.deleteUser = null;
      }
    }
  }
};
</script>

<style>
</style>