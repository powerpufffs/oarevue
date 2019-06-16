<template>
  <div id="app" class="w-full h-full font-sans text-white">
    <Sidebar class="sidebar" :filteredList="filteredList" :search="filterList($event)" >
      <Section title="CURRENT DIRECTORY"/>
      <TreeView class="tree overflow-y-scroll" :data="data.data"/>
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
  methods: {
    filterList: text => {
      console.log("trying again")
      console.log(this.data.data)
      this.filteredList = this.data.data.filter( leaf => leaf.name.includes(text) )
    },
  },
  async created() {
		// this.data = response
		try {
			this.data = await axios.get('https://oare-test.herokuapp.com/api/categories')
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
</style>
