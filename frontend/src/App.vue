<template>
  <div id="app">
    <!-- Navigation bar -->
    <NavComponent :user="user" @userstate="LogoutUser" />

    <!-- Home -->

    <!-- We send the user to the children components (custom directive) -->
    <router-view :user="user" @userstate="GetUser" />
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import NavComponent from './components/NavComponent.vue';
export default {
  name: 'App',
  components: { NavComponent },
  // We get the user in case they are logged in and we send it in router-view
  setup() {
    let user = ref();
    const GetUser = async () => {
      try {
        await axios
          .get('/users/userLogin', {
            headers: { 'auth-token': localStorage.getItem('token') },
          })
          .then((res) => {
            console.log(res.data);
            user.value = res.data;
          });
      } catch (err) {
        console.log(err);
        user.value = null;
      }
    };
    const LogoutUser = () => {
      // Set user state to null if they logout > this reloads the component
      user.value = null;
    };
    // if (localStorage.getItem('token')) GetUser(); // We only get the user if the user is logged in
    onMounted(() => {
      // When page is load we load the data
      GetUser();
    });
    return { user, GetUser, LogoutUser };
  },
};
</script>

<style lang="scss">
/* General style */
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
* {
  box-sizing: border-box;
}

body {
  background: #363885 !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
}
body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}
#app {
  text-align: center;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
.auth-wrapper .form-control {
  margin-bottom: 1.5em;
}
.auth-wrapper .form-control:focus {
  border-color: #363885;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
/* Navbar */
.nav-spacing {
  padding: 0em 3em;
}
.navbar-light .navbar-brand {
  // color: #f2b500;
  font-size: 20px;
  font-family: 'Damion', cursive;
}
@media (max-width: 768px) {
  nav ul li {
    text-align: left;
  }
}
nav .avatar-style {
  cursor: pointer;
  margin-left: 10px;
}
nav ul li .button-padding {
  //color: purple;
  padding: 0.4em 0.7em !important;
}
/* Forms */
.custom-control-label {
  font-weight: 400;
}
.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}
.forgot-password a {
  color: #363885;
}
/* Progress bar >(loading data) */
#nprogress .bar {
  background: red !important;
}
#nprogress .peg {
  box-shadow: 0 0 10px red, 0 0 5px red !important;
}
#nprogress .spinner-icon {
  border-top-color: red !important;
  border-left-color: red !important;
}
</style>
