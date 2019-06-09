<template>
  <div class="tree">
    <div :style="indent" @click="toggleChildren">{{ name }}</div>
    <div v-if="showChildren">
      <tree 
        v-for="(child, index) in children" 
        :children="child.children" 
        :name="child.name"
        :depth="depth + 1"
        :key="index"
    />
    </div>
  </div>
</template>
<script>
  export default { 
    props: [ 'name', 'children', 'depth' ],
    data() {
      return { 
        showChildren: false 
      }
    },
    name: 'tree',
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 20}px)` }
      }
    },
    methods: {
      toggleChildren() {
        this.showChildren = !this.showChildren;
      }
    }
  }
</script>