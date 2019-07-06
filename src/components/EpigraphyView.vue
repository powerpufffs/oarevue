<template>
  <div>
    <h1 class="text-3xl text-gray-700">
      Epigraphies
    </h1>
    
    <div v-for="(lines, side) in data" :key="side">
      <h3 class="text-2xl text-gray-700 mt-3">
        <span class="text-gray-700">
          {{ side }}
        </span>
        <ul>
          <li v-for="(line, lineNum) in lines" :key="lineNum" class="text-gray-700">
            {{ lineNum }}. {{ lineText(line) }}
          </li>
        </ul>
      </h3> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EpigraphyView',
  props: {
    textId: {
      type: Number | String,
      required: true
    }
  },
  data() {
    return {
      data: {}
    }
  },
  created () {
    console.log(this.textId);
    this.getEpigraphyInfo()
  },

  watch: {
    textId() {
      this.getEpigraphyInfo()
    }
  },

  methods: {
    async getEpigraphyInfo() {
      let result = await axios.get('https://oare-test.herokuapp.com/api/textEpigraphies/'
        + this.textId)
      this.data = result.data
    },

    lineText(line) {
      let words = []
      line.forEach(chars => {
        words.push(chars.join('-'))
      })
      return words.join(' ')
    }
  },
}
</script>

<style>

</style>
