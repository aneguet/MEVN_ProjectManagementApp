<template>
  <!-- '.prevent' Prevents page reload when submitting (PreventDefault method) -->
  <form @submit.prevent="handleSignUpSubmit">
    <div v-if="error" class="alert alert-danger text-center" role="alert">
      {{ error }}
    </div>
    <h3>Sign Up</h3>
    <!-- First Name -->
    <div class="form-group">
      <label for="first-name">First Name</label>
      <input
        id="first-name"
        type="text"
        class="form-control"
        placeholder="First Name"
        v-model="first_name"
      />
    </div>
    <!-- Last Name -->
    <div class="form-group">
      <label for="last-name">Last Name</label>
      <input
        id="last-name"
        type="text"
        class="form-control"
        placeholder="Last Name"
        v-model="last_name"
      />
    </div>
    <!-- Email -->
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        class="form-control"
        placeholder="Email"
        v-model="email"
      />
    </div>
    <!-- Password -->
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <!-- Password confirm. -->
    <div class="form-group">
      <label for="password">Confirm Password</label>
      <input
        id="password-confirm"
        type="password"
        class="form-control"
        placeholder="Confirm Password"
        v-model="password_confirm"
      />
    </div>
    <button class="btn btn-primary btn-block">Sign Up</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignupComponent',
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
      error: '',
    };
  },
  methods: {
    async handleSignUpSubmit() {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      };
      // validate fields
      console.log(data);
      try {
        const res = await axios.post('/users/register', data);
        console.log(res);
        //Successful Signup > Redirection to login page
        this.$router.push({ path: '/login' });
      } catch (err) {
        this.error = err.response.data.error;
        console.log(err.response.data.error);
      }
    },
  },
};
</script>
