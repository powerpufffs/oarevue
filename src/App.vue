<template>
  <div id="app" class="w-full h-full">
    <router-view />
  </div>
</template>

<script>
import Home from './components/Header'

export default {
  name: 'app',
  components: {
    Home,
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
