// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import router from './router';
import { FBApp, FBUIApp } from './helpers/firebaseConfig'
import store from './store';

Vue.use(VueRouter);

Vue.config.productionTip = false

FBApp.auth().onAuthStateChanged(user => store.commit('SET_USER', user));
store.commit('SET_FB_APP', FBApp);
store.commit('SET_FB_UI_APP', FBUIApp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
  store
})
