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


    <h3 class="text-2xl text-gray-700 mt-3">Forms</h3>
    <ul>
      <li
        v-for="(form, index) in forms"
        :key="index"
        class="text-gray-700"
      >
        {{ form.form }}: {{ spellingsList(form.spellings) }}
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
    spellingsList(spellingsArray) {
      let spellings = []
      spellingsArray.forEach(spelling => {
        spellings.push(spelling.spelling)
      })
      return spellings.join(', ')
    },
    async getWordInfo() { 
      let result = await axios.get('https://oare-test.herokuapp.com/api/dictionaryWords/'
        + this.wordId)
      let data = result.data
      console.log(data)
      this.word = data.word
      this.definitions = []
      this.forms = []
      data.definitions.forEach(definition => {
        this.definitions.push({
          ...definition
        })
      })

      data.forms.forEach(form => {
        this.forms.push({
          ...form
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
