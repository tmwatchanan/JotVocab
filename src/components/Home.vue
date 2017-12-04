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
        Search word : <input @keyup.enter="searchWordInDict" v-model.trim="searchWord">
        <div >
          <span style="display: inline-flex;"><h1>{{ this.entry.word }}</h1>  <input @click="playsound" type="image" src="http://www.freeiconspng.com/uploads/speaker-icon-27.png" value="Play" style="width: 30px; height: 30px;" /></span>
          <table id="definition_table">
          </table>
        </div>
        Add some comment : <input type="text" id="comment" name="comment">
        <button @click="submitdata">Submit</button>
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
          var tb = document.getElementById("definition_table");
          tb.innerHTML =
            "<tr><td>No.</td><td>Definition</td><td>Synonym</td><td>Examples</td></tr>";

          var resultlength = 0;
          if (this.entry.results.length < 5)
            resultlength = this.entry.results.length;
          else resultlength = 5;
          for (var i = 0; i < resultlength; i++) {
            var result = this.entry.results[i];

            var tr = document.createElement("tr");
            tr.setAttribute("id", "row" + i);
            tb.appendChild(tr);

            var n = document.createElement("td");
            n.innerHTML = i + 1;
            document.getElementById("row" + i).appendChild(n);

            var def = document.createElement("td");
            if (result.partOfSpeech != null) {
              def.innerHTML =
                '<em style="color: red">[' + result.partOfSpeech + "]</em> ";
            }
            def.innerHTML += result.definition;
            document.getElementById("row" + i).appendChild(def);

            var syntd = document.createElement("td");
            syntd.setAttribute("id", "syntd" + i);
            document.getElementById("row" + i).appendChild(syntd);

            var synul = document.createElement("ul");
            synul.setAttribute("id", "synul" + i);
            document.getElementById("syntd" + i).appendChild(synul);

            if (result.synonyms != null) {
              var synno = 0;
              if (result.synonyms.length < 3) synno = result.synonyms.length;
              else synno = 3;

              for (var j = 0; j < synno; j++) {
                var synli = document.createElement("li");
                synli.appendChild(document.createTextNode(result.synonyms[j]));
                document.getElementById("synul" + i).appendChild(synli);
              }
            }

            var extd = document.createElement("td");
            extd.setAttribute("id", "extd" + i);
            document.getElementById("row" + i).appendChild(extd);

            var exul = document.createElement("ul");
            exul.setAttribute("id", "exul" + i);
            document.getElementById("extd" + i).appendChild(exul);

            if (result.examples != null) {
              var exno = 0;
              if (result.examples.length < 3) exno = result.examples.length;
              else exno = 3;

              for (var j = 0; j < exno; j++) {
                var exli = document.createElement("li");
                exli.appendChild(document.createTextNode(result.examples[j]));
                document.getElementById("exul" + i).appendChild(exli);
              }
            }
          }
        });
    },
    playsound() {
      responsiveVoice.speak(this.entry.word);
    },
    submitdata() {
      var Data = {
        uid: this.user.uid,
        word: this.entry.word,
        comment: document.getElementById("comment").value
      };
      console.log(Data);
      this.$http.post("http://localhost:8888/vocab", Data,
          {
            emulateJSON: true
          //   params: {
          //     id: this.uid
          //   }
          }
        )
        .then(
          response => {
            // define how to deal with the response
            console.log(response);
            alert("A new vocab has been added.");
            // this.fetchData();
          },
          error => {
            // define how to deal with error
            console.log(error);
          }
        );
    }
  },
  created() {
    this.searchWordInDict();
  }
};
</script>

<style>

</style>
