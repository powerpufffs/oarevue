<template>
  <div>
    <v-progress-circular 
      v-if="loading"
      indeterminate
    />
    <div v-else>
      <h1 class="display-1 font-weight-bold">{{ word }}</h1>
      <h3 class="mt-3 headline">Definitions</h3>
      <ul>
        <li
          v-for="(definition, index) in definitions"
          :key="index"
          class="title font-weight-medium"
        >
          {{ definition.definition }} 
        </li>
      </ul>


      <h3 class="mt-2 headline">Forms</h3>
      <ul>
        <li
          v-for="(form, index) in forms"
          :key="index"
          class="title font-weight-regular mb-2"
        >
          <span class="font-weight-medium">{{ form.form }}: </span>
           {{ spellingsList(form.spellings) }}
        </li>
      </ul>
    </div>
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
      definitions: [],
      forms: [],
      loading: false,
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
      this.loading = true
      let result = await axios.get('https://oare-test.herokuapp.com/api/dictionaryWords/'
        + this.wordId)
      this.loading = false
      let data = result.data
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
