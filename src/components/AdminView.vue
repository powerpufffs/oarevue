<template>
  <OareContentView title="Admin">
    <OareSubheader>Groups</OareSubheader>
    <v-progress-linear v-if="loading" indeterminate />
    <v-container v-else>
      <v-row v-for="group in groups" :key="group.id">
        <v-col cols="2">
          <OareListItem>
            <router-link :to="`/groups/${group.id}`">{{ group.name }}</router-link>
          </OareListItem>
        </v-col>
        <v-col cols="2">
          <v-progress-circular v-if="groupsDeleted[group.id]" indeterminate />
          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                text
                icon
                small
                v-on="on"
                @click="deleteGroupId=group.id; confirmDeleteDialog=true"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog for adding a new group -->
    <v-dialog v-model="addDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary">
          <v-icon class="mr-2">mdi-plus</v-icon>Add Group
        </v-btn>
      </template>
      <v-card class="pa-3">
        <v-card-title primary-title>Add Group</v-card-title>
        <v-card-text>
          <v-text-field v-model="groupName" @keyup.enter="submitGroup" outlined label="Group Name" />
          <p class="subtitle error--text">{{addGroupErrorMsg}}</p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="addDialog=false" color="error">Cancel</v-btn>
          <v-btn color="primary" @click="submitGroup">
            <v-progress-circular v-if="addGroupLoading" indeterminate size="25" width="3" />
            <span v-else>Submit</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for editing a group name -->
    <v-dialog v-model="editDialog" width="500">
      <v-card>
        <v-card-title>Edit Group</v-card-title>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDeleteDialog" width="500">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text
          class="subtitle-1"
        >Are you sure you want to delete this group? This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmDeleteDialog=false" text color="error">No, don't delete</v-btn>
          <v-btn @click="confirmDeleteDialog=false; deleteGroup()" color="primary">Yes, delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </OareContentView>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Admin?",
          value: "is_admin"
        }
      ],
      items: [],
      groups: [],
      authenticated: false,
      loading: true,
      addDialog: false,
      confirmDeleteDialog: false,
      editDialog: false,
      groupName: "",
      deleteGroupId: null,
      addGroupLoading: false,
      addGroupErrorMsg: "",
      groupsDeleted: {} // Maps a group ID to if it's being deleted
    };
  },

  methods: {
    async submitGroup() {
      if (this.groupName.trim() === "") {
        this.addGroupErrorMsg = "Group name cannot be blank.";
        return;
      }
      try {
        this.addGroupLoading = true;
        let { data } = await this.$axios.post("/group", {
          group_name: this.groupName
        });
        this.groups.push(data);
        this.addGroupLoading = false;
        this.addDialog = false;
      } catch (err) {
        this.addGroupLoading = false;
        this.addGroupErrorMsg = err.response.data.message;
      }
    },

    async deleteGroup() {
      try {
        this.$set(this.groupsDeleted, this.deleteGroupId, true);
        await this.$axios.delete(`/group/${this.deleteGroupId}`);
        this.groups = this.groups.filter(
          item => item.id !== this.deleteGroupId
        );
        this.$set(this.groupsDeleted, this.deleteGroupId, false);
      } catch (err) {
        this.$set(this.groupsDeleted, this.deleteGroupId, false);
        console.error(err);
      }
    }
  },

  async mounted() {
    let { data } = await this.$axios.get("/group");
    this.groups = data;
    this.loading = false;
  },

  watch: {
    addDialog(open) {
      if (!open) {
        this.groupName = "";
        this.addGroupErrorMsg = "";
        this.deleteGroupId = null;
      }
    },

    groups: {
      handler(newGroups) {
        newGroups.forEach(group => {
          this.$set(this.groupsDeleted, group.id, false);
        });
      },
      deep: true
    }
  }
};
</script>

<style>
</style>