<template>
  <OareUserCard title="Sign In">
    <template v-slot>
      <v-text-field v-model="email" label="Email" outlined />
      <v-text-field outlined v-model="password" label="Password" type="password" />
      <p class="subtitle error--text">{{errorMsg}}</p>
      <v-btn text class="text-none" to="/register">Don't have an account? Register for free</v-btn>
      <br />
      <v-btn text class="text-none">Forgot password?</v-btn>
    </template>

    <template v-slot:actions>
      <v-btn @click="logIn" class="text-right" color="primary">Sign In</v-btn>
    </template>
  </OareUserCard>
</template>

<script>
import { EventBus } from "../utils/index";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    };
  },

  mounted() {
    EventBus.$on("loginFailure", msg => {
      this.errorMsg = msg;
    });
  },

  methods: {
    async logIn() {
      let userData = {
        email: this.email,
        password: this.password
      };

      let success = await this.$store.dispatch("login", userData);

      if (success) {
        this.$router.push("/landing");
      } else {
        console.log("login failure");
      }
    }
  }
};
</script>