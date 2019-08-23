<template>
  <v-app>
    <Navbar />
    <!-- <router-view /> -->
  </v-app>
</template>

<script>
import SignInView from "./components/SignInView";
import Navbar from './components/Navbar'

export default {
  name: "app",
  components: {
    SignInView,
    Navbar
  }
};
</script>

<style>
.signin {
  color: white;
}
</style>
