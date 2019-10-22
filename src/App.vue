<template>
  <LandingPage v-if="$route.path==='/landing'" />
  <v-app v-else>
    <v-navigation-drawer
      app
      dark
      clipped
      v-model="drawer"
      :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
      color="#002E5D"
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
          color="accent"
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
    <OareAppBar @nav-icon-click="drawer = !drawer" />

    <v-content class="blue-grey lighten-4">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Constants from "./constants";
import LandingPage from "./components/LandingPage";
import { isValidJwt } from "./utils/index";

export default {
  name: "app",
  components: {
    LandingPage
  },
  data() {
    return {
      active: [],
      data: [],
      drawer: true,
      hasLanded: false,
      searchText: "",
      sidebarLoading: false
    };
  },
  mounted() {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    if (jwt && isValidJwt(jwt) && user) {
      this.$store.commit("setJwt", jwt);
      this.$store.commit("setUser", user);
    }
  },
  computed: {
    selected() {
      if (this.active.length > 0) {
        return this.active[0];
      }
      return undefined;
    }
  },
  watch: {
    selected() {
      if (!this.selected) return;
      let type = this.selected.type;
      if (type === "dictionaryWord") {
        let onom = false;
        if (
          this.selected.hasOwnProperty("onomasticon") &&
          this.selected.onomasticon === true
        ) {
          onom = true;
        }
        this.$router.push({
          name: "dictionary",
          params: { wordId: this.selected.id },
          query: { onom }
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
      let { data } = await axios.get(
        `${Constants.API_PATH}/hierarchyCategories`
      );
      this.formatCategories(data);
      this.sidebarLoading = false;
      this.setOnomasticonWords();
    } catch (error) {
      // TODO log error to Sentry
      console.log("didn't work");
      console.log(error);
    }
  },

  methods: {
    // Categories are returned as a flat list,
    // make it recursive so that it can be
    // used by v-treeview
    formatCategories(categories) {
      // Get root categories
      this.formatCategoriesHelper(categories, this.data, null);
    },

    /**
     * Recursive helper function for findCategoryByName
     */
    findCategoryByNameHelper(name, categories) {
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        if (category.name === name) {
          return category;
        }

        if (category.hasOwnProperty("children")) {
          let childRes = this.findCategoryByNameHelper(name, category.children);
          if (childRes !== null) {
            return childRes;
          }
        }
      }
      return null;
    },

    /**
     * Get a reference to a category by its name.
     * Returns the first category or a child category
     * with that name.
     * @param {string} name the name of the category to find
     */
    findCategoryByName(name) {
      return this.findCategoryByNameHelper(name, this.data);
    },

    /** Since onomasticon words have to be displayed
     * with "translation" instead of "definition",
     * recursively apply an "onomasticon" attribute
     * to words in the onomasticon
     */
    setOnomasticonWords() {
      let onom = this.findCategoryByName("Onomasticon");
      onom.children.forEach(letterChild => {
        if (letterChild.hasOwnProperty("children")) {
          letterChild.children.forEach(wordChild => {
            wordChild.onomasticon = true;
          });
        }
      });
    },

    // Recursively build the children for a list of categories
    formatCategoriesHelper(categories, childrenArray, parentId) {
      let children = categories.filter(c => c.parent === parentId);
      children.forEach(child => {
        let newCategory = {
          id: child.id,
          name: child.name,
          type: child.type
        };
        // Check if the sidebar item is a text
        if (child.textId !== null && child.textId !== undefined) {
          newCategory.textId = child.textId;
        }
        childrenArray.push(newCategory);

        let childChildren = [];
        this.formatCategoriesHelper(categories, childChildren, newCategory.id);
        if (childChildren.length > 0) {
          newCategory.children = childChildren;
        }
      });
    }
  }
};
</script>

<style>
.signin {
  color: white;
}
</style>
