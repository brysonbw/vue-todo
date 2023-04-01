import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoDetailView from '../views/TodoDetailView.vue';
import PageNotFoundView from '../views/PageNotFoundView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView,
  },
  {
    path: '/todo/:id',
    name: 'todo-detail',
    component: TodoDetailView,
    props: true,
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFoundView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
