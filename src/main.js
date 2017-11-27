// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import { routes } from './routes'; // routes.js
import { config } from './helpers/firebaseConfig'
import firebase from 'firebase'
import firebaseui from 'firebaseui';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes, // or just 'routes' in ES6
  mode: 'history'
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/success')
      } else {
        this.$router.push('/auth')
      }
    });
  }
})
