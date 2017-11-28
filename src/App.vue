<template>
  <div id="app">
    <navigation-bar/>
    <img src="./assets/logo.png">
    <hr>
    <!-- <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/auth" tag="li" active-class="active" exact><a>Login</a></router-link> -->
    <transition name="slide" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import NavigationBar from './components/NavigationBar'

export default {
  name: 'app',
  components: {
    HelloWorld,
    NavigationBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
