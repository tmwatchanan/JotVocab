<template>
<div>
  <h1>{{ user.displayName }}'s Profile</h1>
  <a :href="user.photoURL">
    <img :src="user.photoURL" style="height: 180px">
  </a>
  <hr>
  <h3>User Token:</h3>
  <pre>{{ userToken }}</pre>
  <hr>
  <pre>{{ user }}</pre>
  <!-- <pre>
    {{user}}
  </pre> -->
  
  <hr class="">
</div>
</template>


<script>
import firebase from 'firebase';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userToken: ""
    };
  },
  name: "success",
  computed: {
    ...mapGetters({
      user: "user"
    }),
    firstName() {
      return this.user.displayName
        .split(" ")
        .slice(0, -1)
        .join(" ");
    },
    lastName() {
      return this.user.displayName
        .split(" ")
        .slice(-1)
        .join(" ");
    },
    joined() {
      return this.user.createdAt;
    }
  },
  methods: {
    getUserToken() {
      var vueThis = this;
      firebase.auth().onAuthStateChanged(function(currentUser) {
          if (currentUser) {
            currentUser
              .getIdToken(/* forceRefresh */ true)
              .then(function(idToken) {
                vueThis.userToken = idToken;
              })
          }
      });
    }
  },
  created() {
    this.getUserToken();
  }
};
</script>
