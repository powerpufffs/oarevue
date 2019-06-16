<template>
  <div class="sidebar bg-oLight">
    <div class="logo text-white text-4xl flex justify-center items-center h-20">OARE Development</div>
    <div class="input bg-select flex justify-center items-center bg-oSelect py-2 px-3">
      <TextField 
        class="w-full h-full text-black rounded-sm" 
        v-model="searchText" 
      />
    </div>
    <transition-group name="results" tag="div">
      <div v-if="showSearchResults" :key="1"> 
        <Section title="SEARCH RESULTS"/>
        <div v-for="(result, index) in results"
          :name="name"
          :key="index"
        />
      </div>
    </transition-group>
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
    searchText: newValue => {
      this.$emit('search', newValue)
    }
  }
}
</script>

<style scoped>
  .input {
    height: 50px;
  } 
  .results-enter-active, .results-leave-active {
    transition: all 0.2s ease-out;
  }
  .results-enter, .results-leave-active {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
