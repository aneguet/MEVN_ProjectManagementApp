<template>
  <div class="generic-card">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <p class="text-center" v-if="user">Hi, {{ user.first_name }}</p>
        <p class="text-center" v-if="!user">You are not logged in</p>
        <!-- <button><router-link to=></router-link></button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  props: ['user'], // We retrieve the App.vue user prop
  setup() {},
};
</script>
