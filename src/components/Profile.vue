<template>
<div>
  <h1>{{ user.displayName }}'s Profile</h1>
  <a :href="user.photoURL">
    <img :src="user.photoURL" style="height: 180px">
  </a>
  <!-- <pre>
    {{user}}
  </pre> -->
  
  <hr class="">
</div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
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
  }
};
</script>
