<template>
  <OareUserCard title="Sign In">
    <template v-slot>
      <v-form v-model="valid" ref="form">
        <v-text-field v-model="email" :rules="emailRules" label="Email" outlined />
        <v-text-field
          outlined
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
        />
      </v-form>
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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.isAuthenticated) {
        vm.$router.push("/");
      }
    });
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      errorMsg: "",
      emailRules: [v => !!v || "Please fill in the email field"],
      passwordRules: [v => !!v || "Please fill in the password field"]
    };
  },

  mounted() {
    EventBus.$on("loginFailure", msg => {
      this.errorMsg = msg;
    });
  },

  methods: {
    async logIn() {
      this.$refs.form.validate();
      if (!this.valid) {
        this.errorMsg = "Please fill in all required fields.";
        return;
      }
      this.errorMsg = "";
      let userData = {
        email: this.email,
        password: this.password
      };

      let success = await this.$store.dispatch("login", userData);

      if (success) {
        this.$router.push("/landing");
      }
    }
  }
};
</script>