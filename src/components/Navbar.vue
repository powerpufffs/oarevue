<template>
  <v-app>
    <OareSidebar :openFlag="openFlag" v-if="user">
      <v-text-field
        v-model="searchText"
        background-color="white"
        box
        class="mt-5 mx-3"
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
    </OareSidebar>
    <v-toolbar fixed clipped-left dark>
      <v-toolbar-side-icon v-if="$vuetify.breakpoint.mdAndDown" @click="openFlag++" />
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text class="signin" v-if="!user">
          <router-link :to="{ name: 'signin'}">Sign In</router-link>
        </v-btn>
         <v-btn text class="signin" v-if="!user">
          <router-link :to="{ name: 'signin'}">Sign Out</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content app class="blue-grey lighten-4 pt-4 mt-5">
      <v-container class="px-3 py-3" fluid>
        <ContentView>
          <router-view />
        </ContentView>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SignInView from "./SignInView";
import OareSidebar from "./OareSidebar";
import ContentView from "./ContentView";
import axios from "axios";
export default {
  name: "nvabar",
  components: {
    OareSidebar,
    ContentView
  },
  data() {
    return {
      active: [],
      data: [],
      openFlag: 0,
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

<style>
.signin {
  color: white;
}
</style>