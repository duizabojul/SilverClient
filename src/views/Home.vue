<template>
  <div id="home-page" class="page-container nice-background">
    <div class="absolute-center w-full">
      <div class="flex-column f-center-v w">
      <h1 class="white">Silver-Smok</h1>
      <div class="panel" id="login-panel">
        <div class="m-b-sm text-center">
          <strong>Entrez vos identifiants pour vous connecter</strong>
        </div>
        <form name="form">
          <div class="text-danger w-xs f-center-h text-center" style="color: white;background: rgb(239, 109, 93);border-radius: 3px;margin-bottom: 5px;font-size: 13px;font-weight: 500; margin : 0 7px"
            v-if="error">
            {{error}}
          </div>
          <swag-input v-on:input="loginInputsChanged" v-model="userMail" v-bind:type="'text'" v-bind:placeholder="'Entrez votre e-mail...'" v-bind:label="'E-mail'" v-bind:id="'login-mail-input'" ></swag-input>
          <swag-input v-on:input="loginInputsChanged" v-model="userPassword" v-bind:type="'password'" v-bind:placeholder="'Entrez votre mot de passe...'" v-bind:label="'Mot de passe'" v-bind:id="'login-password-input'" ></swag-input>
          <button v-bind:disabled="disableLogin" type="submit" class="button lg m-auto w-full m-auto m-t-sm m-b-sm"
           ><span class="no-animate" >Me connecter</span>
            <div class="no-animate spinner absolute-center white active-element">
            </div>
          </button>
        </form>
        <div class="b-t m-t-sm">
          <button type="submit" class="button lg m-auto bg-heat w-full m-auto m-t-lg m-b-0"
           >Créer un compte
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import SwagInput from '@/components/SwagInput.vue';


  export default Vue.extend({
    components : {
      SwagInput,
    },
    data() {
      return {
        error: null,
        userMail : '',
        userPassword : '',
        disableLogin : true
      };
    },
    methods: {
      test : function(){
        console.log(this.userMail)
      },
      loginInputsChanged : function(){
        this.disableLogin = !this.userMail.length || !this.userPassword.length 
      }
    },
    mounted :function() {
      
    }
  });
</script>

<style>
 #home-page .button{
   height : 40px
 }
  #login-panel {
    padding : 25px 30px;
    width: 100%;
    max-width: 400px;
  }
</style>