<template>
  <v-app-bar app dark clipped-left color="#002E5D">
    <v-app-bar-nav-icon v-if="$route.path !== '/landing'" @click="$emit('nav-icon-click')" />
    <v-toolbar-title>
      <v-container>
        <v-row>
          <v-col v-if="$vuetify.breakpoint.lgAndUp" sm="2">
            <a href="https://byu.edu" target="_blank">
              <v-img src="img/BYU_abbrev.png" class="mt-5" max-height="50px" max-width="120px" />
            </a>
          </v-col>
          <v-col cols="10" sm="9" offset-sm="1">
            <v-row class="subtitle-1">
              <a
                class="blue-grey--text text--lighten-3 no_underline"
                href="https://history.byu.edu"
                target="_blank"
              >History Department</a>
            </v-row>
            <v-row class="headline">
              <router-link class="white--text no_underline" to="/">{{title}}</router-link>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar-title>
    <v-spacer />
    <div v-if="$vuetify.breakpoint.smAndUp">
      <v-btn text to="/admin">Admin</v-btn>
      <v-btn text to="/landing" class="mr-2">About</v-btn>
      <v-btn v-if="!$store.getters.isAuthenticated" text to="/login">Login</v-btn>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Welcome, {{$store.getters.user.first_name}}</v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-menu offset-y v-else>
      <template v-slot:activator="{ on }">
        <v-btn icon small v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="$router.push('/landing')">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout" v-if="$store.getters.isAuthenticated">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item v-else @click="$router.push('/login')">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    title() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return "OARE";
      }
      return "Old Assyrian Research Environment";
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.no_underline {
  text-decoration: none;
}
</style>