<template>
  <div>
    <v-progress-circular
      v-if="loading"
      indeterminate
    />

    <div v-else>
      <h1 class="display-1 font-weight-bold">
        {{ textName }}
      </h1>
      
      <div v-for="(lines, side) in data" :key="side">
        <h3 class="mt-3 headline">
          {{ side }}
        </h3>
        <ul>
          <li 
            v-for="(line, lineNum) in lines" 
            class="title font-weight-regular mb-2"
            :key="lineNum" 
          >
            {{ lineNum }}. {{ lineText(line) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EpigraphyView',
  props: {
    textId: {
      // eslint-disable-next-line
      type: Number | String,
      required: true
    },
    textName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: {},
      loading: false
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
      this.loading = true
      let result = await axios.get('https://oare-test.herokuapp.com/api/textEpigraphies/'
        + this.textId)
      this.loading = false
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
