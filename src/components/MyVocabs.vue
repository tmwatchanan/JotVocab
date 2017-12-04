<template>
  <div>
      <!-- <button @click="getMyVocabList">Get MyVocab List</button> -->
      <pre>{{ vocabList }}</pre>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      vocabList: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    getMyVocabList() {
      this.$http
        .get("https://jotvocab-api.herokuapp.com/vocabs/" + this.user.uid)
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
