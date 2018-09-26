<template>
  <div id="home-page" class="page-container nice-background">
    <transition name="slide-up-fade">
    <div id="login-wrapper" v-if="showLoginWrapper">
      <div class="flex-column f-center-v w-l w-r">
        <h1 class="white m-t-0 m-b">Silver-Smok</h1>
        <transition  v-on:after-leave="afterLoginLeave" name='slide-up-fade'>
          <div class="panel login-panel" v-if="showLoginPanel">
            <div class="m-b-sm text-center">
              <strong>Entrez vos identifiants pour vous connecter</strong>
            </div>
            <form name="form">
              <div class="text-danger w-xs f-center-h text-center" style="color: white;background: rgb(239, 109, 93);border-radius: 3px;margin-bottom: 5px;font-size: 13px;font-weight: 500; margin : 0 7px"
                v-if="login.error">
                {{login.error}}
              </div>
              <swag-input v-on:input="loginInputsChanged" v-model="login.mail" v-bind:type="'text'" v-bind:placeholder="'Entrez votre e-mail...'"
                v-bind:label="'E-mail'" v-bind:id="'login-mail-input'"></swag-input>
              <swag-input v-on:input="loginInputsChanged" v-model="login.password" v-bind:type="'password'"
                v-bind:placeholder="'Entrez votre mot de passe...'" v-bind:label="'Mot de passe'" v-bind:id="'login-password-input'"></swag-input>
              <button v-bind:disabled="login.disableLogin" type="submit" class="button lg m-auto w-full m-auto m-t-sm m-b-sm"><span
                 >Me connecter à mon espace</span>
                <div v-if="login.tryingLogin" class="spinner absolute-center white active-element">
                </div>
              </button>
            </form>
            <div class="b-t m-t-lg flex-column f-center-v relative w-t-lg">
              <div class="login-separator">OU</div>
              <div class="m-b-sm text-center">
                <strong>Vous avez un compte fidélité dans une boutique Silver-Smok. Créez votre espace en ligne en 30 secondes !</strong>
              </div>
              <button type="submit" @click="createAccount" class="button lg m-auto bg-heat w-full m-auto m-t-xs m-b-0">Créer
                mon espace Silver-Smok
              </button>
            </div>
          </div>
        </transition>
         <transition v-on:after-leave="afterAccountCreationLeave" name='slide-up-fade'>
           <div v-if="showCreateAccountPanel">
          <div class="login-panel account-creation-panel panel">
             <div class="w bg-info gradient" style="font-size: 17px;font-weight: 700;padding-left: 20px;">
              Création de votre espace Silver-Smok
            </div>
            <div class="w-sm bg-black lter flex f-wrap" style="justify-content: space-around;">
              <div v-bind:class="{'active' : newAccount.step === 1}" class="flex-shrink-0 account-creation-state f-center-v w-t-xs w-b-xs">
                <span class="account-state-number">1</span>Liez votre compte
              </div>
              <div v-bind:class="{'active' : newAccount.step === 2}" class="flex-shrink-0 account-creation-state f-center-v w-t-xs w-b-xs">
                <span class="account-state-number">2</span>Créez votre mot de passe
              </div>
            </div>
            <div class="flex-column w-lg">
               <ul class="w-l-lg m-t-xs">
                <li>Afin de créer votre espace Silver-Smok, vous devez au préalable avoir un compte fidélité Silver-Smok dans une boutique, et communiqué votre adresse e-mail au vendeur.</li>
                <li class="m-t">Si vous avez un compte fidélité mais que vous n'avez pas communiqué votre adresse e-mail, vous pouvez vous rendre en boutique ou demander de l'aide à un conseiller sur la chatbox en bas à droite de l'écran.</li> 
              </ul>
              <swag-input v:bind:onenter="linkAccount" @input="accountCreationEmailChanged" v-model="newAccount.email" v-bind:type="'text'" v-bind:placeholder="'Entrez l\'adresse e-mail associée à votre compte Silver-Smok '"
                v-bind:label="'E-mail'" v-bind:id="'account-creation-mail-input'"></swag-input>
                <div class="flex">
                <div class="flex-grow-1"></div>
                <button v-bind:disabled="!newAccount.validEmail" class="button m-t" @click="linkAccount">
                  <span v-if="!newAccount.tryingLinking">Lier mon compte</span>
                  <div class="flex" v-if="newAccount.tryingLinking">
                    <span class="spinner white active-element m-r-sm"></span>
                    {{newAccount.tryingLinkingString}}
                  </div>
                  </button>
                </div>
            </div>
          </div>
          <div v-if="!newAccount.tryingLinking" class="product-name w-sm cursor-pointer" >
            <span style="text-decoration: underline;" @click="backToLoginPage">Annuler et revenir à la connexion</span>
          </div>
          </div>
         </transition>
      </div>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import SwagInput from '@/components/SwagInput.vue';
  import hb from '@/services/hiboutik.ts'

  const validateEmail = (email:string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  export default Vue.extend({
    components: {
      SwagInput,
    },
    data() {
      return {
        showLoginWrapper : false,
        showLoginPanel: true,
        showCreateAccountPanel : false,
        login : {
          mail : '',
          password : '',
          disableLogin : true,
          error : '',
          tryingLogin : false
        },
        newAccount : {
          email : '',
          step : 1,
          validEmail : false,
          tryingLinking : false,
          tryingLinkingString : ''
        }
      };
    },
    methods: {
      test: function () {
        hb.test().then(console.log).catch(console.log)
      },
      loginInputsChanged: function () {
        this.login.disableLogin = !this.login.mail.length || !validateEmail(this.login.mail) || !this.login.password.length
      },
      createAccount: function () {
        this.showLoginPanel = false
        this.newAccount = {
          email : '',
          step : 1,
          validEmail : false,
          tryingLinking : false,
          tryingLinkingString : ''
        }
      },
      afterLoginLeave : function(){
        this.showCreateAccountPanel = true
        setTimeout(() => {
          document.getElementById('account-creation-mail-input').focus()
        },600)
      },
      backToLoginPage : function () {
        this.showCreateAccountPanel = false
        this.login = {
          mail : '',
          password : '',
          disableLogin : true,
          error : '',
          tryingLogin : false
        }
      },
      afterAccountCreationLeave : function () {
        this.showLoginPanel = true
      },
      accountCreationEmailChanged: function() {
        this.newAccount.validEmail = this.newAccount.email.length > 0 && validateEmail(this.newAccount.email)
      },
      linkAccount : function(){
        console.log('coucou')
        if(this.newAccount.validEmail){
          this.newAccount.tryingLinking = true
          this.newAccount.tryingLinkingString = "Recherche du compte associé a l'e-mail..."
        }
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.showLoginWrapper = true
      },100)
    }
  });
</script>

<style>
  .slide-up-fade-enter-active {
    transition: all .5s cubic-bezier(0.25, 0.8, 0.25, 1)
  }

  .slide-up-fade-leave-active {
    transition: all .5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .slide-up-fade-enter,
  .slide-up-fade-leave-to
    {
    transform: translateY(-20px);
    opacity: 0;
  }

  .login-separator {
    position: absolute;
    top: -10px;
    background: white;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 700;
    color: #888;
  }

  #login-wrapper {
    width: 100%;
    margin-top: 5vh
  }

  #home-page {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    overflow-y: auto
  }

  #home-page .button {
    height: 40px
  }

  .login-panel {
    padding: 25px 30px;
    width: 100%;
    max-width: 460px;
  }

  .account-creation-panel{
    padding : 0;
    overflow : hidden;
    max-width: 600px;
    margin-bottom : 0
  }

  .account-creation-state {
  font-size: 14px;
  font-weight: 500;
  color: #7090a8;
}
.account-creation-state.active {
  color : white;
}
.account-state-number{
  border-radius: 50px;
  color: #fff;
  background: #516e83;
  margin-right: 15px;
  width: 35px;
  height: 35px;
  display: flex;
  font-weight: 700;
  font-size: 15px;
  justify-content: center;
  align-items: center;
}

.account-creation-state.active .account-state-number{
  background : #23b7e5;
}
</style>