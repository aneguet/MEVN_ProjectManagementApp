import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './axios.js';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null, // Initial state of user
    };
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    },
  },
  getters: {
    user: (state) => {
      console.log(state.user);
      return state.user;
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
// createApp(App).use(router, store).mount('#app');
