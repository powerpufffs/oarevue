<template>
  <OareUserCard title="Register">
    <template v-slot>
      <form @submit.prevent="handleSubmit">
        <v-text-field outline v-model="user.firstname" label="First Name" outlined></v-text-field>
        <v-text-field outlined v-model="user.lastname" label="Last Name"></v-text-field>
        <v-text-field outlined v-model="user.email" label="Email"></v-text-field>
        <v-text-field outlined v-model="user.password" label="Password" type="password"></v-text-field>
        <v-text-field
          outlined
          v-model="user.repeatpassword"
          label="Confirm Password"
          name="repeatpassword"
          type="password"
        ></v-text-field>
        <v-btn text class="text-none" to="/login">Already have an account? Login</v-btn>
      </form>
    </template>

    <template v-slot:actions>
      <v-btn color="primary" @click="register">Confirm</v-btn>
    </template>
  </OareUserCard>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: "",
        repeatpassword: "",
        firstname: "",
        lastname: "",
        organization: ""
      }
    };
  },
  methods: {
    async register() {
      let userData = {
        first_name: this.user.firstname,
        last_name: this.user.lastname,
        password: this.user.password,
        email: this.user.email
      }

      let success = await this.$store.dispatch('register', userData)
      if(success) {
        this.$router.push('/landing')
      } else {
        console.log('register failure')
      }
    },
    handleSubmit() {
      this.$validator.validate().then(valid => {
        if (valid) {
          alert("success");
        }
      });
      console.log("submitted");
    }
  }
};
</script>