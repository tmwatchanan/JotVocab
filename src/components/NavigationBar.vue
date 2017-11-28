<template>
    <div>
      <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">JotVocab</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <i class="icon-home icon-white"></i>
              <router-link to="/" class="nav-link" active-class="active" exact>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/auth" class="nav-link" active-class="active" exact>Login</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
        <router-link v-if="!user" to="/auth" tag="button" class="btn btn-outline-primary my-2 my-sm-0" type="submit"><i class="fa fa-sign-in" aria-hidden="true"></i>Login</router-link>
        <img v-if="user" :src="user.photoURL" style="height: 38px">
        <span class="navbar-text"> {{ firstName }}</span>        
        <button v-if="user" @click="signOut" class="btn btn-outline-danger my-2 my-sm-0" type="submit"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
      </nav>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import router from "../router";

export default {
  computed: {
    ...mapGetters({
      user: "user"
    }),
    firstName() {
      return this.user.displayName.split(' ').slice(0, -1).join(' ');
    },
    lastName() {
      return this.user.displayName.split(' ').slice(-1).join(' ');
    }
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
    }
  }
};
</script>

<style scoped>
.navbar-login
{
    width: 305px;
    padding: 10px;
    padding-bottom: 0px;
}

.navbar-login-session
{
    padding: 10px;
    padding-bottom: 0px;
    padding-top: 0px;
}

.icon-size
{
    font-size: 87px;
}
</style>
