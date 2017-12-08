<template>
<div>
  <button @click="getRandomWord()" class="btn btn-primary">Random</button>
  <hr>
  definition: <h3>{{ randomWord.definition }}</h3>
  <hr>
  <button @click="showRandomWord = !showRandomWord" class="btn btn-success">Show</button>
  <h3 v-show="showRandomWord">{{ randomWord.word }}</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      randomWord: [],
      userToken: "",
      showRandomWord: false
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    getRandomWord() {
      var vm = this;
      firebase.auth().onAuthStateChanged(function(currentUser) {
        if (currentUser) {
          currentUser
            .getIdToken(/* forceRefresh */ true)
            .then(function(idToken) {
              vm.userToken = idToken;
              vm.$http
                .post("https://jotvocab-api.herokuapp.com/vocab/user/random", {
                  token: vm.userToken
                })
                .then(response => {
                  return response.json(); // return an a javascript object
                })
                .then(data => {
                  vm.randomWord = data;
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    showRandomWord() {

    }
  },
  created() {
    this.getRandomWord();
  }
};
</script>

<style>

</style>
