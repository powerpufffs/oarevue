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
              <span class="ml-2" v-html="lineText(tabletText[side][lineNum])" />
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
const LOGOGRAM = 2;
const SPECIAL_PHONOGRAM = 0;
const MARKUP_BRACKETS = {
  1: "[]",
  2: "⸢⸣",
  3: "{}",
  4: "<>",
  5: "«»",
  6: "()"
};

const MARKUP_CHARACTERS = {
  7: {
    reading: "/",
    position: -1
  },
  8: {
    reading: "^",
    position: -1
  },
  9: {
    reading: "<sup>!</sup>",
    position: 1
  },
  10: {
    reading: "<sup>?</sup>",
    position: 1
  },
  11: {
    reading: "#",
    position: 1
  },
  12: {
    reading: "+",
    position: -1
  },
  13: {
    reading: "×",
    position: -1
  },
  14: {
    reading: "%",
    position: 1
  }
};
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
            // let reading = {
            //   type: row.type,
            //   reading: row.reading,
            //   numberVal: row.number_val
            // };
            if (charIndex === null) {
              // Divider
              lineTexts[lineNum].push(curWord);
              lineTexts[lineNum].push([row]);
              curWord = [];
            } else if (charIndex > prevCharIndex) {
              // Part of same word
              curWord.push(row);
            } else {
              // Start of new word
              lineTexts[lineNum].push(curWord);
              curWord = [row];
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
     * Format the reading of a character in a word.
     * If it's a logogram, italicize it
     *
     * @arg {object} char A row from the epigraphy endpoint.
     */
    formattedReading(char) {
      if (
        char.type === LOGOGRAM ||
        char.type === SPECIAL_PHONOGRAM ||
        char.reading === "|"
      ) {
        return char.reading;
      } else {
        return `<em>${char.reading}</em>`;
      }
    },

    insertBracket(reading, bracket, pos) {
      return [reading.slice(0, pos), bracket, reading.slice(pos)].join("");
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

        for (let i = 0; i < word.length; i++) {
          let char = word[i];

          // Apply markup if it has it
          if (char.markups) {
            for (let j = 0; j < char.markups.length; j++) {
              let markup = char.markups[j];
              // If it's a bracket, insert the bracket into the appropriate place,
              // may be in a following or previous character
              if (markup.markup in MARKUP_BRACKETS) {
                let bracket1 = MARKUP_BRACKETS[markup.markup][0];
                let bracket2 = MARKUP_BRACKETS[markup.markup][1];

                let startPos = markup.start_char;
                let endPos = markup.end_char;
                let addedStartChar = false;

                if (startPos === 0) {
                  if (
                    i === 0 ||
                    !word[i - 1].markups ||
                    word[i - 1].markups[0].markup !== markup.markup
                  ) {
                    char.reading = bracket1 + char.reading;
                    addedStartChar = true;
                  }
                } else {
                  char.reading = this.insertBracket(
                    char.reading,
                    bracket1,
                    startPos
                  );
                  addedStartChar = true;
                }

                if (endPos === 0) {
                  if (
                    i === word.length - 1 ||
                    !word[i + 1].markups ||
                    !word[i + 1].markups.some(
                      markupItem => markupItem.markup === markup.markup
                    )
                  ) {
                    char.reading = char.reading + bracket2;
                  }
                } else {
                  if (addedStartChar) {
                    endPos++;
                  }
                  char.reading = this.insertBracket(
                    char.reading,
                    bracket2,
                    endPos
                  );
                }
              }

              // If it's a single bracket, just put insert it into the reading
              if (markup.markup in MARKUP_CHARACTERS) {
                let markupChar = MARKUP_CHARACTERS[markup.markup];
                if (markupChar.position === 1) {
                  char.reading += markupChar.reading;
                } else if (markupChar.position === -1) {
                  char.reading = markupChar.reading + char.reading;
                }
              }
            }
          }

          wordReading += char.reading;
          // wordReading += this.formattedReading(char)
          // Join two logograms with periods

          if (i !== word.length - 1) {
            if (char.type == LOGOGRAM && word[i + 1].type == LOGOGRAM) {
              if (char.numberVal && word[i + 1].numberVal) {
                wordReading += "+";
              } else {
                wordReading += ".";
              }
            } else {
              wordReading += "-";
            }
          }
        }
        // Add the last character
        // wordReading += this.formattedReading(word[word.length - 1]);
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