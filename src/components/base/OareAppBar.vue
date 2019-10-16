<template>
  <v-app-bar app dark clipped-left color="#002E5D">
    <v-app-bar-nav-icon v-if="$route.path !== '/landing'" @click="$emit('nav-icon-click')" />
    <v-toolbar-title>
      <v-container>
        <v-row>
          <v-col v-if="$vuetify.breakpoint.smAndUp" sm="2">
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
    <v-btn text to="/landing">About</v-btn>
    <v-btn text to="/login">Login</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    title() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "OARE";
      }
      return "Old Assyrian Research Environment";
    }
  }
};
</script>

<style scoped>
.no_underline {
  text-decoration: none;
}
</style>