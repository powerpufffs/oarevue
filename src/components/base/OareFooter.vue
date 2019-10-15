<template>
  <v-footer app absolute inset dark color="#002E5D" class="py-4">
    <v-img
      v-if="$vuetify.breakpoint.smAndUp"
      class="mx-auto"
      src="img/byu-wordmark-ring.svg"
      max-width="500"
    />
    <v-img v-else class="mx-auto" src="img/BYU_abbrev.png" max-width="80" />
  </v-footer>
</template>

<script>
export default {};
</script>

<style>
</style>