<template>
  <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light">
    <div class="container-fluid nav-spacing">
      <!-- Using router link instead of "a" links prevents reloading the page -->
      <router-link
        to="/"
        class="navbar-brand d-flex align-items-center logo-style"
      >
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

        <ul class="navbar-nav ms-auto mb-2 mb-md-0" v-if="!isUserLoggedIn()">
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

        <ul class="navbar-nav ms-auto mb-2 mb-md-0" v-else>
          <!-- href="javascript:void(0)" -->
          <li class="nav-item">
            <Button
              @click="logoutUser"
              label="Logout"
              class="p-button-outlined nav-link p-button-sm button-padding"
              icon="pi pi-sign-out"
            />
          </li>
          <li class="nav-item">
            <Avatar class="avatar-style" shape="circle">
              <img :src="avatar" to="/user" />
            </Avatar>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import utils from '../modules/utils';
export default {
  name: 'NavComponent',

  setup() {
    const router = useRouter();
    const { isUserLoggedIn } = utils();
    const avatar = localStorage.getItem('avatar');
    const logoutUser = () => {
      localStorage.removeItem('token');
      localStorage.clear();
      // Redirection to home
      router.push('/login');
    };

    return { logoutUser, isUserLoggedIn, avatar };
  },
};
</script>
