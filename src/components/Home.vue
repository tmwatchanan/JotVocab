<template>
      <div class="hello">
        <h1>{{ msg }}</h1>
        <ul>
        <router-link to="/auth">Go to auth</router-link>
        <button v-if="user" @click="signOut">Sign out</button>
        </ul>
        <img :src="user.photoURL" style="height: 120px"> <br> 
        <pre>current user: {{user}}</pre>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(this.onSignOut, this.onError);
    },
    onSignOut() {
      console.log("onSignOut");
    },
    onError() {
      console.error("onError");
    }
  }
};
</script>

<style>

</style>
