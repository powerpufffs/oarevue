<template>
  <v-progress-linear v-if="loading" indeterminate />
  <OareContentView v-else :title="groupName">
    <template v-slot:header>
      <router-link to="/admin">&larr; Back to admin view</router-link>
    </template>
    <OareSubheader>Users</OareSubheader>
    <OareListItem v-for="user in groupUsers" :key="user.id">{{user.name}}</OareListItem>

    <v-dialog v-model="addUserDialog" width="500">
      <template v-slot:activator="{on}">
        <v-btn color="primary" v-on="on">
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
          <v-btn @click="addUsers" color="primary">Add</v-btn>
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
      addUserDialog: false
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
      let postForm = {
        group_id: Number(this.groupId),
        users: []
      };
      this.checkedUsers.forEach(user => {
        postForm.users.push(Number(user.id));
      });

      let { data } = await this.$axios.post("/user_group", postForm);
      this.groupUsers = data.users;
      this.addUserDialog = false;
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
  }
};
</script>

<style>
</style>