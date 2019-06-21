<template>
  <div class="sidebar bg-oLight">
    <div class="logo text-white text-4xl flex justify-center items-center h-20">OARE Development</div>
    <div class="input bg-select flex justify-center items-center bg-oSelect py-2 px-3">
      <TextField 
        class="w-full h-full text-black rounded-sm" 
        v-model="searchText" 
      />
    </div>
    <slot></slot>    
  </div>
</template>

<script>
import Section from './Section'
import TextField from './TextField'

export default {
  name: 'sidebar',
  components: {
    Section,
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

<style scoped>
  .input {
    height: 50px;
  } 
</style>
