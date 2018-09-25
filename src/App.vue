<template>
  <div id="app">
    <NavBar/>
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
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.page-container {
  display : flex;
  flex-direction : column;
  overflow : auto;
  flex-grow: 1
}
.flex {
  display : flex
}

.flex-column {
  display : flex;
  flex-direction: column
}

.flex-grow-1 {
  flex-grow: 1
}

.flex-grow-0 {
  flex-grow : 0
}

.flex-shrink-1 {
  flex-shrink: 1
}

.flex-shrink-0 {
  flex-shrink: 0
}

.f-center-v {
  display : flex;
  align-items : center
}

.f-center-h {
  display : flex;
  justify-content: center
}
.w-full {
  width : 100%
}

.title {
  font-size: 1.5em;
  font-weight: 500
}

.button {
  padding: 6px 14px !important;
  border: 1px solid transparent !important;
  border-radius: 4px;
  color: #fff !important;
  background: #23b7e5;
  font-size: 14px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  transition: .15s ease all;
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, .11), 0 1px 3px rgba(0, 0, 0, .08);
  line-height : 1.5;
}
.button.button-cancel-white, .button.button-cancel {
  background: transparent;
  color: rgb(38, 43, 45) !important
}
.button.lg {
  padding: 8px 16px !important;
}
.button.sm {
  font-size: 13px !important;
}
.button.xs {
  font-size: 12px !important;
  padding : 2px 4px !important;
}

.button.bg-heat {
  border : none !important
}

.button.bg-heat, .bg-heat {
  background: linear-gradient(165deg, #feb692, #faa07e, #f5896d, #f0705f, #ea5455) !important;
  color: #fffcfb !important;
}
.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08) !important;
}
.button:active {
  transform: translateY(1px);
  box-shadow: none !important;
}

.button.button-cancel-white:hover, .button.button-cancel-white:active{
  background: rgba(0,0,0,.2);
  box-shadow: none !important;
  transform: translateY(0) !important;
}

button:focus {
  outline: none
}

.button[disabled]{
  opacity: .6 !important;
  box-shadow: none !important;
}
@import 'assets/css/normalize.css'
</style>
