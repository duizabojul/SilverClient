<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
export default {};
</script>


<style>
html, body, #app {
  height : 100%;
  width : 100%
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display : flex;
  flex-direction: column
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
  overflow : auto;
}

.absolute-center {
  position : absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%)
}
h1{
  font-weight: 500
}
.page-container.nice-background:before{
  content : ' ';
  position : absolute;
    background: linear-gradient( -15deg, #3C8CE7 20%, #00EAFF 120%);
    top: 0;
    right: 0;
    left: 0;
    height: 40vh;
    transform: scale(1.3) rotate(-1.5deg);
    z-index : -1
}
.white {
  color : rgba(255,255,255,.9)
}

.panel{
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 60px rgba(0, 30, 60, .1), 0 2px 8px rgba(0, 30, 60, .05);
  border: none;
  padding: 10px 30px;
  margin-bottom: 20px;
  background : white
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

.f-center {
  display : flex;
  justify-content: center;
  align-items: center
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
  font-weight: bold;
  transition: .15s ease all;
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, .11), 0 1px 3px rgba(0, 0, 0, .08);
  line-height : 1.5;
  cursor: pointer;
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
  pointer-events: none
}

.w-xl {
  padding: 30px
}
.w-lg {
  padding: 20px
}
.w {
  padding : 15px
}
.w-sm {
  padding: 10px
}
.w-xs {
  padding: 5px
}
.w-0 {
  padding: 0px
}
.w-b-xl {
  padding-bottom: 30px
}
.w-b-lg {
  padding-bottom: 20px
}
.w-b {
  padding-bottom : 15px
}
.w-b-sm {
  padding-bottom: 10px
}
.w-b-xs {
  padding-bottom: 5px
}
.w-b-0 {
  padding-bottom: 0px
}
.w-t-xl {
  padding-top: 30px
}
.w-t-lg {
  padding-top: 20px
}
.w-t {
  padding-top : 15px
}
.w-t-sm {
  padding-top: 10px
}
.w-t-xs {
  padding-top: 5px
}
.w-t-0 {
  padding-top: 0 px
}
.w-l-xl {
  padding-left: 30px
}
.w-l-lg {
  padding-left: 20px
}
.w-l {
  padding-left : 15px
}
.w-l-sm {
  padding-left: 10px
}
.w-l-xs {
  padding-left: 5px
}
.w-l-0 {
  padding-left : 0px
}
.w-r-xl {
  padding-right: 30px
}
.w-r-lg {
  padding-right: 20px
}
.w-r {
  padding-right : 15px
}
.w-r-sm {
  padding-right: 10px
}
.w-r-xs {
  padding-right: 5px
}
.w-r-0{
  padding-right: 0px
}

.m-auto {
  margin : auto
}

.m-auto-0{
  margin : auto 0
}

.m-0-auto {
  margin : 0 auto
}

.m-xl {
  margin: 30px
}
.m-lg {
  margin: 20px
}
.m {
  margin : 15px
}
.m-sm {
  margin: 10px
}
.m-xs {
  margin: 5px
}
.m-0{
  margin : 0px
}
.m-b-xl {
  margin-bottom: 30px
}
.m-b-lg {
  margin-bottom: 20px
}
.m-b {
  margin-bottom : 15px
}
.m-b-sm {
  margin-bottom: 10px
}
.m-b-xs {
  margin-bottom: 5px
}
.m-b-0{
  margin-bottom : 0px
}
.m-t-xl {
  margin-top: 30px
}
.m-t-lg {
  margin-top: 20px
}
.m-t {
  margin-top : 15px
}
.m-t-sm {
  margin-top: 10px
}
.m-t-xs {
  margin-top: 5px
}
.m-t-0{
  margin-top : 0px
}
.m-l-xl {
  margin-left: 30px
}
.m-l-lg {
  margin-left: 20px
}
.m-l {
  margin-left : 15px
}
.m-l-sm {
  margin-left: 10px
}
.m-l-xs {
  margin-left: 5px
}
.m-l-0{
  margin-left : 0px
}
.m-r-xl {
  margin-right: 30px
}
.m-r-lg {
  margin-right: 20px
}
.m-r {
  margin-right : 15px
}
.m-r-sm {
  margin-right: 10px
}
.m-r-xs {
  margin-right: 5px
}
.m-r-0{
  margin-right : 0px
}


* {
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.b-t{
  border-top : 1px solid rgba(0,0,0,.08)
}


@import 'assets/css/normalize.css'
</style>
