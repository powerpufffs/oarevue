<template>
  <v-layout justify-space-between>
    <v-flex xs10 sm6 offset-sm3>
      <v-col align-self="align">
        <v-card class="w-full mt-12 p-3 mx-auto" :style="classes" :width="450" :elevation="24">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-2 text-center">Sign In</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-col cols="12">
              <v-text-field label="Email" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined v-model="password" label="Password" name="password"></v-text-field>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-flex>
                  <v-btn flat color="primary">Forgot Password</v-btn>
                  <v-btn class="text-right" color="primary">Sign In</v-btn>
                </v-flex>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: "signin",
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {}
};
</script>