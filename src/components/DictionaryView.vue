<template>
  <div>
    <h1 class="text-3xl text-gray-700">{{ word }}</h1>
    <h3 class="text-2xl text-gray-700">Definitions</h3>
    <ul>
      <li
        v-for="(definition, index) in definitions"
        :key="index"
        class="text-gray-700"
      >
        {{ definition.definition }} 
      </li>
    </ul>
    <p class="text-base text-gray-600"></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DictionaryView',
  props: {
    wordId: {
      // eslint-disable-next-line
      type: Number | String,
      required: true
    },
  },

  data() {
    return {
      forms: [],
      definitions: [],
      word: ""
    }
  },

  methods: {
    async getWordInfo() { 
      let result = await axios.get('https://oare-test.herokuapp.com/api/dictionaryWords/'
        + this.wordId)
      let data = result.data
      console.log(data)
      this.word = data.word
      this.definitions = []
      data.definitions.forEach(definition => {
        this.definitions.push({
          ...definition
        })
      })
    }
  },

  created () {
    this.getWordInfo()
  },

  watch: {
    wordId() {
      this.getWordInfo()
    }
  },
}
</script>

<style>

</style>
