<template>
<!-- class="w-full h-full font-sans text-white" -->
    <!-- <Sidebar class="sidebar" :filteredList="filteredList" @search="filterList">
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
    <div class="mainBody bg-oBlue p-3">
      <div class="flex flex-col h-full m-auto">
       <Header class="mt-10">
           <div class="text-3xl font-sans text-4xl text-gray-900">Welcome</div>
           <div class="ml-6 text-xl text-gray-600">to the Old Assyrian Research Environment Database</div>
       </Header>
       <ContentView class="mt-2 flex-grow font-sans">
           <router-view class="mx-8"/>
       </ContentView>
      </div>
    </div> -->

    <!-- <v-container fill-height>
      <v-layout row>
        <v-flex xs4 class="scroll-y scroll-x grey darken-3 white--text">
          <OareSidebar>
            <v-text-field 
              box 
              class="mt-2"
              light
              label="Search" 
              v-model="searchText"
              background-color="white"
            />
            <v-treeview 
              :active.sync="active"
              activatable
              active-class="primary--text"
              :items="data"
              item-key="id"             
              hoverable
              open-on-click
              transition
              return-object
              class="white--text"/>
          </OareSidebar>
        </v-flex>

        <v-flex xs8>
          <v-sheet color="#edf0f5" width="100%" light>
            Welcome to the Old Assyrian Research Environment
            <ContentView class="mt-2 flex-grow font-sans">
              <router-view class="mx-8"/>
            </ContentView>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container> -->
    <v-app>
      <OareSidebar>
        <v-text-field 
          v-model="searchText"
          background-color="white"
          box 
          class="mt-4 mx-3"
          light
          label="Search" 
        />
        <v-treeview 
          :active.sync="active"
          activatable
          active-class="primary--text"
          :items="data"
          item-key="id"             
          hoverable
          open-on-click
          transition
          return-object
          class="white--text"/>
      </OareSidebar>
      <v-content app class="blue-grey lighten-4 pt-3">
        <span class="display-1 mx-3">Old Assyrian Research Environment Database</span>
        <v-container class="px-3 py-3" fluid>
          <ContentView>
            <router-view/>
          </ContentView>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import OareSidebar from './components/OareSidebar'
import TreeView from './components/TreeView'
import UtilityCell from './components/UtilityCell'
import Header from './components/Header'
import ContentView from './components/ContentView'
import Section from './components/Section'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    OareSidebar,
    TreeView,
    UtilityCell,
    Section,
    ContentView,
    Header
  },
  data() {
    return {
      active: [],
      data: [],
      searchText: '',
      filteredList: []
    }
  },
  computed: {
    showSearchResults() {
      return this.filteredList.length > 0
    },
    selected () {
      if (this.active.length > 0) {
        return this.active[0]
      }
      return undefined
    }
  },
  watch: {
    selected() {
      if(!this.selected) return
      
      let type = this.selected.type
      if(type === 'dictionaryWord') {
        this.$router.push({name: 'dictionary', params: {wordId: this.selected.id}})
      } else if (type === 'textText') {
        this.$router.push({name: 'epigraphies', 
          params: {textId: this.selected.textId, textName: this.selected.name}})
      }
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
      let data = await axios.get('https://oare-test.herokuapp.com/api/hierarchyCategories')
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
  .container {
    margin: 0;
    padding: 0;
  }

  .v-sheet {
    border-radius: 0;
  }

 
  /* #app {
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
  } */
</style>
