<template>
  <div class="Tree text-xl">
    <div class="selectableField pl-4 flex items-center">
      <div 
        @click="toggleChildren"
        :class="[ hasChildren ? (showChildren ? 'caret-down' : 'caret') : '']"
      >
        {{ name }}
      </div>
    </div>
    <transition-group name="list" tag="ul">
      <Tree 
        v-if="showChildren"
        v-for="(child) in children" 
        :children="child.children" 
        :name="child.name"
        :depth="depth + 1"
        :key="child"
      />
    </transition-group>
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
    name: 'Tree',
    computed: {
      hasChildren() {
        return this.children.length > 0
      },
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
    display: inline-block;
    content: "\25B6";
    font-size: 15px;
    color: white;
    margin-right: 5px;
  }
  .caret-down::before {
    display: inline-block;
    content:'\25B6';
    font-size: 15px;
    margin-right: 5px;
    transform: rotate(90deg);
  }
  .selectableField:hover {
    background-color: #323D44;
  }
  ul {
    padding: 0;
    margin: 0 0 0 1em;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.2s ease-out;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>