<template>
  <OareUserCard title="Register">
    <template v-slot>
      <v-form v-model="valid" ref="form">
        <v-text-field
          outline
          v-model="user.firstname"
          label="First Name"
          :rules="rules.firstName"
          outlined
        ></v-text-field>
        <v-text-field outlined v-model="user.lastname" :rules="rules.lastName" label="Last Name"></v-text-field>
        <v-text-field outlined v-model="user.email" :rules="rules.email" label="Email"></v-text-field>
        <v-text-field
          outlined
          v-model="user.password"
          :rules="rules.password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-text-field
          @keyup.enter="register"
          outlined
          v-model="user.repeatpassword"
          :rules="rules.repeatPassword"
          label="Confirm Password"
          name="repeatpassword"
          type="password"
        ></v-text-field>
        <p class="subtitle error--text">{{errorMsg}}</p>
      </v-form>
      <v-btn text class="text-none" to="/login">Already have an account? Login</v-btn>
    </template>

    <template v-slot:actions>
      <v-btn color="primary" @click="register">Confirm</v-btn>
    </template>
  </OareUserCard>
</template>

<script>
import { EventBus } from "../utils/index";
export default {
  name: "register",
  data() {
    return {
      valid: false,
      user: {
        email: "",
        username: "",
        password: "",
        repeatpassword: "",
        firstname: "",
        lastname: ""
      },
      rules: {
        firstName: [v => !!v.trim() || "First name cannot be blank."],
        lastName: [v => !!v.trim() || "Last name cannot be blank."],
        email: [
          v => !!v.trim() || "Email cannot be blank.",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid."
        ],
        password: [
          v => !!v || "Password is required.",
          v => v.length >= 8 || "Password must be at least 8 characters long"
        ],
        repeatPassword: [
          v => !!v || "Confirm password is required.",
          v => v === this.user.password || "Passwords do not match"
        ]
      },
      errorMsg: ""
    };
  },

  mounted() {
    EventBus.$on("registerFailure", msg => {
      this.errorMsg = msg;
    });
  },
  methods: {
    async register() {
      this.$refs.form.validate();
      if (!this.valid) {
        this.errorMsg = "Please fill in all required fields.";
        return;
      }
      this.errorMsg = "";
      let userData = {
        first_name: this.user.firstname,
        last_name: this.user.lastname,
        password: this.user.password,
        email: this.user.email
      };

      let success = await this.$store.dispatch("register", userData);
      if (success) {
        this.$router.push("/landing");
      }
    }
  }
};
</script>