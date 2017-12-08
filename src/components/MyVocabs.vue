<template>
  <div>
      <!-- <button @click="playsound('hello')">Get MyVocab List</button> -->
      <!-- <pre>{{ userToken }}</pre> -->
      <!-- <pre>{{ user }}</pre> -->
      <!-- <pre>{{ vocabList }}</pre> -->
      <div id="list" class="table-users">
        <div class="header">
          <h4>{{ this.user.displayName }}'s List</h4>
        </div>
        <table id="vocablist" cellspacing="0">
          <thead><tr><th>Times</th><th>Word</th><th>Definition</th><th>Comment</th><th>Delete?</th></tr></thead>
          <tbody>
            <tr v-for="(row, index) in this.vocabList">
              <td on>{{ new Date(row.timestamp).getMonth() + "/" + new Date(row.timestamp).getDate() + "/"  + new Date(row.timestamp).getFullYear() + " \n " + new Date(row.timestamp).getHours() + ":" + new Date(row.timestamp).getMinutes() + ":" + new Date(row.timestamp).getSeconds()}}</td>
              <td>{{ row.word }} <input id="play" align="right" @click="playsound(row.word)" type="image" src="http://www.freeiconspng.com/uploads/speaker-icon-27.png" value="Play" style="width: 15px; height: 15px;" /></td>
              <td>{{ row.definition }}</td>
              <td>{{ row.comment }} <input id="edit" @click="editComment(index)" type="image" src="https://image.flaticon.com/icons/svg/61/61456.svg" value="Delete" style="width: 15px; height: 15px;" /></td>
              <td><input id="bin" @click="deleteWord(index)" type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/446206-200.png" value="Delete" style="width: 15px; height: 15px;" /></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      vocabList: [],
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
      firebase.auth().onAuthStateChanged(function(currentUser) {
        if (currentUser) {
          currentUser
            .getIdToken(/* forceRefresh */ true)
            .then(function(idToken) {
              vm.userToken = idToken;
              vm.$http
                .post("https://jotvocab-api.herokuapp.com/vocab/user/list", {
                  token: vm.userToken
                })
                .then(response => {
                  return response.json(); // return an a javascript object
                })
                .then(data => {
                  vm.vocabList = data.words;
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    playsound(word) {
      responsiveVoice.speak(word);
    },
    deleteWord(index) {
      var vm = this;
      var r = confirm("Are you sure?");
      if (r == true) {
        firebase.auth().onAuthStateChanged(function(currentUser) {
          if (currentUser) {
            currentUser
              .getIdToken(/* forceRefresh */ true)
              .then(function(idToken) {
                vm.userToken = idToken;
                var data = {
                  token: vm.userToken,
                  word: vm.vocabList[index].word,
                  definition: vm.vocabList[index].definition
                };
                console.log(data);
                vm.$http
                  .delete(
                    "https://jotvocab-api.herokuapp.com/vocab/user/delete",
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
                      vm.getMyVocabList();
                      // vm.fetchData();
                    },
                    error => {
                      // define how to deal with error
                      console.log(error);
                      alert("ERROR! this vocab can not be deleted");
                    }
                  );
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        });
      }
    },
    editComment(index) {
      var vm = this;
      var r = prompt("Edit Your Comment : ", vm.vocabList[index].comment);
      if (r != null) {
        // console.log(r);
        firebase.auth().onAuthStateChanged(function(currentUser) {
          if (currentUser) {
            currentUser
              .getIdToken(/* forceRefresh */ true)
              .then(function(idToken) {
                vm.userToken = idToken;
                var data = {
                  token: vm.userToken,
                  word: vm.vocabList[index].word,
                  definition: vm.vocabList[index].definition,
                  comment: r
                };
                console.log(data);
                vm.$http
                  .put(
                    "https://jotvocab-api.herokuapp.com/vocab/user/edit",
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
                      // alert("Vocab's comment has been edited.");
                      vm.getMyVocabList();
                      // vm.fetchData();
                      // location.reload();
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
          }
        });
      }
    }
  },
  created() {
    this.getMyVocabList();
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
    content: "Time:";
  }
  td:nth-child(3):before {
    content: "Word:";
  }
  td:nth-child(4):before {
    content: "Definition:";
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
