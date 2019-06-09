<template>
  <div id="app" class="w-full h-full font-sans text-white">
    <Sidebar class="sidebar">
      <div class="logo text-white">OARE Development</div>
      <div class="searchBar bg-select">Search</div>
      <div class="header1 bg-oDark text-oSelect">CURRENT DIRECTORY</div>
      <TreeView class="tree overflow-y-scroll"/>
      <div class="header2 bg-oDark text-oSelect">SITE INFORMATION</div>
      <div class="about">About</div>
      <div class="setting">Settings</div>
    </Sidebar>
    <div class="mainBody">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import TreeView from './components/TreeView'

export default {
  name: 'app',
  components: {
    Sidebar,
    TreeView,
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
      "about"         50px
      "setting"       50px
  }
  .body { grid-area: body; } 
  .logo { grid-area: logo; }
  .searchBar { grid-area: searchBar; }
  .header1 { grid-area: header1; }
  .tree { grid-area: tree; }
  .header2 { grid-area: header2; }
  .about { grid-area: about; }
  .setting { grid-area: setting; }
</style>
