<template>
  <div  id="navbar">
    <span class="title">Silver-Smok</span>
    <div class="flex-grow-1"></div>
    <div v-if="user">logged in</div>
    <button v-on:click="toggleUser" class="button" v-if="!user">Connexion</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  data() {
    return {
      user: false,
    };
  },
  methods: {
    toggleUser() {
      this.user = !this.user;
    },
  },
});
</script>

<style>
#navbar {
  z-index: 1;
  display : flex;
  padding : 10px 15px;
  align-items: center;
  min-height: 35px;
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
