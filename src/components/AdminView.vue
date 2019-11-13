<template>
  <OareContentView title="Admin">
    <OareSubheader>Groups</OareSubheader>

    <!-- <v-container v-else>
      <v-row v-for="group in groups" :key="group.id">
        <v-col cols="2">
          <OareListItem>
            <router-link :to="`/groups/${group.id}`">{{
              group.name
            }}</router-link>
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
                @click="
                  deleteGroupId = group.id;
                  confirmDeleteDialog = true;
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container> -->

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
          <v-text-field
            v-model="groupName"
            @keyup.enter="submitGroup"
            outlined
            label="Group Name"
          />
          <p class="subtitle error--text">{{ addGroupErrorMsg }}</p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="addDialog = false" color="error">Cancel</v-btn>
          <v-btn color="primary" @click="submitGroup">
            <OareButtonSpinner v-if="addGroupLoading" />
            <span v-else>Submit</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="info"
          class="ml-3"
          :disabled="selectedGroups.length < 1"
          >Actions</v-btn
        >
      </template>
      <v-list>
        <v-list-item @click="confirmDeleteDialog = true">
          <v-list-item-title>Delete group</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-data-table
      :headers="headers"
      :items="groups"
      show-select
      disable-sort
      item-key="id"
      v-model="selectedGroups"
      :loading="loading"
      class="mt-3"
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="`/groups/${item.id}`">{{ item.name }}</router-link>
      </template>
    </v-data-table>

    <v-dialog v-model="confirmDeleteDialog" width="500">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text class="subtitle-1"
          >All users and permissions will be removed from the following groups.
          Are you sure you want to delete these groups?
          <ul>
            <li v-for="group in selectedGroups" :key="group.id">
              {{ group.name }}
            </li>
          </ul>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmDeleteDialog = false" text color="error"
            >No, don't delete</v-btn
          >
          <v-btn @click="deleteGroups" color="primary">
            <OareButtonSpinner v-if="deleteGroupLoading" />
            <span v-else>Yes, delete</span>
          </v-btn>
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
          text: "Group Name",
          value: "name"
        },
        {
          text: "Users",
          value: "num_users"
        }
      ],
      groups: [],
      selectedGroups: [],
      authenticated: false,
      loading: true,
      addDialog: false,
      confirmDeleteDialog: false,
      groupName: "",
      addGroupLoading: false,
      addGroupErrorMsg: "",
      deleteGroupLoading: false
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

    async deleteGroups() {
      try {
        this.deleteGroupLoading = true;
        let delGroupIds = this.selectedGroups.map(item => item.id);

        let { data: newGroups } = await this.$axios.put("/group", {
          group_ids: delGroupIds
        });

        this.groups = newGroups;
        this.selectedGroups = [];
      } catch (err) {
        console.error(err);
      } finally {
        this.confirmDeleteDialog = false;
        this.deleteGroupLoading = false;
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
    }
  }
};
</script>

<style></style>
