<template>
  <OareContentView title="Home">
    <p class="title font-weight-regular">
      Select a dictionary word or text from
      the navigation bar to get started.
    </p>
  </OareContentView>
</template>

<script>
export default {
  name: "home",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.landed) {
        vm.$store.commit('setLanded')
        vm.$router.replace("/landing");
      }
    });
  }
};
</script>
