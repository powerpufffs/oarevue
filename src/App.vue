<template>
  <div id="app" class="w-full h-full font-sans text-white">
    <Sidebar class="sidebar" :filteredList="filteredList" @search="filterList">
      <transition-group name="results" tag="div">
        <div v-if="showSearchResults" :key="1"> 
          <Section title="SEARCH RESULTS"/>
          <div v-for="(result, index) in filteredList" :key="index" class="pl-4 text-xl">
            {{ result.name }}
          </div>
        </div>
      </transition-group>
      <Section title="CURRENT DIRECTORY"/>
      <TreeView class="tree overflow-y-scroll" :data="data"/>
      <Section title="SITE INFORMATION" />
      <div class="utilities flex flex-col">
        <UtilityCell 
          class="flex items-center flex-grow pl-4 hover:bg-oSelect"
          title="About"
        >
          <img src="../static/info.svg">
        </UtilityCell>
        <UtilityCell 
          class="flex items-center flex-grow pl-4 hover:bg-oSelect"
          title="Settings"
        >
          <img src="../static/settings.svg">
        </UtilityCell>
      </div>
    </Sidebar>
    <div class="mainBody bg-oBlue">
      <router-view class="mx-8"/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import TreeView from './components/TreeView'
import UtilityCell from './components/UtilityCell'
import Section from './components/Section'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Sidebar,
    TreeView,
    UtilityCell,
    Section,
  },
  data() {
    return {
      data: [],
      filteredList: []
    }
  },
  computed: {
    showSearchResults() {
      return this.filteredList.length > 0
    }
  },
  methods: {
    filterList(text) {
      console.log(text)
      if (text === '') { 
        this.filteredList = []
        return 
      }
      console.log(this.data.filter( leaf => leaf.name.includes(text) ))
      this.filteredList = this.data.filter( leaf => leaf.name.includes(text) || leaf.name.toLowerCase().includes(text.toLowerCase()) )
    },
  },
  async created() {
		try {
      let data = await axios.get('https://oare-test.herokuapp.com/api/categories')
      this.data = data.data
		} catch (error) {
			console.log("didn't work")
			console.log(error)
		}
	}
}
</script>

<style>
body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 0px;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}
</style>

<style scoped>
  #app {
    display: grid;
    grid-template-columns:
    22rem 1fr;
    grid-template-areas:
    "sidebar body";
  }
  .sidebar{
    grid-area: sidebar;
    background-color:rgb(34, 44, 50);
  }
  .body { grid-area: body; } 
  .sidebar { grid-area: sidebar; }
  .results-enter-active, .results-leave-active {
    transition: all 0.2s ease-out;
  }
  .results-enter, .results-leave-active {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
