<template>
  <v-navigation-drawer 
    v-model="drawer"
    app 
    dark 
    clipped 
    px-2 
    class="white--text"
    :class="classes"
  >
    <slot/>
  </v-navigation-drawer> 
</template>

<script>
export default {
  name: 'OareSidebar',
  props: {
    openFlag: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      drawer: false,
      searchText: '',
      results: [],
    }
  },
  created () {
    if(this.$vuetify.breakpoint.lgAndUp) {
      this.drawer = true
    }
  },
  computed: {
    showSearchResults() {
      return this.searchText != ''
    },
    classes () {
      let classes = []
      if(this.$vuetify.breakpoint.lgAndUp) {
        classes.push('pt-5')
      }
      return classes
    }
  },
  watch: {
    openFlag () {
      this.drawer = true
    }
  }
}
</script>