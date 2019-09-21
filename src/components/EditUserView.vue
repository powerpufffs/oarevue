<template>
  <v-layout justify-space-between>
    <v-flex xs10 sm6 offset-sm3>
      <v-col align-self="align">       
            <div>
              <h3 class="headline mb-2 text-center">Sign Up</h3>
            </div>
            <v-col cols="12">
              <v-text-field label="Firstname" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined v-model="lastname" label="Lastname" name="lastname"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined v-model="email" label="Email" name="email"></v-text-field>
            </v-col>
            <ValidationProvider rules="secret" v-slot="{ errors }">
              <v-col cols="12">
                <v-text-field outlined v-model="password" label="Password" name="password"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field outlined v-model="repeatpassword" label="Repeat Password" name="repeatpassword"></v-text-field>
              </v-col>
            </ValidationProvider>
            <v-row>
              <v-col cols="12">
                <v-flex>
                  <v-btn flat color="primary">Register</v-btn>
                </v-flex>
              </v-col>
            </v-row>
      </v-col>
    </v-flex>
  </v-layout>
</template>

<script>
import ContentView from "./ContentView";

export default {
  name: "edituser",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      repeatpassword: "",
      firstname: "",
      lastname: "",
      prefix: "",
      organization: ""
    };
  },
  methods: {

  }
};
</script>