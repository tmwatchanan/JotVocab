<template>
      <div class="hello">
        <h3>{{ msg }}</h3>
        <!-- <pre>current user: {{user}}</pre> -->
        <!-- <pre>{{ entry }}</pre> -->
        <hr/>
        <div class="label">Search word: </div>
        <div id="search-box">
            <div class="layout-form">
              <div class="form-group" :class="{error: validation.hasError('user.email')}">
                <div class="col-lg-3 center-block" style="margin: auto;">
                  <input @keyup.enter="searchWordInDict" v-model.trim="searchWord" class="form-control">
                </div>
              </div>
            </div>
            <div style="font-weight: bold; color: red" class="message">{{ validation.firstError('searchWord') }}</div>
          <br>
          <!-- <span id="first" style="color: red;">Press Enter to Search Any Word...</span> -->
        </div>
        <div id="definition" class="table-users" style="visibility: hidden;">
          <div class="header">
            <span style="display: inline-flex;"><h1 id="search">{{ this.entry[0].search }}</h1>  <input id="play" align="right" @click="playsound" type="image" src="http://www.freeiconspng.com/uploads/speaker-icon-27.png" value="Play" style="width: 30px; height: 30px;" /></span>
          </div>
          <div id="showdef">
          <table id="definition_table" cellspacing="0">
          </table>
          <div style="margin: 10px">
            Add some comment : <input type="text" id="comment" name="comment">
            <button @click="submitdata" class="btn btn-success">Add</button>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import router from "../router";
import { wordAPIConfig } from "../helpers/apiConfigs";
import SimpleVueValidation from "simple-vue-validator";
var Validator = SimpleVueValidation.Validator;

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to JotVocab App",
      searchWord: "computer",
      entry: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  validators: {
    searchWord: function(value) {
      return Validator.value(value)
        .required()
        .regex(
          "^[A-Za-z ]*$",
          "Must only contain English alphabetic characters."
        );
    }
  },
  methods: {
    searchWordInDict() {
      this.$http
        .get("http://jotvocab-api.herokuapp.com/thaidict/" + this.searchWord)
        .then(response => {
          return response.json(); // return an a javascript object
        })
        .then(data => {
          this.entry = data;

          $("#first").remove();

          document.getElementById("definition").style.visibility = "visible";

          var tb = document.getElementById("definition_table");
          tb.innerHTML =
            "<tr><th>No.</th><th>Definition</th><th>Synonym</th><th>Select</th></tr>";

          for (var i = 0; i < this.entry.length; i++) {
            var result = this.entry[i];

            document.getElementById("showdef").style.visibility = "visible";
            document.getElementById("search").innerHTML = this.entry[0].search;
            document.getElementById("play").style.visibility = "visible";

            var tr = document.createElement("tr");
            tr.setAttribute("id", "row" + i);
            tb.appendChild(tr);

            var n = document.createElement("td");
            n.innerHTML = i + 1;
            document.getElementById("row" + i).appendChild(n);

            var def = document.createElement("td");
            def.setAttribute("id", "def" + i);
            var type = "";
            switch (result.type) {
              case "ABBR":
                type = "Abbreviation";
                break;
              case "ADJ":
                type = "Adjective";
                break;
              case "ADV":
                type = "Adverb";
                break;
              case "AUX":
                type = "Auxiliary verb";
                break;
              case "CLAS":
                type = "Classifier";
                break;
              case "CONJ":
                type = "Conjunction";
                break;
              case "DET":
                type = "Determiner";
                break;
              case "IDM":
                type = "Idiom";
                break;
              case "INT":
                type = "Interjection";
                break;
              case "N":
                type = "Noun";
                break;
              case "PHRV":
                type = "Pharse verb";
                break;
              case "PREP":
                type = "Preposition";
                break;
              case "PRF":
                type = "Prefix";
                break;
              case "PRON":
                type = "Pronoun";
                break;
              case "SL":
                type = "Slang";
                break;
              case "SUF":
                type = "Suffix";
                break;
              case "V":
                type = "verb";
                break;
              case "VI":
                type = "Transitive verb";
                break;
              case "VT":
                type = "Intransitive verb";
                break;
              case "VI, VT":
                type = "Intransitive and Transitive verb";
                break;
            }

            def.innerHTML = '<em style="color: red">[' + type + "]</em> ";

            def.innerHTML += result.result;
            document.getElementById("row" + i).appendChild(def);

            var syntd = document.createElement("td");
            syntd.setAttribute("id", "syntd" + i);
            document.getElementById("row" + i).appendChild(syntd);

            var synul = document.createElement("ul");
            synul.setAttribute("id", "synul" + i);
            document.getElementById("syntd" + i).appendChild(synul);

            if (result.synonym != null) {
              var synno = 0;
              if (result.synonym.length < 3) synno = result.synonym.length;
              else synno = 3;

              for (var j = 0; j < synno; j++) {
                var synli = document.createElement("li");
                synli.appendChild(document.createTextNode(result.synonym[j]));
                document.getElementById("synul" + i).appendChild(synli);
              }
            }

            var select = document.createElement("INPUT");
            select.setAttribute("type", "radio");
            select.setAttribute("name", "selradio");
            select.setAttribute("id", "select" + i);
            if (i == 0) {
              select.checked = true;
            }
            select.setAttribute(
              "value",
              document.getElementById("def" + i).innerHTML
            );
            document.getElementById("row" + i).appendChild(select);
            document.getElementById("select" + i).style.margin = "10px";
          }

          if (this.entry.length == 0) {
            document.getElementById("showdef").style.visibility = "collapse";
            document.getElementById("search").innerHTML = "Word not found!";
            document.getElementById("play").style.visibility = "hidden";
          }
        });
    },
    playsound() {
      responsiveVoice.speak(this.entry[0].search);
    },
    submitdata() {
      // console.log(this.user);
      this.$validate().then(function(success) {
        if (success) {
          var vm = this;
          firebase.auth().onAuthStateChanged(function(currentUser) {
            if (currentUser) {
              currentUser
                .getIdToken(/* forceRefresh */ true)
                .then(function(idToken) {
                  vm.userToken = idToken;
                  var data = {
                    uid: vm.user.uid,
                    token: vm.userToken,
                    word: vm.entry[0].search,
                    definition: $("input[name='selradio']:checked").val(),
                    comment: document.getElementById("comment").value
                  };
                  console.log(data);
                  vm.$http
                    .post(
                      "https://jotvocab-api.herokuapp.com/vocab/user/add",
                      data,
                      {
                        emulateJSON: true
                        //   params: {
                        //     id: vm.uid
                        //   }
                      }
                    )
                    .then(
                      response => {
                        // define how to deal with the response
                        console.log(response);
                        alert("A new vocab has been added.");
                        // vm.fetchData();
                      },
                      error => {
                        // define how to deal with error
                        console.log(error);
                        alert("This word and definition are already existed!");
                      }
                    );
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              // user NOT found
              console.log("User NOT found!");
            }
          });
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

.layout-form .form-group {
  display: flex;
  margin: 15px 0;
}

.layout-form .form-group .label {
  width: 20%;
  padding: 10px 10px 0 0;
  font-weight: bold;
  color: #374853;
  text-align: right;
}

.layout-form .form-group.error .label {
  color: #ff6666;
}

.layout-form .form-group .content {
  width: 50%;
  min-width: 120px;
}

.layout-form .form-group .content label {
  display: inline-block;
  padding: 5px 20px 0 0;
}

.layout-form .form-group .message {
  flex: 1;
  padding: 5px 0 0 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
}

.layout-form .form-group.error .message {
  color: #ff6666;
}

.layout-form .form-group .form-control {
  font-size: 14px;
}

.layout-form .form-group .actions {
  margin-left: 100px;
  width: 50%;
  text-align: right;
}

@media (max-width: 768px) {
  .layout-form {
    font-size: 12px;
  }

  .layout-form .form-group .label {
    width: 60px;
    padding-right: 10px;
  }

  .layout-form .form-group .form-control {
    font-size: 12px;
  }

  .layout-form .form-group .actions {
    margin-left: 60px;
  }
}

.layout-form .form-group input[type="text"].form-control,
.layout-form .form-group input[type="password"].form-control {
  width: 100%;
  font-weight: lighter;
  padding: 4px 6px;
  border: solid #acacac 1px;
  outline: none;
}

.layout-form .form-group input[type="text"].form-control:focus,
.layout-form .form-group input[type="password"].form-control:focus {
  border-color: #374853;
}

.layout-form .form-group.error input[type="text"].form-control,
.layout-form .form-group.error input[type="password"].form-control,
.layout-form .form-group.error input[type="text"].form-control:focus,
.layout-form .form-group.error input[type="password"].form-control:focus {
  border-color: #ff6666;
}

.layout-form .form-group .btn {
  font-size: 12px;
  font-weight: normal;
  padding: 6px 10px;
  border-radius: 4px;
  outline: none;
  appearance: none;
  cursor: pointer;
  text-transform: uppercase;
}

.layout-form .form-group .btn + .btn {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .layout-form .form-group .btn {
    padding: 3px 6px;
  }

  .layout-form .form-group .btn + .btn {
    margin-left: 4px;
  }
}

.layout-form .form-group .btn-primary {
  color: #fff;
  background-color: #41b883;
  border: solid #39a073 1px;
}

.layout-form .form-group .btn-primary:focus {
  background-color: #3dad7c;
}

.layout-form .form-group .btn-primary:active {
  background-color: #39a073;
}

.layout-form .form-group .btn-default {
  color: #374853;
  background-color: #fff;
  border: solid #acacac 1px;
}

.layout-form .form-group .btn-default:focus {
  background-color: #eee;
}

.layout-form .form-group .btn-default:active {
  background-color: #ccc;
}
</style>
