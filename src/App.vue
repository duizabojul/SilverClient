<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
export default {};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display : flex;
  font-size : 16px;
  font-weight : 500;
  flex-direction: column
}


@import 'assets/css/main.css';
@import 'assets/css/normalize.css'
</style>
