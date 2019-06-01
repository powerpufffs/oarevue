<template>
  <div id="app" class="w-full h-full flex flex-row font-sans">
    <Sidebar class="relative ">
        <div class="text-white h-20 text-3xl pt-4 centerX">OARE Database</div>
        <div class="bg-oSelect h-8 p-2">
          <input type="text" placeholder="Search..." class="block w-full h-full box-border rounded">
        </div>
        <div class="bg-oDark pl-4 py-1 centerY text-lg text-blue-100 uppercase ">Current Directory</div>
        <div class=""></div>
        <TreeView class="text-gray-400 text-l pl-2 py-2"/>
        <div class="absolute block bottom-0 w-full">
            <div class="bg-oDark bottom-0 box-border pl-4 py-1 text-lg text-blue-100 uppercase w-full">Site Information</div>
            <div class="h-24 flex flex-col justify-evenly text-gray-500">
              <div class="h-1/2 pl-4 hover:bg-gray-400 centerY">
                <img src="../static/info.svg" class="colorSvg">
                <span class="pl-3">About</span>
              </div>
              <div class="h-1/2 pl-4 hover:bg-gray-400 centerY">
                <img src="../static/settings.svg" class="colorSvg">
                <span class="pl-3">Settings</span>
              </div>
            </div>
        </div>
    </Sidebar>
    <div class="flex-grow bg-oBlue px-4">
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

</style>
