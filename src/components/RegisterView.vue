<template>
  <OareUserCard title="Register">
    <template v-slot>
      <form @submit.prevent="handleSubmit">
        <v-col cols="12">
          <v-text-field label="Firstname" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined v-model="user.lastname" label="Lastname" name="lastname"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined v-model="user.email" label="Email" name="email"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined v-model="user.password" label="Password" name="password"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            outlined
            v-model="user.repeatpassword"
            label="Repeat Password"
            name="repeatpassword"
          ></v-text-field>
        </v-col>
      </form>
    </template>

    <template v-slot:actions>
      <v-btn color="primary">Register</v-btn>
    </template>
  </OareUserCard>
  <!-- <v-layout justify-space-between>
    <v-flex xs10 sm6 offset-sm3>
      <v-col>
        <div>
          <h3 class="headline mb-2 text-center">Sign Up</h3>
        </div>
        <form @submit.prevent="handleSubmit">
          <v-col cols="12">
            <v-text-field label="Firstname" outlined></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field outlined v-model="user.lastname" label="Lastname" name="lastname"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field outlined v-model="user.email" label="Email" name="email"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field outlined v-model="user.password" label="Password" name="password"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              v-model="user.repeatpassword"
              label="Repeat Password"
              name="repeatpassword"
            ></v-text-field>
          </v-col>
          <v-row>
            <v-col cols="12">
              <v-flex>
                <v-btn color="primary">Register</v-btn>
              </v-flex>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-flex>
  </v-layout>-->
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