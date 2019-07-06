<template>
  <div class="Tree text-xl" >
    <div class="selectableField pl-4 flex items-center cursor-pointer" @click="toggleChildren(); goToView()">
      <div 
        :class="[ hasChildren ? (showChildren ? 'caret-down' : 'caret') : '']"
      >
        {{ data.name }}
      </div>
    </div>
       
    <transition-group name="list" tag="ul" v-if="showChildren">
      <Tree 
        v-for="(child) in data.children" 
        :data="child"
        :key="child.id"
        :depth="depth + 1"
      />
    </transition-group>
  </div>
</template>
<script>
  export default { 
    // props: [ 'name', 'children', 'depth', 'type' ],
    props: {
      data: {
        type: Object,
        required: true
      },
      depth: {
        type: Number,
        required: true
      }
    },
    data() {
      return { 
        showChildren: false 
      }
    },
    name: 'Tree',
    computed: {
      hasChildren() {
        return this.data.children.length > 0
      },
    },
    methods: {
      toggleChildren() {
        this.showChildren = !this.showChildren;
      },
      
      goToView() {
        if(this.data.type === 'dictionaryWord') {
          this.$router.push({name: 'dictionary', params: { wordId: Number(this.data.id) }})
        } else if(this.data.type === 'text_text') {
          this.$router.push({name: 'epigraphies', params: { textId: Number(this.data.textId) }})
        }
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