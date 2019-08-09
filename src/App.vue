<template>
  <v-app>
    <v-navigation-drawer
      app
      dark
      clipped
      v-model="drawer"
      :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
    >
      <v-text-field
        v-model="searchText"
        background-color="white"
        filled
        class="mx-3 mt-2"
        clearable
        label="Search"
        light
      />
      <div v-if="sidebarLoading" class="text-xs-center">
        <v-progress-circular indeterminate color="white" />
      </div>
      <div v-else>
        <v-treeview
          :active.sync="active"
          activatable
          active-class="primary--text"
          class="white--text"
          :items="data"
          item-key="id"
          hoverable
          open-on-click
          return-object
          transition
          :search="searchText"
        />
      </div>
    </v-navigation-drawer>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-content class="blue-grey lighten-4">
      <v-container fluid>
        <ContentView>
          <router-view />
        </ContentView>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ContentView from "./components/ContentView";
import axios from "axios";

export default {
  name: "app",
  components: {
    ContentView
  },
  data() {
    return {
      active: [],
      data: [],
      drawer: true,
      searchText: "",
      sidebarLoading: false
    };
  },
  computed: {
    selected() {
      if (this.active.length > 0) {
        return this.active[0];
      }
      return undefined;
    },
    toolbarTitle() {
      if (this.$vuetify.breakpoint.xs) {
        return "OARE";
      }
      return "Old Assyrian Research Environment Database";
    }
  },
  watch: {
    selected() {
      if (!this.selected) return;

      let type = this.selected.type;
      if (type === "dictionaryWord") {
        this.$router.push({
          name: "dictionary",
          params: { wordId: this.selected.id }
        });
      } else if (type === "textText") {
        this.$router.push({
          name: "epigraphies",
          params: { textId: this.selected.textId, textName: this.selected.name }
        });
      }
    }
  },
  async created() {
    try {
      this.sidebarLoading = true;
      let data = await axios.get(
        "https://oare-test.herokuapp.com/api/hierarchyCategories"
      );
      this.data = data.data;
      this.sidebarLoading = false;
    } catch (error) {
      console.log("didn't work");
      console.log(error);
    }
  }
};
</script>
