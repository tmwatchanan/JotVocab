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
        Search word: <input @keyup.enter="searchWordInDict" v-model.trim="searchWord">
        <div>
          <h1>{{ this.entry.word }}</h1>
          <h2>Definition : </h2>
          <ol id="definition_list">
          </ol>
        </div>
        <!-- <pre>{{ this.entry.results }}</pre> -->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import router from "../router";
import { wordAPIConfig } from "../helpers/apiConfigs";

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to JotVocab App",
      searchWord: "computer",
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
    searchWordInDict() {
      this.$http
        .get("https://wordsapiv1.p.mashape.com/words/" + this.searchWord, {
          headers: {
            "X-Mashape-Key": wordAPIConfig.key
          }
        })
        .then(response => {
          return response.json(); // return an a javascript object
        })
        .then(data => {
          this.entry = data;
          var ul = document.getElementById("definition_list");
          ul.innerHTML = "";
          for (var i = 0; i < this.entry.results.length; i++) {
            var li = document.createElement("li");
            var result = this.entry.results[i];
            // li.appendChild(document.createTextNode("[" + result.partOfSpeech + "] " + result.definition));
            li.innerHTML = '<em style="color: red">[' + result.partOfSpeech + ']</em> ' + result.definition;
            li.setAttribute("id", "def" + i); // added line
            ul.appendChild(li);
          }
        });
    }
  },
  created() {
    this.searchWordInDict();
  }
};
</script>

<style>

</style>
