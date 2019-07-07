<template>
  <v-navigation-drawer app dark px-2 class="white--text">
    <slot/>
  </v-navigation-drawer> 
</template>

<script>
import TextField from './TextField'

export default {
  name: 'OareSidebar',
  components: {
    TextField
  },
  data() {
    return {
      searchText: '',
      results: [],
    }
  },
  computed: {
    showSearchResults() {
      return this.searchText != ''
    },
  },
  watch: {
    searchText: function(newValue) {
      this.$emit('search', newValue)
    }
  }
}
</script>
