<template>
  <div>
    <p class="text-center" v-if="user">Hi, {{ user.first_name }}</p>
    <p class="text-center" v-if="!user">You are not logged in</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HomeComponent',
  computed: {
    ...mapGetters(['user']), // Syntax to get the user getter
  },
};
</script>
