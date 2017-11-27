import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import AuthSuccess from './components/AuthSuccess.vue';

export const routes = [
  {
    path: '*',
    redirect: '/'
  },
  { path: '/auth', component: Auth, name: 'Auth' },
  { path: '/success', component: AuthSuccess, name: 'AuthSuccess' },
  {
    path: '/',
    component: Home,
    name: 'Home'
  }
]