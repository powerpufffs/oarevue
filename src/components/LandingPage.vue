<template>
  <v-app>
    <v-app-bar app dark color="#002E5D" class="pa-3 mb-3" flat>
      <v-toolbar-title>
        <v-container>
          <v-row>
            <v-col cols="2">
              <a href="https://byu.edu" target="_blank">
                <v-img
                  src="../../static/BYU_abbrev.png"
                  class="mt-5"
                  max-height="50px"
                  max-width="120px"
                />
              </a>
            </v-col>
            <v-col cols="9" offset="1">
              <v-row class="subtitle-1">
                <a
                  id="byu_history_link"
                  class="blue-grey--text text--lighten-3"
                  href="https://history.byu.edu"
                  target="_blank"
                >History Department</a>
              </v-row>
              <v-row class="headline">{{title}}</v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content class="mt-5">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row>
          <v-col cols="0" md="1" lg="2" />
          <v-col cols="12" md="10" lg="8">
            <p>The Old Assyrian Research Environment (OARE – /’ôrə/) is a poly-hierarchical XML database focused on the documentary corpus of the Old Assyrian trade. The purpose of the database is to facilitate work with the Old Assyrian texts from the period of Kültepe Level II and Kültepe Level Ib. OARE is organized to record both textual and archaeological data, and expert observations arising from the interpretation of both sets of evidence. OARE is designed to facilitate collaborative research projects on the historical and archaeological record of the Old Assyrian trade and society through linguistic, lexical, economic, social, and other lenses.</p>
            <p>
              The OARE database is part of the Online Cultural and Historical Research Environment (OCHRE). Manuals for OCHRE and further information are available at
              <a
                href="http://ochre.uchicago.edu"
                target="_blank"
              >http://ochre.uchicago.edu</a>.
            </p>
            <p>Edward Stratford created OARE within the OCHRE platform.</p>
            <p>Director: Edward Stratford</p>
            <p>Editorial Board: Gojko Barjamovic, Hakan Erol, and Edward Stratford.</p>
            <p>OARE graciously thanks the following organizations for previous and/or ongoing support:</p>
            <v-row class="my-12">
              <v-col cols="12" md="5">
                <v-img class="mx-auto" src="../../static/u_of_c.png" max-width="300" height="60" />
              </v-col>
              <v-col cols="12" md="5">
                <v-img class="mx-auto" src="../../static/nccs.png" max-width="300" height="100" />
              </v-col>
              <v-col cols="12" md="2">
                <v-img
                  class="mx-auto"
                  src="../../static/byu_circle.png"
                  max-width="100"
                  height="100"
                />
              </v-col>
            </v-row>
            <span class="subtitle-1 font-weight-bold">CONTACT</span>
            <p class="mt-3">
              (801) 422-8556
              <br />2123 JFSB
              <br />Brigham Young University
              <br />Provo, UT 84602
            </p>
          </v-col>
          <v-col cols="0" md="1" lg="2" />
        </v-row>
      </v-container>
    </v-content>

    <v-footer app dark color="#002E5D" class="py-4">
      <v-img class="mx-auto" src="../../static/byu-wordmark-ring.svg" max-width="500" />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    title() {
      if (this.$vuetify.breakpoint.xsAndDown) {
        return "OARE";
      }
      return "Old Assyrian Research Environment";
    }
  }
};
</script>

<style scoped>
#byu_history_link {
  text-decoration: none;
}
</style>