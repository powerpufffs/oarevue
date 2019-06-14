<template>
  <div id="app" class="w-full h-full font-sans text-white">
    <Sidebar class="sidebar">
      <div class="logo text-white text-4xl flex justify-center items-center">OARE Development</div>
      <div class="searchBar bg-select">Search</div>
      <div class="header1 bg-oDark text-oSelect text-xl pl-4 flex items-center">CURRENT DIRECTORY</div>
      <TreeView class="tree overflow-y-scroll"/>
      <div class="header2 bg-oDark text-oSelect text-xl pl-4 flex items-center">SITE INFORMATION</div>
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

export default {
  name: 'app',
  components: {
    Sidebar,
    TreeView,
    UtilityCell,
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
    display: grid;
    grid-template:
      "logo"          118px
      "searchBar"     60px
      "header1"       38px
      "tree"          minmax(100px, 600px)
      "header2"       38px
      "utilities"     100px
  }
  .body { grid-area: body; } 
  .logo { grid-area: logo; }
  .searchBar { grid-area: searchBar; }
  .header1 { grid-area: header1; }
  .tree { grid-area: tree; }
  .header2 { grid-area: header2; }
  .utilities { grid-area: utilities; }
</style>
