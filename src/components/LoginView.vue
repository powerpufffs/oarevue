<template>
  <OareUserCard title="Sign In">
    <template v-slot>
      <v-text-field label="Email" outlined />
      <v-text-field outlined v-model="password" label="Password" name="password" />
      <v-btn text class="text-none" to="/register">Don't have an account? Register for free</v-btn>
      <br />
      <v-btn text class="text-none">Forgot password?</v-btn>
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