<template>
  <!-- <OareUserCard title="Sign In">
    <template v-slot>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="email"
          class="emailField"
          :rules="emailRules"
          label="Email"
          outlined
        />
        <v-text-field
          class="passwordField"
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
  </OareUserCard>-->
  <v-card class="mt-12 pa-3 mx-auto" max-width="600" elevation="24">
    <v-card-title>
      <h3 class="headline mb-2">Sign In</h3>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="email"
          class="emailField"
          :rules="emailRules"
          label="Email"
          outlined
        />
        <v-text-field
          class="passwordField"
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
    </v-card-text>

    <v-card-actions>
      <!-- <slot name="actions"></slot> -->
      <v-btn @click="logIn" class="text-right loginBtn" color="primary">Sign In</v-btn>
    </v-card-actions>
  </v-card>
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
      console.log("log in");
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