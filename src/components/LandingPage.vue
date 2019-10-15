<template>
  <v-app>
    <OareAppBar />
    <v-content class="mt-5">
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
            <v-btn class="mb-5" dark color="#002E5D" to="/">Enter the site</v-btn>
            <p>Edward Stratford created OARE within the OCHRE platform.</p>
            <p>Director: Edward Stratford</p>
            <p>Editorial Board: Gojko Barjamovic, Hakan Erol, and Edward Stratford.</p>
            <p>OARE graciously thanks the following organizations for previous and/or ongoing support:</p>
            <v-row class="my-12">
              <v-col cols="12" md="5">
                <v-img class="mx-auto" src="img/u_of_c.png" max-width="300" height="60" />
              </v-col>
              <v-col cols="12" md="5">
                <v-img class="mx-auto" src="img/nccs.png" max-width="300" height="100" />
              </v-col>
              <v-col cols="12" md="2">
                <v-img class="mx-auto" src="img/byu_circle.png" max-width="100" height="100" />
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
    <OareFooter />
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
</style>