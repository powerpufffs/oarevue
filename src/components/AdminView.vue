<template>
  <OareContentView title="Admin">
    <!-- <v-data-table :headers="headers" :items="items" :loading="loading">
      <template v-slot:item.is_admin="{ item }">
        <v-switch :input-value="item.is_admin" @change="toggleAdmin(item.id, $event)" />
      </template>
    </v-data-table> -->
    <OareSubheader>Groups</OareSubheader>
    <v-progress-linear v-if="loading" indeterminate />
    <OareListItem v-else v-for="group in groups" :key="group.id">{{ group.name }}</OareListItem>

  </OareContentView>
</template>

<script>
import axios from "axios";
import Constants from "../constants";
import store from "../store";

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
      dialog: false
    };
  },

  beforeRouteEnter(to, from, next) {
    if (!store.getters.user.is_admin) {
      next("/");
    } else {
      next();
    }
  },

  mounted() {
    this.$axios.get('/group', {
      headers: {
        Authorization: this.auth
      }
    }).then(({ data}) => {
      this.groups = data
      this.loading = false
    })
  },

  methods: {
    toggleAdmin(id, val) {
      axios
        .patch(
          `${Constants.API_PATH}/toggle_admin`,
          {
            user_id: id,
            admin: val
          },
          {
            headers: {
              Authorization: this.auth
            }
          }
        )
        .then(({ data }) => {
          let index = this.items.findIndex(item => item.id === id);
          this.$set(this.items[index], "is_admin", data.admin);
        });
    }
  },

  computed: {
    auth() {
      let jwt = this.$store.getters.jwt;
      return `Bearer: ${jwt}`;
    }
  }
};
</script>

<style>
</style>