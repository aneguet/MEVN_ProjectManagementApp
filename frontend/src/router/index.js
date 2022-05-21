import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginComponent from '../components/LoginComponent.vue';
import SignupComponent from '../components/SignupComponent.vue';
import AboutView from '../views/AboutView.vue';
import UsersList from '../views/UsersList.vue';
import UserSettings from '../views/UserSettings.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import TasksList from '../views/TasksList.vue';
// import { checkLoggedIn } from './navigationGuard';

const routes = [
  {
    path: '/:catchAll(.*)', // Unrecognized path
    redirect: '/',
    beforeEnter: checkIfLoggedIn,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: checkIfLoggedIn,
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
    path: '/users',
    name: 'users',
    component: UsersList,
    beforeEnter: [
      function (from, to, next) {
        // check if user is logged in
        if (
          localStorage.getItem('token') !== null &&
          localStorage.getItem('token') !== undefined
        ) {
          next(); // proceeds to execute the second function
        } else {
          next('/login');
        }
      },
      function (from, to, next) {
        // check if user is admin
        if (
          localStorage.getItem('role') !== null &&
          localStorage.getItem('role') !== undefined &&
          localStorage.getItem('role') == 'admin'
        ) {
          next();
        }
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    component: UserSettings,
    beforeEnter: checkIfLoggedIn,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: ProjectDetail,
    beforeEnter: checkIfLoggedIn,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksList,
    beforeEnter: [
      function (from, to, next) {
        // check if user is logged in
        if (
          localStorage.getItem('token') !== null &&
          localStorage.getItem('token') !== undefined
        ) {
          next();
        } else {
          next('/login');
        }
      },
      function (from, to, next) {
        // check if user is admin
        if (
          localStorage.getItem('role') !== null &&
          localStorage.getItem('role') !== undefined &&
          localStorage.getItem('role') == 'admin'
        ) {
          next();
        }
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    BeforeEnter: checkIfLoggedIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Check if user is logged in before letting them enter the routes
function checkIfLoggedIn(to, from, next) {
  if (
    localStorage.getItem('token') !== null &&
    localStorage.getItem('token') !== undefined
  ) {
    next();
  } else {
    next('/login');
  }
}

export default router;
