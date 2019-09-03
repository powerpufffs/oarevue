<template>
  <div class="p-12">
    <v-progress-linear indeterminate v-if="loading" />
    <div v-else>
      <h1 class="display-1 mb-1 font-weight-bold pl-1">{{ word }}</h1>
      <div class="block h-1 bg-gray-200" />
      <div class="flex justify-start items-baseline mt-5 pl-2">
        <h3 class="headline mr-20 w-32">Definitions</h3>
        <ul>
          <li
            v-for="(definition, index) in definitions"
            :key="index"
            class="title font-weight-light italic"
          >{{ definition.definition }}</li>
        </ul>
      </div>
      <div class="flex flex-row justify-start items-baseline mt-4 pl-2">
        <h3 class="headline mr-20 w-32">Forms</h3>
        <ul>
          <li v-for="(form, index) in forms" :key="index" class="title font-weight-regular mt-2">
            <span class="font-weight-medium">{{ form.form }}:</span>
            {{ spellingsList(form.spellings) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Constants from "../constants";
export default {
  name: "DictionaryView",
  props: {
    wordId: {
      // eslint-disable-next-line
      type: Number | String,
      required: true
    }
  },

  data() {
    return {
      definitions: [],
      forms: [],
      loading: false,
      word: ""
    };
  },

  methods: {
    spellingsList(spellingsArray) {
      let spellings = [];
      spellingsArray.forEach(spelling => {
        spellings.push(spelling.spelling);
      });
      return spellings.join(", ");
    },
    async getWordInfo() {
      this.loading = true;
      let result = await axios.get(
        `${Constants.API_PATH}/dictionaryWords/${this.wordId}`
      );
      this.loading = false;
      let data = result.data;
      this.word = data.word;
      this.definitions = [];
      this.forms = [];
      data.definitions.forEach(definition => {
        this.definitions.push({
          ...definition
        });
      });

      data.forms.forEach(form => {
        this.forms.push({
          ...form
        });
      });
    }
  },

  created() {
    this.getWordInfo();
  },

  watch: {
    wordId() {
      this.getWordInfo();
    }
  }
};
</script>
