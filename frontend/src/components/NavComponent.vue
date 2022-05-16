<template>
  <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light">
    <div class="container-fluid nav-spacing">
      <!-- Using router link instead of "a" links prevents reloading the page -->
      <router-link
        to="/"
        class="navbar-brand d-flex align-items-center logo-style"
      >
        <!-- <img
          src="../assets/logo.png"
          alt="Logo of time fly that consists of a fly"
          width="40"
          class="text-center"
        /> &nbsp;-->
        Timefly</router-link
      >

      <!-- Toggle functionality -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <!-- If the user is not logged in  -->
        <ul class="navbar-nav ms-auto mb-2 mb-md-0" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link" aria-current="page"
              ><Button
                class="p-button-outlined nav-link p-button-sm button-padding"
                label="Login"
              ></Button
            ></router-link>
            <!-- <router-link to="/login" class="nav-link" aria-current="page"
              >Login</router-link
            > -->
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link"
              ><Button
                class="p-button-outlined nav-link p-button-sm button-padding"
                label="Sign Up"
              ></Button
            ></router-link>
          </li>
        </ul>
        <!--  If the user is logged in  -->
        <ul class="navbar-nav ms-auto mb-2 mb-md-0" v-if="user">
          <li class="nav-item">
            <Button
              href="javascript:void(0)"
              @click="handleLogoutClick"
              label="Logout"
              class="p-button-outlined nav-link p-button-sm button-padding"
              icon="pi pi-sign-out"
            />
          </li>
          <li class="nav-item">
            <Avatar class="avatar-style" shape="circle">
              <img :src="user.avatar" />
            </Avatar>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'NavComponent',
  props: ['user'], // We retrieve the App.vue user prop
  setup(props, { emit }) {
    const router = useRouter();
    const userAvatar = localStorage.getItem('avatar');
    const handleLogoutClick = () => {
      // Remove user token from localStorage
      // localStorage.removeItem('token');
      localStorage.clear();
      // Change value of user in store -----
      emit('userstate', null);
      // this.$store.dispatch('user', null);
      // Redirection to home
      router.push({ path: '/' });
    };
    return { handleLogoutClick, userAvatar };
  },
};
</script>
