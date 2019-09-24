<template>
  <OareContentView :title="textName">
    <v-progress-circular v-if="loading" indeterminate />

    <v-container v-else>
      <v-row>
        <v-col cols="12" md="6">
          <OareSubheader>Epigraphies</OareSubheader>
          <div v-for="(side, index) in sortedSides" :key="side">
            <OareSubheader :class="{'mt-4': index === 0 ? false : true }">{{ sideText(side) }}</OareSubheader>
            <OareListItem v-for="lineNum in sortedLineNums(side)" :key="lineNum">
              <sup>{{ lineNum }}.</sup>
              {{ lineText(tabletText[side][lineNum]) }}
            </OareListItem>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <OareSubheader>Discourse Units</OareSubheader>
          <v-treeview class="title font-weight-regular" :items="discourses">
            <template v-slot:label="{ item }">{{ item.name }}</template>
          </v-treeview>
        </v-col>
      </v-row>
    </v-container>
  </OareContentView>
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
      loading: false,
      tabletText: {},
      discourses: [],
      sortedSides: []
    };
  },

  watch: {
    textId: {
      handler() {
        this.tabletText = {};
        this.sortedSides = [];
        this.discourses = [];
        this.getEpigraphyInfo();
      },
      immediate: true
    }
  },

  methods: {
    sideText(sideNum) {
      switch (Number(sideNum)) {
        case 1:
          return "obv.";
        case 2:
          return "lo.e.";
        case 3:
          return "rev.";
        case 4:
          return "u.e.";
        case 5:
          return "le.e.";
        case 6:
          return "r.e.";
        default:
          return sideNum;
      }
    },
    /**
     * Query the server for the tablet text
     */
    async getEpigraphyInfo() {
      this.loading = true;
      let epigraphies = (await axios.get(
        `${Constants.API_PATH}/textEpigraphies/${this.textId}`
      )).data;
      let discourses = (await axios.get(
        `${Constants.API_PATH}/discourseUnits/${this.textId}`
      )).data;
      this.loading = false;
      this.formatEpigraphies(epigraphies, discourses);
    },

    getDiscourseByIdHelper(discourses, id) {
      for (let i = 0; i < discourses.length; i++) {
        let discourse = discourses[i];
        if (discourse.id === id) {
          return discourse;
        }
        if (discourse.hasOwnProperty("children")) {
          let child = this.getDiscourseByIdHelper(discourse.children, id);
          if (child !== null) {
            return child;
          }
        }
      }
      return null;
    },

    /**
     * Check if discourses has an id
     */
    getDiscourseById(id) {
      return this.getDiscourseByIdHelper(this.discourses, id);
    },

    addDiscourseChildren(rawDiscourses, id, childrenArray) {
      let discourse = rawDiscourses.find(
        discourse => discourse.discourse_unit_id === id
      );
      let elem = {
        id: discourse.discourse_unit_id,
        name: discourse.transcription
      };
      if (childrenArray.length > 0) {
        elem.children = childrenArray;
      }
      if (discourse.parent_id === null) {
        this.discourses.push(elem);
      } else {
        let parentId = rawDiscourses.find(
          d => d.unique_id === discourse.parent_id
        ).discourse_unit_id;
        let parent = this.getDiscourseById(parentId);
        if (parent !== null) {
          if (!parent.hasOwnProperty("children")) {
            parent.children = [];
          }
          parent.children.push(elem);
        } else {
          this.addDiscourseChildren(rawDiscourses, parentId, [elem]);
        }
      }
    },

    addDiscourse(rawDiscourses, discourseId) {
      this.addDiscourseChildren(rawDiscourses, discourseId, []);
    },

    /**
     * Epigraphies comes as a flat list from the server,
     * so format them so they can be properly displayed.
     *
     * @arg {array} epigraphies - The list of epigraphies returned
     * from the server
     */
    formatEpigraphies(epigraphies, discourses) {
      // Sort by line number and get a list of the sides.
      // Necessary because we want to show the lines in order,
      // and object keys are not sorted.
      epigraphies.sort((val1, val2) => val1.line - val2.line);
      epigraphies.forEach(val => {
        if (!this.sortedSides.includes(val.side)) {
          this.sortedSides.push(val.side);
        }
      });

      // Get the reading of each line on each side
      this.sortedSides.forEach(side => {
        // Get a sorted list of the line numbers on the tablet
        let lines = epigraphies.filter(val => {
          return val.side === side;
        });
        let lineNums = [];
        lines.forEach(val => {
          if (!lineNums.includes(val.line)) {
            lineNums.push(val.line);
          }
        });
        lineNums.sort((val1, val2) => val1 - val2);
        // Maps a line number to an array with the reading
        let lineTexts = {};
        // Get the reading for each line
        lineNums.forEach(lineNum => {
          lineTexts[lineNum] = [];

          // Get all rows with this line
          let charsOnLineRows = lines
            .filter(val => {
              return val.line === lineNum;
            })
            .sort((val1, val2) => {
              return val1.char_on_line - val2.char_on_line;
            });

          let prevCharIndex = -1; // Keeps track of character in word index
          let curWord = []; // Keeps track of word as its being built
          charsOnLineRows.forEach(row => {
            if (
              row.discourse_unit_id !== null &&
              this.getDiscourseById(row.discourse_unit_id) === null
            ) {
              this.addDiscourse(discourses, row.discourse_unit_id);
            }
            let charIndex = row.char_in_word;
            let reading = {
              type: row.type,
              reading: row.reading
            };
            if (charIndex === null) {
              // Divider
              lineTexts[lineNum].push(curWord);
              lineTexts[lineNum].push([reading]);
              curWord = [];
            } else if (charIndex > prevCharIndex) {
              // Part of same word
              curWord.push(reading);
            } else {
              // Start of new word
              lineTexts[lineNum].push(curWord);
              curWord = [reading];
            }
            prevCharIndex = charIndex;
          });
          if (curWord.length > 0) {
            lineTexts[lineNum].push(curWord);
          }
          this.tabletText[side] = lineTexts;
        });
      });
    },

    /**
     * Text representation of the reading of a line
     *
     * @arg {number} line The line number to get the text of.
     */
    lineText(line) {
      let words = [];
      line.forEach(word => {
        let wordReading = "";
        let lastIndex = word.length - 1;
        word.forEach((char, index) => {
          if (index !== lastIndex) {
            // Join logograms with periods
            if (char.type === 2) {
              wordReading += `${char.reading}.`;
            } else {
              wordReading += `${char.reading}-`;
            }
          } else {
            wordReading += char.reading;
          }
        });
        words.push(wordReading);
      });
      return words.join(" ");
    },

    /**
     * Since object keys aren't sorted, get the
     * line numbers for a side in sorted order
     *
     * @arg {string} side The side of the tablet
     * whose line numbers should be returned
     */
    sortedLineNums(side) {
      return Object.keys(this.tabletText[side]).sort(
        (val1, val2) => Number(val1) - Number(val2)
      );
    }
  }
};
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>