<template>
  <div id="home-page" class="page-container">
    <transition name="slide-up-fade">
      <div class="full-page-modal" :class="newAccount.step === 3 ? 'leave' : ''" v-if="newAccount.hiboutikAccount">
        <div class="close-modal leave-element" >
          <div @click="newAccount.hiboutikAccount = null" class="icon-close"></div>
        </div>
        <div class="flex-column f-center-v w-lg w-full" style="max-width : 430px; margin : 40px 0">
          <h1 style="font-size : 30px" class="leave-element">Plus qu'une chose...</h1>
          <div class="f-center flex-grow-1 w-full">
            <div id="silversmok-card" :class="newAccount.step === 2 ? 'backface' : ''">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-header">
                    <div class="" style="    padding : 5px 0 3px ; text-transform: capitalize;
    font-size: 20px;
    font-weight: 700;"
                      >{{newAccount.hiboutikAccount.first_name}}
                      {{newAccount.hiboutikAccount.last_name}}</div>
                  </div>
                  <div class="flex-grow-1 f-center">
                    <img srcset="../assets/silver-smok-logo-2x.png 2x" src="../assets/silver-smok-logo.png" style="height : 140px">
                  </div>
                  
                </div>

                <div class="flip-card-back">
                  <div class="card-header">
                    <div class="" style="    padding : 5px 0 3px ; text-transform: capitalize;
    font-size: 20px;
    font-weight: 700;"
                      >{{newAccount.hiboutikAccount.first_name}}
                      {{newAccount.hiboutikAccount.last_name}}</div>
                  </div>
                  <div class="f-center w-lg flex-column">
                  <swag-input @keyup.enter="focusInput('account-creation-repeat-password-input')" style="max-width : 350px"
                    @input="accountCreationEmailChanged"  class="no-border" v-model="newAccount.password" placeholder="Votre mot de passe"
                   id="account-creation-password-input" type="password"></swag-input>
                  <swag-input @keyup.enter="createAccount" class="no-border"  style="max-width : 350px" @input="accountCreationEmailChanged"
                    v-model="newAccount.repeatPassword" placeholder="Confirmez votre mot de passe" id="account-creation-repeat-password-input"
                    type="password"></swag-input>
                    </div>
                    
                </div>
              </div>
            </div>
          </div>

          <div class="flex w-full">
            <button class="button w-full purple-background leave-element" @click="createAccount">
              <div class="flex">
                <span v-if="newAccount.creatingAccount" class="spinner white active-element m-r-sm"></span>
                <span>{{newAccount.accountCreationString}}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
    <div class="header f-center-h">
      <div class="header-container f-center-v">
        <h1>Silver-Smok<span>Fidélité</span></h1>
        <div class="flex-grow-1"></div>
        <div class="connect-button">Connexion</div>
      </div>
    </div>
    <div class="f-wrap h-full overflow-auto">
      <div id="left-container">
        <div class="flex-column">
          <h1>Créez votre espace</h1>
          <div class="subtitle">Créez votre espace en ligne en quelque secondes, et retrouvez vos achats, vos
            garanties, et tous vos
            avantages Silver-Smok. </div>
          <div class="f-center-v f-wrap" style="margin : 0 -5px">
            <swag-input v-bind:isEmail="true" class="m-xs" style="flex : 1 1 320px" @keyup.enter="linkAccount" @input="accountCreationEmailChanged"
              v-model="mail" placeholder="Votre adresse e-mail" label="E-mail" id="account-creation-mail-input"></swag-input>
            <button style="flex : 1 1 200px" class="button purple-background m-xs" @click="linkAccount">
              <div class="flex">
                <span v-if="tryingLinking" class="spinner white active-element m-r-sm"></span>
                <span>Créer votre espace</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div id="right-container" class="purple-background">
        <div>
        </div>
      </div>
    </div>

    <!-- <transition name="slide-up-fade">
      <div id="login-wrapper" style="display : none" v-if="showLoginWrapper">
        <div class="flex-column f-center-v w w-t-0">
          <h1 class="white m-t-0 m-b">Silver-Smok</h1>
          <transition @after-leave="afterLoginLeave" name='slide-up-fade'>
            <div class="panel login-panel" v-if="showLoginPanel">
              <div class="m-b-sm text-center">
                <strong>Entrez vos identifiants pour vous connecter</strong>
              </div>
              <div class="text-danger w-xs f-center-h text-center" style="color: white;background: rgb(239, 109, 93);border-radius: 3px;margin-bottom: 5px;font-size: 13px;font-weight: 500; margin : 0 7px"
                v-if="login.error">
                {{login.error}}
              </div>
              <swag-input @keyup.enter="focusInput('login-password-input')" @input="loginInputsChanged" v-model="login.mail"
                placeholder="Entrez votre e-mail..." label="E-mail" id="login-mail-input"></swag-input>
              <swag-input @keyup.enter="logUser" @input="loginInputsChanged" v-model="login.password" type="password"
                placeholder="Entrez votre mot de passe..." label="Mot de passe" id="login-password-input"></swag-input>
              <button :disabled="login.disableLogin" @click="logUser" class="button lg m-auto w-full m-auto m-t-sm m-b-sm">
                <span v-if="!login.tryingLogin">Me connecter à mon espace</span>
                <div v-if="login.tryingLogin" class="spinner absolute-center white active-element">
                </div>
              </button>
              <div class="b-t m-t-lg flex-column f-center-v relative w-t-lg">
                <div class="login-separator">OU</div>
                <div class="m-b-sm text-center">
                  <strong>Vous avez un compte fidélité dans une boutique Silver-Smok. Créez votre espace en ligne en 30
                    secondes !</strong>
                </div>
                <button @click="goToCreatingAccountProcess" class="button lg m-auto bg-heat w-full m-auto m-t-xs m-b-0">Créer
                  mon espace Silver-Smok
                </button>
              </div>
            </div>
          </transition>
          <transition @after-leave="afterAccountCreationLeave" name='slide-up-fade'>
            <div v-if="showCreateAccountPanel">
              <div class="login-panel account-creation-panel panel">
                <div class="w bg-info gradient text-center-sm" style="font-size: 17px;font-weight: 700;padding-left: 20px;">
                  Création de votre espace Silver-Smok
                </div>
                <div class="w-sm bg-black lter flex f-wrap" style="justify-content: space-around;">
                  <div @click="newAccount.step = 1" :class="{'active' : newAccount.step === 1}" class="flex-shrink-0 account-creation-state f-center-v w-t-xs w-b-xs">
                    <span class="account-state-number">1</span>Liez votre compte
                  </div>
                  <div @click="newAccount.step = 2" :class="{'active' : newAccount.step === 2}" class="flex-shrink-0 account-creation-state f-center-v w-t-xs w-b-xs">
                    <span class="account-state-number">2</span>Créez votre mot de passe
                  </div>
                </div>
                <div class="horizontal-slider" :class="newAccount.step === 2 ? 'step-2' : ''">
                  <div class="flex-column w-lg">
                    <ul class="w-l-lg m-t-xs flex-column flex-grow-1" style="justify-content : space-evenly">
                      <li>Afin de créer votre espace Silver-Smok, vous devez au préalable avoir un compte fidélité
                        Silver-Smok dans une boutique, et communiqué votre adresse e-mail au vendeur.</li>
                      <li class="m-t">Si vous avez un compte fidélité mais que vous n'avez pas communiqué votre adresse
                        e-mail, vous pouvez vous rendre en boutique ou demander de l'aide à un conseiller sur la
                        chatbox
                        en bas à droite de l'écran.</li>
                      <li class="m-t">Entrez l'adresse e-mail associée à votre compte Silver-Smok afin que nous
                        puissions rechercher et lier votre compte. </li>
                    </ul>
                    <div class="flex">
                      <div class="flex-grow-1"></div>

                    </div>
                  </div>

                </div>
              </div>
              <div :style="{'opacity' : newAccount.tryingLinking ? '0' : '1' }" class="product-name w-sm cursor-pointer">
                <span style="text-decoration: underline;" @click="backToLoginPage">Annuler et revenir à la connexion</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script lang="ts">
  import fb from '@/services/firebase.ts'
  import Vue from 'vue';
  import SwagInput from '@/components/SwagInput.vue';
  import hb from '@/services/hiboutik.ts'
  import router from '@/router';
  import {
    setTimeout
  } from 'timers';

  const validateEmail = (email: string) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const loginDefault = {
    mail: '',
    password: '',
    disableLogin: true,
    error: '',
    tryingLogin: false
  }

  const newAccountDefault = {
    step: 1,
    hiboutikAccount: null,
    password: '',
    repeatPassword: '',
    creatingAccount: false,
    accountCreationString: 'Définir mon mot de passe'
  }

  export default Vue.extend({
    components: {
      SwagInput
    },
    data() {
      return {
        showLoginWrapper: false,
        showLoginPanel: true,
        showCreateAccountPanel: false,
        login: loginDefault,
        newAccount: Object.assign({},newAccountDefault),
        mail : '',
        tryingLinking : false,
        validEmail : false
      };
    },
    methods: {
      logUser: function () {
        if (this.login.mail.length && this.login.password.length && validateEmail(this.login.mail)) {
          this.login.tryingLogin = true
          fb.logUser(this.login.mail, this.login.password).then(() => {
            this.login.tryingLogin = false
            router.push('/home')
          }).catch(error => {
            console.log(error)
            this.login.tryingLogin = false
          })
        }

      },
      focusInput: function (elementId: string) {
        const input = document.getElementById(elementId)
        input && input.focus()
      },
      loginInputsChanged: function () {
        this.login.disableLogin = !this.login.mail.length || !this.login.password.length || !validateEmail(this.login
          .mail)
      },
      accountCreationEmailChanged: function () {
        this.validEmail = this.mail.length > 0 && validateEmail(this.mail)
      },
      linkAccount: function (event: any) {
        if (this.validEmail && !this.tryingLinking) {
          event.target.blur()
          this.tryingLinking = true
          this.mail = this.mail.toLowerCase()
          const mail = this.mail
          fb.callFunction('searchCustomerForLinking', {mail}).then((response: any) => {
            if (response && response.data && response.data[0] && response.data[0].email.toLowerCase() ===
              mail) {
              this.newAccount = Object.assign({},newAccountDefault)
              this.newAccount.hiboutikAccount = response.data[0]
              console.log(this.newAccount.hiboutikAccount)
            }
          }).catch((e: any) => {
            if (e && e.code) {
              if (e.code === 'already-exists') {

              } else if (e.code === 'not-found') {

              }
            }
          }).finally(() => {
            this.tryingLinking = false
          })
        }
      },
      createAccount: function () {
        if (this.newAccount.step === 1) {
          this.newAccount.step = 2
          this.newAccount.accountCreationString = 'Créer mon espace'
          setTimeout(() => {
            this.focusInput('account-creation-password-input')
          },150)
        } else {
          if (this.newAccount.password.length && this.newAccount.password === this.newAccount.repeatPassword) {
            this.newAccount.creatingAccount = true
            this.newAccount.accountCreationString = "Création de votre espace..."
            const hiboutikAccount: any = this.newAccount.hiboutikAccount!
              fb.createAccount(this.mail, this.newAccount.password, parseInt(hiboutikAccount.customers_id))
              .then(userCredentials => {
                this.newAccount.creatingAccount = false
                this.newAccount.step = 3
                setTimeout(() => {
                  router.push('/verifyEmail')
                },1300)
              }).catch((error: any) => {
                console.log(error)
                this.newAccount.creatingAccount = false
              })
          }
        }

      }
    },
    mounted: function () {
      setTimeout(() => {
        this.showLoginWrapper = true
      }, 100)
    }
  });

</script>

<style>
  .header {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
  }

  .header-container {
    max-width: 1100px;
    width: 100%;
    padding: 20px;
    display: flex
  }

  #home-page .header-container h1 {
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 0;
  }

  #left-container {
    flex: 1 1 600px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  #left-container>div {
    width: 100%;
    max-width: 560px;
    margin: 50px 95px 50px 20px;
    display: flex;
  }

  #home-page h1 {
    margin: 0;
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 10px
  }

  .subtitle {
    font-size: 22px;
    margin-left: 1px;
    font-weight: 400;
    opacity: .7;
    line-height: 1.4;
    margin-bottom: 15px
  }


  #home-page h1 span {
    font-size: 13px;
    font-weight: 500;
    border: 1px solid #846ef5;
    border-radius: 4px;
    padding: 2px 7px 1px 8px;
    position: relative;
    top: -4px;
    color: #7264f3;
    margin-left: 13px;
  }

  .connect-button {
    color: white;
    position: relative;
    top: -7px;
  }

  @media screen and (max-width: 950px) {
    .connect-button {
      color: #333;
      top: 0
    }

    #left-container {
      justify-content: center
    }

    #home-page h1 span {
      display: none;
      font-size: 12px;
      margin-left: 10px
    }

    #left-container>div {
      margin: 20px
    }

    .header-container {
      padding: 20px
    }

    #home-page .header-container h1 {

      font-size: 25px;
      line-height: 25px;
    }

    #home-page h1 {
      font-size: 35px;
      line-height: 35px;
    }

    .subtitle {
      font-size: 18px
    }

    .text-center-sm {
      text-align: center
    }

    .account-creation-panel {
      max-width: calc(100vw - 30px);
    }

    .header {
      position: relative;
    }
  }


  #right-container {
    flex: 1 1 350px;
  }

  #silversmok-card {
    height: 230px;
    width: 100%;
    position: relative;
    z-index: 2;
    margin: 15px 0px 45px 0px;
    perspective: 1000px;
    transform: translateY(0);
    transition : .4s cubic-bezier(0.55, 0.06, 0.68, 0.19) all;
    will-change: transform;
  }

  .full-page-modal.leave #silversmok-card {
    transition-delay: .5s;
    transform: translateY(-100vh);
  }

  .full-page-modal.leave {
    overflow: hidden;
  }
  

  #silversmok-card:after {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 8px;
    pointer-events: none;
    background: linear-gradient(to top, rgba(0, 0, 0, .05), rgba(255, 255, 255, .2));
    border: 1px solid rgba(0, 0, 0, .07)
  }

  .flip-card-inner {
    border-bottom: 1px solid gainsboro;
    box-shadow: 0 6px 60px rgba(52, 46, 62, 0.1), 0 2px 8px rgba(186, 144, 253, 0.1);
    border-radius: 8px;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: all .66s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform-style: preserve-3d;
    will-change: transform;
  }

  /* Do an horizontal flip when you move the mouse over the flip box container */
  .full-page-modal:not(.leave) #silversmok-card.backface .flip-card-inner {
    transform: rotateY(180deg);
  }

  /* Position the front and back side */
  .flip-card-front,
  .flip-card-back {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    backface-visibility: hidden;
  }

  /* Style the front side (fallback if image is missing) */
  .flip-card-front {}

  /* Style the back side */
  .flip-card-back {
    transform: rotateY(180deg);
  }

  #silversmok-card .card-header {
    margin : 0 20px;
    border-bottom: 1px solid #f1f1f1
  }

  .horizontal-slider {
    display: flex;
    width: 200%;
    transform: translateX(0);
    transition: all .8s cubic-bezier(1, 0.01, 0.2, 1.01)
  }

  .horizontal-slider.step-2 {
    transform: translateX(-50%);
  }

  .horizontal-slider>div {
    width: 50%;
  }

  .slide-up-fade-enter-active {
    transition: all .66s cubic-bezier(0.25, 0.8, 0.25, 1)
  }

  .slide-up-fade-leave-active {
    transition: all .66s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .slide-up-fade-enter,
  .slide-up-fade-leave-to {
    transform: translateY(100%);
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
  }

  #home-page .button {
    height: 54px
  }

  .login-panel {
    padding: 25px 30px;
    width: 100%;
    max-width: 460px;
  }

  .account-creation-panel {
    padding: 0;
    overflow: hidden;
    max-width: 600px;
    margin-bottom: 0
  }



  .account-creation-state {
    font-size: 14px;
    font-weight: 500;
    color: #7090a8;
  }

  .account-creation-state.active {
    color: white;
  }

  .account-state-number {
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

  .account-creation-state.active .account-state-number {
    background: #23b7e5;
  }

</style>
