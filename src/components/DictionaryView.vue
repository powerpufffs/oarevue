<template>
  <OareContentView :title="word">
    <v-progress-linear indeterminate v-if="loading" />
    <div v-else>
      <div class="flex justify-start items-baseline mt-5 pl-2">
        <OareSubheader>{{ definitionSubheader }}</OareSubheader>
        <OareListItem v-for="(definition, index) in definitions" :key="index">{{
          definition.definition
        }}</OareListItem>
      </div>
      <div class="flex flex-row justify-start items-baseline mt-4 pl-2">
        <OareSubheader>Forms</OareSubheader>
        <OareListItem v-for="(form, index) in forms" :key="index">
          <span class="font-weight-medium">{{ form.form }}:</span>
          {{ spellingsList(form.spellings) }}
        </OareListItem>
      </div>
    </div>
  </OareContentView>
</template>

<script>
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
      let result = await this.$axios.get(`/dictionary_words/${this.wordId}`);
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

  computed: {
    /**
     * Words in the onomasticon should show a subheader of
     * "Translation" for the dictionary definitions.
     * Check the `onom` GET param for if it's
     * in the onomasticon or not.
     */
    definitionSubheader() {
      if (
        this.$route.query.hasOwnProperty("onom") &&
        this.$route.query.onom === true
      ) {
        return "Translation";
      }
      return "Definitions";
    }
  },

  watch: {
    wordId: {
      handler() {
        this.getWordInfo();
      },
      immediate: true
    }
  }
};
</script>
