<template>
  <v-progress-linear v-if="loading" indeterminate />
  <OareContentView v-else :title="groupName">
    <template v-slot:header>
      <router-link to="/admin">&larr; Back to admin view</router-link>
    </template>
    <OareSubheader>Members of {{ groupName }}</OareSubheader>
    <OareListItem v-for="user in groupUsers" :key="user.id">
      {{ user.name }}
      <v-btn
        text
        icon
        small
        @click="
          deleteUserDialog = true;
          deleteUser = user;
        "
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </OareListItem>

    <!-- Dialog for adding a new user to the group -->
    <v-dialog v-model="addUserDialog" width="500">
      <template v-slot:activator="{ on }">
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
          <v-btn @click="addUserDialog = false" color="error" text
            >Cancel</v-btn
          >
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
          {{ !!deleteUser ? deleteUser.name : "" }}
          from this group?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="error" @click="deleteUserDialog = false"
            >No, don't delete</v-btn
          >
          <v-btn color="primary" @click="deleteUserGroup">
            <OareButtonSpinner v-if="deleteUserLoading" />
            <span v-else>Yes, delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <OareSubheader class="mt-6">Text Permissions</OareSubheader>
    <v-dialog v-model="addTextDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="mt-2 mr-3" v-on="on">
          <v-icon>mdi-plus</v-icon>Add Text
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add Text</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <strong>Text Name</strong>
              </v-col>
              <v-col cols="4">
                <strong>Can edit?</strong>
              </v-col>
            </v-row>
            <v-row
              v-for="text in filteredTexts"
              :key="text.text_id"
              align-content="center"
            >
              <v-col cols="4">
                <v-checkbox
                  class="pa-0"
                  v-model="textChecked[text.text_id]"
                  :label="text.alias_name"
                />
              </v-col>
              <v-col cols="4">
                <v-checkbox class="pa-0" v-model="editTexts[text.text_id]" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="error" @click="addTextDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="primary" @click="addTextPerms">
            <OareButtonSpinner v-if="addTextLoading" />
            <span v-else>Save</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="500" v-model="dialogs.removePermissions">
      <template v-slot:activator="{ on }">
        <v-btn
          color="error"
          v-on="on"
          class="mt-2"
          :disabled="selectedPermRows.length < 1"
          >Remove selected permissions</v-btn
        >
      </template>
      <v-card>
        <v-card-title>Remove permissions</v-card-title>
        <v-card-text>
          Are you sure you want to delete these permissions? Members of this
          group will no longer have read or write access to the following texts:
          <ul>
            <li v-for="perm in selectedPermRows" :key="perm.text_id">
              {{ perm.alias_name }}
            </li>
          </ul>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            text
            @click="$set(dialogs, 'removePermissions', false)"
            >No, don't delete</v-btn
          >
          <v-btn color="primary" @click="deleteTextPerms">
            <OareButtonSpinner v-if="loadings.deleteTextPerms" />
            <span v-else>Yes, delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="permsHeaders"
      :items="groupPerms"
      disable-sort
      show-select
      v-model="selectedPermRows"
      item-key="text_id"
      class="mt-3"
    >
      <template v-slot:item.can_write="{ item }">{{
        item.can_write ? "Yes" : "No"
      }}</template>
    </v-data-table>
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
      allTexts: [],
      userChecked: {}, // Maps user id to if they are checked
      textChecked: {}, //Maps text id to if it is checked
      editTexts: {}, //Maps text id to if it has write permission
      groupPerms: [], // List of text permissions
      loading: true,
      addUserDialog: false,
      addTextDialog: false,
      addUsersLoading: false,
      deleteUserDialog: false,
      deleteUser: null,
      deleteUserLoading: false,
      addTextLoading: false,
      permsHeaders: [
        { text: "Text Name", value: "alias_name" },
        { text: "Can edit?", value: "can_write" }
      ],
      selectedPermRows: [],
      dialogs: {
        removePermissions: false
      },
      loadings: {
        deleteTextPerms: false
      }
    };
  },

  computed: {
    filteredUsers() {
      let userIds = this.groupUsers.map(item => item.user_id);
      return this.allUsers.filter(item => !userIds.includes(item.id));
    },

    filteredTexts() {
      let groupTextIds = this.groupPerms.map(item => item.text_id);

      return this.allTexts.filter(item => {
        return !groupTextIds.includes(item.text_id);
      });
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

    async deleteTextPerms() {
      this.$set(this.loadings, "deleteTextPerms", true);
      let { data: texts } = await this.$axios.put(`/group_rw/${this.groupId}`, {
        texts: this.selectedPermRows.map(item => item.text_id)
      });
      this.$set(this.loadings, "deleteTextPerms", false);
      this.$set(this.dialogs, "removePermissions", false);
      this.groupPerms = texts;
    },

    async addTextPerms() {
      this.addTextLoading = true;
      let addTexts = this.allTexts
        .filter(text => this.textChecked[text.text_id])
        .map(text => {
          return {
            text_id: text.text_id,
            can_write: this.editTexts[text.text_id]
          };
        });
      let { data: texts } = await this.$axios.post("/group_rw", {
        group_id: Number(this.groupId),
        texts: addTexts
      });
      this.groupPerms = texts.permissions;
      this.addTextDialog = false;
      this.addTextLoading = false;
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
    console.log('HEEEEEEEEEEEEY')
    let response = await this.$axios.get(`/group/${this.groupId}`);
    this.groupName = response.data.name;
    this.groupUsers = response.data.users;
    console.log(this.groupName)

    response = await this.$axios.get("/users");
    this.allUsers = response.data;
    this.allUsers.forEach(user => {
      this.$set(this.userChecked, user.id, false);
    });

    let { data: texts } = await this.$axios.get("/text_text");
    this.allTexts = texts;
    this.allTexts.forEach(text => {
      this.$set(this.textChecked, text.text_id, false);
      this.$set(this.editTexts, text.text_id, false);
    });

    let { data: groupPerms } = await this.$axios.get(
      `/group_rw/${this.groupId}`
    );
    this.groupPerms = groupPerms.permissions;

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
    addTextDialog(open) {
      if (!open) {
        this.allTexts.forEach(text => {
          this.$set(this.textChecked, text.text_id, false);
          this.$set(this.editTexts, text.text_id, false);
        });
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

<style></style>
