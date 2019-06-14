<template>
  <div class="tree text-xl">
    <div class="selectableField py-1 pl-4 flex items-center">
      <div 
        @click="toggleChildren"
        :class="[{'caret': hasChildren}, {'caret-down': hasChildren && showChildren}]"
      >
        {{ name }}
      </div>
    </div>
    <ul v-if="showChildren">
      <transition name="fade">
        <tree 
          v-for="(child) in children" 
          :children="child.children" 
          :name="child.name"
          :depth="depth + 1"
          :key="child"
        />
      </transition>
    </ul>
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
      hasChildren() {
        return this.children.length > 0
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
    margin-right: 100px;
  }
  .caret::before {
    content: "\25B6";
    color: white;
    margin-right: 5px;
  }
  .caret-down::before {
    content: "\25B6";
    transform: rotate(90deg);
  }
  .selectableField:hover {
    background-color: #323D44;
  }
  ul {
    padding: 0;
    margin: 0 0 0 1em;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>