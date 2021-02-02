import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TicTacToe from '../views/TicTacToe.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: TicTacToe,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
