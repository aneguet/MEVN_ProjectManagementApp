<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <!-- using this instead of a links prevents reloading the page -->
      <router-link to="/" v-if="user" class="navbar-brand">Home</router-link>
      <router-link to="/login" v-if="!user" class="navbar-brand"
        >Home</router-link
      >
      <div class="collapse navbar-collapse">
        <!-- If the user is logged in -->
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Sign Up</router-link>
          </li>
        </ul>
        <!-- If the user is logged in -->
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <!-- when we click on logout nothing will happen -->
            <a
              href="javascript:void(0)"
              @click="handleLogoutClick"
              class="nav-link"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavComponent',
  methods: {
    handleLogoutClick() {
      // Remove user token from localStorage
      localStorage.removeItem('token');
      // Change value of user in store
      this.$store.dispatch('user', null);
      // Redirection to home
      this.$router.push({ path: '/' });
    },
  },
  computed: {
    ...mapGetters(['user']), // Syntax to get the user getter
  },
};
</script>
