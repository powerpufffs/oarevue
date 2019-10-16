<template>
  <!-- <v-card class="mt-12 pa-3 mx-auto" max-width="600" elevation="24">
    <v-card-title primary-title>
      <h3 class="headline mb-2">Sign In</h3>
    </v-card-title>
    <v-card-text>
      <v-text-field label="Email" outlined />
      <v-text-field outlined v-model="password" label="Password" name="password" />
      <v-btn text class="text-none" to="/register">Don't have an account? Register for free</v-btn>
      <br />
      <v-btn text class="text-none" to="/register">Forgot password?</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-right" color="primary">Sign In</v-btn>
    </v-card-actions>
  </v-card>-->
  <OareUserCard title="Sign In">
    <template v-slot>
      <v-text-field label="Email" outlined />
      <v-text-field outlined v-model="password" label="Password" name="password" />
      <v-btn text class="text-none" to="/register">Don't have an account? Register for free</v-btn>
      <br />
      <v-btn text class="text-none" to="/register">Forgot password?</v-btn>
    </template>

    <template v-slot:actions>
      <v-btn class="text-right" color="primary">Sign In</v-btn>
    </template>
  </OareUserCard>
</template>

<script>
export default {
  name: "login",
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