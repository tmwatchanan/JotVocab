<template>
  <div>
      <button @click="getMyVocabList">Get MyVocab List</button>
      <!-- <pre>{{ userToken }}</pre> -->
      <!-- <pre>{{ test }}</pre> -->
      <pre>{{ vocabList }}</pre>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      vocabList: [],
      test: "",
      userToken: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    getMyVocabList() {
      var vm = this;
      this.test = firebase.auth().currentUser;
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        vm.userToken = idToken;
      }).catch(function(error) {
        console.log(error);
      });
      var userCredential = {
        token: this.userToken
      };
      this.$http
        .post("https://jotvocab-api.herokuapp.com/vocabs/" + this.user.uid, userCredential)
        .then(response => {
          return response.json(); // return an a javascript object
        })
        .then(data => {
          this.vocabList = data[0].words;
        });
    }
  },
  created() {
    this.getMyVocabList();
  }
};
</script>

<style>

</style>
