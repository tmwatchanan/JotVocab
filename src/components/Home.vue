<template>
      <div class="hello">
        <h2>{{ msg }}</h2>

        <!-- <ul> -->
        <!-- <router-link to="/auth">Go to auth</router-link>
        <button v-if="user" @click="signOut">Sign out</button> -->
        <!-- </ul> -->
        <!-- <img :src="user.photoURL" style="height: 120px"> <br>  -->
        <!-- <pre>current user: {{user}}</pre> -->
        <hr/>
        <pre>{{ this.entry }}</pre>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import router from "../router";
import oxfordAPIConfig from "../helpers/apiConfigs";

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to JotVocab App",
      entry: ""
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
      router.go({ path: "/", force: true });
    },
    onSignOut() {
      console.log("onSignOut");
    },
    onError() {
      console.error("onError");
    },
    fetchData() {
      this.$http
        .get(
          "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/tommy",
        )
        .then(response => {
          console.log(response.json());
          return response.json(); // return an a javascript object
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>

</style>
