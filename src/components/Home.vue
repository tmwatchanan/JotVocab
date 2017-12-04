<template>
      <div class="hello">
        <h2>{{ msg }}</h2>
        <!-- <pre>current user: {{user}}</pre> -->
        <hr/>
        <div id="search-box">
          Search word : <input @keyup.enter="searchWordInDict" v-model.trim="searchWord">
        </div>
        <div class="table-users">
          <div class="header">
            <span style="display: inline-flex;"><h1>{{ this.entry.word }}</h1>  <input align="right" @click="playsound" type="image" src="http://www.freeiconspng.com/uploads/speaker-icon-27.png" value="Play" style="width: 30px; height: 30px;" /></span>
          </div>
          <table id="definition_table" cellspacing="0">
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
      entry: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
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
            "<tr><th>No.</th><th>Definition</th><th>Synonym</th><th>Examples</th></tr>";

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
      // console.log(this.user);
      var Data = {
        uid: this.user.uid,
        token: this.user.accessToken,
        word: this.entry.word,
        comment: document.getElementById("comment").value
      };
      var getToken;
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     user.getIdToken(true).then(function(data) {
      //       // console.log(data)
      //       getToken = data;
      //     });
      //   }
      // });
        // console.log("idToken = " + idToken);
        // getToken = idToken;
      console.log(getToken);
      // console.log(Data);
      this.$http.post("https://jotvocab-api.herokuapp.com/vocab", Data,
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
body {
  background-color: #91ced4;
}
body * {
  box-sizing: border-box;
}

.header {
  background-color: #327a81;
  color: white;
  font-size: 1.5em;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
}

/* img {
  border-radius: 50%;
  height: 60px;
  width: 60px;
} */

.table-users {
  border: 1px solid #327a81;
  border-radius: 10px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  max-width: calc(100% - 2em);
  margin: 1em auto;
  overflow: hidden;
  width: 800px;
}

table {
  width: 100%;
}
table td,
table th {
  color: #2b686e;
  padding: 10px;
}
table td {
  text-align: center;
  vertical-align: middle;
}
table td:last-child {
  font-size: 0.95em;
  line-height: 1.4;
  text-align: left;
}
table th {
  background-color: #daeff1;
  font-weight: 300;
}
table tr:nth-child(2n) {
  background-color: white;
}
table tr:nth-child(2n + 1) {
  background-color: #edf7f8;
}

@media screen and (max-width: 700px) {
  table,
  tr,
  td {
    display: block;
  }

  td:first-child {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 100px;
  }
  td:not(:first-child) {
    clear: both;
    margin-left: 100px;
    padding: 4px 20px 4px 90px;
    position: relative;
    text-align: left;
  }
  td:not(:first-child):before {
    color: #91ced4;
    content: "";
    display: block;
    left: 0;
    position: absolute;
  }
  td:nth-child(2):before {
    content: "Name:";
  }
  td:nth-child(3):before {
    content: "Email:";
  }
  td:nth-child(4):before {
    content: "Phone:";
  }
  td:nth-child(5):before {
    content: "Comments:";
  }

  tr {
    padding: 10px 0;
    position: relative;
  }
  tr:first-child {
    display: none;
  }
}
@media screen and (max-width: 500px) {
  .header {
    background-color: transparent;
    color: white;
    font-size: 2em;
    font-weight: 700;
    padding: 0;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }

  img {
    border: 3px solid;
    border-color: #daeff1;
    height: 100px;
    margin: 0.5rem 0;
    width: 100px;
  }

  td:first-child {
    background-color: #c8e7ea;
    border-bottom: 1px solid #91ced4;
    border-radius: 10px 10px 0 0;
    position: relative;
    top: 0;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    width: 100%;
  }
  td:not(:first-child) {
    margin: 0;
    padding: 5px 1em;
    width: 100%;
  }
  td:not(:first-child):before {
    font-size: 0.8em;
    padding-top: 0.3em;
    position: relative;
  }
  td:last-child {
    padding-bottom: 1rem !important;
  }

  tr {
    background-color: white !important;
    border: 1px solid #6cbec6;
    border-radius: 10px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    margin: 0.5rem 0;
    padding: 0;
  }

  .table-users {
    border: none;
    box-shadow: none;
    overflow: visible;
  }
}
</style>
