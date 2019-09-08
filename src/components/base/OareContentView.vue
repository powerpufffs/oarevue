<template>
  <v-card class="mx-auto pa-7" max-width="100%" :class="computedClasses">
    <v-card-title class="display-2 font-weight-bold mb-6">{{ title }}</v-card-title>
    <v-card-text class="black--text">
      <slot></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "OareContentView",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    computedClasses() {
      let minHeight = this.$vuetify.breakpoint.height - 100;
      return {
        "min-height": minHeight + "px"
      };
    }
  }
};
</script>
