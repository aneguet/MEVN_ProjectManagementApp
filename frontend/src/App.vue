<template>
  <div id="app">
    <!-- Navigation bar: the key allows us to reload the navbar as well when pushing a specific route -->
    <NavComponent :key="$route.fullPath" />
    <div class="row">
      <SidebarComponent v-if="isUserLoggedIn()" />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavComponent from './components/NavComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import utils from './modules/utils';
export default {
  name: 'App',
  components: { NavComponent, SidebarComponent },
  setup() {
    const { isUserLoggedIn } = utils();
    return { isUserLoggedIn };
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
  margin: 0px;
}
* {
  box-sizing: border-box;
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
// body,
// html,
// #app,
// #root,
// .auth-wrapper {
//   width: 100%;
//   height: 100%;
// }
// #app {
//   text-align: center;
// }
#app {
  width: 100%;
  height: 100%;
}
.row {
  width: 100%;
  display: flex;
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
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
</style>
