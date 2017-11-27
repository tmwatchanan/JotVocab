<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <hr>
    <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/auth" tag="li" active-class="active" exact><a>Login</a></router-link>
    <transition name="slide" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
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
  margin-top: 60px;
}
</style>
