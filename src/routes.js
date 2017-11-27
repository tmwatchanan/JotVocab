import Home from './components/Home.vue';
import Login from './components/Login.vue';

export const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  }
]