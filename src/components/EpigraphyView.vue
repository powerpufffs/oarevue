<template>
  <div>
    <v-progress-circular v-if="loading" indeterminate />

    <div v-else>
      <h1 class="display-1 font-weight-bold">{{ textName }}</h1>

      <div v-for="(lines, side) in data" :key="side">
        <h3 class="mt-3 headline">{{ side }}</h3>
        <ul>
          <li
            v-for="(line, lineNum) in lines"
            class="title font-weight-regular mb-2"
            :key="lineNum"
          >
            <sup>{{ lineNum }}.</sup>
            {{ lineText(line) }}
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
  name: "EpigraphyView",
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
    };
  },
  created() {
    console.log(this.textId);
    this.getEpigraphyInfo();
  },

  watch: {
    textId() {
      this.getEpigraphyInfo();
    }
  },

  methods: {
    async getEpigraphyInfo() {
      this.loading = true;
      let { data } = await axios.get(
        `${Constants.API_PATH}/textEpigraphies/${this.textId}`
      );
      this.loading = false;
      this.formatEpigraphies(data);
      // this.data = result.data;
    },

    formatEpigraphies(epigraphies) {
      /**
       * for each side:
       *  for each line in side:
       *    for each character in line:
       *        for each character in word:
       *          if the char is 0, append a "|"
       *          if it's incrementing, part of same word.
       *          else, it's a new word
       */
      let sides = [];
      epigraphies.forEach(val => {
        if (!sides.includes(val.side)) {
          sides.push(val.side);
        }
      });
      sides.forEach(side => {
        let lines = epigraphies.filter(val => {
          return val.side === side;
        });
        let lineNums = [];
        lines.forEach(val => {
          if (!lineNums.includes(val.line)) {
            lineNums.push(val.line);
          }
        });
        lineNums.sort();
        lineNums.forEach(lineNum => {
          let chars = lines.filter(val => {
            return val.line === lineNum;
          });
        });
      });
    },

    lineText(line) {
      let words = [];
      line.forEach(chars => {
        words.push(chars.join("-"));
      });
      return words.join(" ");
    }
  }
};
</script>

<style>
</style>
