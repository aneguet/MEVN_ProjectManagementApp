<template>
  <form @submit.prevent="handleLoginSubmit">
    <div v-if="error" class="alert alert-danger text-center" role="alert">
      {{ error }}
    </div>
    <h3>Login</h3>
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
    <button class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async handleLoginSubmit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      // validate fields
      console.log(data);
      try {
        const res = await axios.post('/users/login', data);
        console.log(res);
        // Store user token in localStorage
        localStorage.setItem('token', res.data.data.token);
        // We update the state of the user by triggering an action: user(context, user)
        this.$store.dispatch('user', res.data.data.user);
        // Redirect to Home page
        this.$router.push({ path: '/' });
      } catch (err) {
        this.error = err.response.data.error;
        console.log(err.response.data.error);
      }
    },
  },
};
</script>
