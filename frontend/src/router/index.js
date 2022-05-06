import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import HomeComponent from '../components/HomeComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';
import SignupComponent from '../components/SignupComponent.vue';
import TodoDetailView from '../views/TodoDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupComponent,
  },
  {
    path: '/todos',
    name: 'todos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/TodoView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/todo/:id',
    name: 'todo single',
    component: TodoDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
