<template>
  <OareContentView :title="textName">
    <v-progress-linear v-if="loading" indeterminate />

    <v-container v-else>
      <v-row>
        <v-col cols="12" md="6">
          <OareSubheader>Transliteration</OareSubheader>
          <div v-for="(side, index) in sortedSides" :key="side">
            <OareSubheader :class="{'mt-4': index === 0 ? false : true }">{{ sideText(side) }}</OareSubheader>
            <OareListItem v-for="lineNum in sortedLineNums(side)" :key="lineNum">
              <sup>{{ lineNum }}.</sup>
              <span class="ml-2" v-html="lineText(tabletText[side][lineNum])" />
            </OareListItem>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <OareSubheader>Bound transcription</OareSubheader>
          <v-treeview class="title font-weight-regular" :items="discourses">
            <template v-slot:label="{ item }">{{ item.name }}</template>
          </v-treeview>
        </v-col>
      </v-row>
    </v-container>
  </OareContentView>
</template>

<script>
const LOGOGRAM = 2;
const PHONOGRAM = 1;
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
    reading: "!",
    position: 1
  },
  10: {
    reading: "?",
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

  computed: {
    markupChars() {
      let chars = [];
      for (const key in MARKUP_BRACKETS) {
        const val = MARKUP_BRACKETS[key];
        chars.push(val[0]);
        chars.push(val[1]);
      }

      for (const key in MARKUP_CHARACTERS) {
        const val = MARKUP_CHARACTERS[key];
        chars.push(val.reading);
      }
      return chars;
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
      let epigraphies = (await this.$axios.get(
        `/textEpigraphies/${this.textId}`
      )).data;
      let discourses = (await this.$axios.get(`/discourseUnits/${this.textId}`))
        .data;
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
     * Take a phonogram with epigraphic markup and italicize it.
     *
     * @arg {string} phonogram The phonogram to italicize
     */
    italicizePhonogram(phonogram) {
      return phonogram
        .split("")
        .map(char => {
          if (this.markupChars.includes(char) || char === "|") {
            return char;
          } else {
            return `<em>${char}</em>`;
          }
        })
        .join("");
    },

    /**
     * ! and ? should be superscripted, call this after
     * italicizePhonogram
     */
    superscriptMarkups(character) {
      let superscripted = "";
      for (let i = 0; i < character.length; i++) {
        let char = character[i];
        if (char === "!" || char === "?") {
          superscripted += `<sup>${char}</sup>`;
        } else {
          superscripted += char;
        }
      }
      return superscripted;
    },

    /**
     * Apply markup to a character
     *
     * @arg {object} char A character object
     * @arg {array} word The array of characters
     * @arg {number} charPos The position in `word` of char
     * @arg {array} line An array of words
     * @arg {number} wordPos The position in `line` of word
     *
     * @return {string} The reading of char with markup applied, if applicable
     */
    applyMarkup(char, word, charPos, line, wordPos) {
      if (char.markups) {
        // if (char.line === "40" && char.reading === "nu") {
        //   debugger;
        // }
        let reading = char.reading;
        for (let i = 0; i < char.markups.length; i++) {
          let markup = char.markups[i];

          if (markup.markup in MARKUP_BRACKETS) {
            const startPos = markup.start_char;
            const endPos = markup.end_char;

            const bracket1 = MARKUP_BRACKETS[markup.markup][0];
            const bracket2 = MARKUP_BRACKETS[markup.markup][1];

            if (startPos === 0) {
              // Check that the previous character does not have the same
              // markup character at its end
              let prevChar;
              if (charPos > 0) {
                prevChar = word[charPos - 1];
              } else if (wordPos > 0) {
                prevChar = line[wordPos - 1][line[wordPos - 1].length - 1];
              }

              if (prevChar && prevChar.markups) {
                // Equals -1 if the previous character does not have the same markup
                let prevMarkupIndex = prevChar.markups.findIndex(
                  m => m.markup === markup.markup
                );
                if (prevMarkupIndex >= 0) {
                  if (prevChar.markups[prevMarkupIndex].end_char > 0) {
                    reading = bracket1 + reading;
                  }
                } else {
                  reading = bracket1 + reading;
                }
              } else {
                reading = bracket1 + reading;
              }
            } else {
              // Insert bracket at given index
              reading = this.insertBracket(reading, bracket1, startPos);
            }

            if (endPos === 0) {
              let nextChar;
              if (charPos < word.length - 1) {
                nextChar = word[charPos + 1];
              } else if (wordPos < line.length - 1) {
                nextChar = line[wordPos + 1][0];
              }

              // Check that the next character does not have the same markup
              // character at its beginning
              if (nextChar && nextChar.markups) {
                let nextMarkupIndex = nextChar.markups.findIndex(
                  m => m.markup === markup.markup
                );

                if (nextMarkupIndex >= 0) {
                  if (nextChar.markups[nextMarkupIndex].start_char > 0) {
                    reading = reading + bracket2;
                  }
                } else {
                  reading = reading + bracket2;
                }
              } else {
                reading = reading + bracket2;
              }
            } else {
              reading = this.insertBracket(reading, bracket2, endPos);
            }
          } else if (markup.markup in MARKUP_CHARACTERS) {
            let markupChar = MARKUP_CHARACTERS[markup.markup];
            if (markupChar.position === 1) {
              reading = reading + markupChar.reading;
            } else if (markupChar.position === -1) {
              reading = markupChar.reading + reading;
            }
          }
        }
        return reading;
      }
      return char.reading;
    },

    /**
     * Get a '.' or '-' separator depending on if char is a logogram or phonogram
     *
     * @arg {object} char The character being examined
     * @arg {array} word An array of characters
     * @arg {number} charPos The position in `word` of `char`
     *
     * @returns {string} The appropriate separator, or empty string if not applicable
     */
    getSeparator(char, word, charPos) {
      if (charPos !== word.length - 1) {
        if (char.type === LOGOGRAM && word[charPos + 1].type === LOGOGRAM) {
          // Two numbers next to each other
          if (char.number_val && word[charPos + 1].number_val) {
            return "+";
          }
          // Two normal logograms
          else {
            return ".";
          }
        }
        // One is a phonogram
        else {
          return "-";
        }
      }
      return "";
    },

    /**
     * Text representation of the reading of a line
     *
     * @arg {number} line The line number to get the text of.
     */
    lineText(line) {
      let words = [];

      for (let i = 0; i < line.length; i++) {
        let word = line[i];
        let wordReading = [];
        for (let j = 0; j < word.length; j++) {
          let char = word[j];

          let charReading = this.applyMarkup(char, word, j, line, i);
          // let charReading = char.reading;
          if (char.type === PHONOGRAM) {
            charReading = this.italicizePhonogram(charReading);
          }
          charReading = this.superscriptMarkups(charReading);
          wordReading.push(charReading);
          wordReading.push(this.getSeparator(char, word, j));
        }
        words.push(wordReading.join(""));
      }
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