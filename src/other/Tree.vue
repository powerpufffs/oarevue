<template>
  <div class="tree">
    <div :class="[
      indent,
      hasChildren ? 'caret' : '',
      ]"
      @click="toggleChildren">{{ name }}
    </div>
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
        return { 
          transform: `translate(${this.depth * 20}px)`,
        }
      },
      hasChildren(child) {
        return child.count > 0 ? 'caret' : 'caret-down'
      }
    },
    methods: {
      toggleChildren() {
        this.showChildren = !this.showChildren;
      }
    }
  }
</script>

<style scoped>
  .caret {
    cursor: pointer;
    user-select: none;
  }
  .caret::before() {
    content: "\25B6";
    color: black;
    display: inline-block;
    margin-right: 6px;
  }
  .caret-down::before() {
    transform: rotate(90deg);
  }
</style>