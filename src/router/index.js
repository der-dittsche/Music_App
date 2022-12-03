import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import UserDetailsView from '@/views/UserDetailsView.vue';
import AuthView from '@/views/AuthView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManageView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserDetailsView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
});

export default router;
