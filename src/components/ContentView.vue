<template>
  <div 
    class="white w-full p-3 rounded box-border"
    :style="classes"
  >
    <slot></slot>    
  </div>    
</template>

<script>
export default {
  name: 'ContentView',
  computed: {
    classes() {
      let minHeight = this.$vuetify.breakpoint.height - 100
      return {
        'min-height': minHeight + 'px'
      }
    }
  },
}
</script>
