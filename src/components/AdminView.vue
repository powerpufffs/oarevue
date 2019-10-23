<template>
  <OareContentView title="Admin"></OareContentView>
</template>

<script>
import axios from "axios";
import Constants from "../constants";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let jwt = vm.$store.getters.jwt;
      axios
        .get(`${Constants.API_PATH}/is_admin`, {
          headers: {
            Authorization: `Bearer: ${jwt}`
          }
        })
        .then(response => {
          let isAdmin = response.data.is_admin;
          if (!isAdmin) {
            vm.$router.replace("/");
          }
        })
        .catch(() => {
          vm.$router.replace("/");
        });
    });
  }
};
</script>

<style>
</style>