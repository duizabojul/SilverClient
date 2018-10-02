<template>
  <div id="home-page" class="page-container">
    <transition name="slide-up-fade">
      <div class="full-page-modal"  v-if="newAccount.hiboutikAccount">
        <div class="close-modal">
          <div @click="newAccount.hiboutikAccount = null" class="icon-close"></div>
        </div>
        <div class="flex-column f-center-v w-lg w-full" style="max-width : 390px; margin-top : 40px">
          <h1>Bonjour {{newAccount.hiboutikAccount.first_name}}</h1> 
          <div class="f-center flex-grow-1 w-full">
            <div class="silversmok-card">
              <div class="flex-grow-1 f-center">
                <img srcset="../assets/silver-smok-logo-2x.png 2x" src="../assets/silver-smok-logo.png" style="height : 140px">
              </div>
              <div class="card-header">
                <div class="white title text-center w-xs" style="text-transform : capitalize; font-weigth : 100" v-if="newAccount.hiboutikAccount">{{newAccount.hiboutikAccount.first_name}}
                  {{newAccount.hiboutikAccount.last_name}}</div>
              </div>
            </div>
          </div>
          <swag-input @keyup.enter="focusInput('account-creation-repeat-password-input')" style="max-width : 350px"
            @input="accountCreationEmailChanged" v-model="newAccount.password" placeholder="Choisissez votre mot de passe"
            label="Mot de passe" id="account-creation-password-input" type="password"></swag-input>
          <swag-input @keyup.enter="createAccount" style="max-width : 350px" @input="accountCreationEmailChanged"
            v-model="newAccount.repeatPassword" placeholder="Confirmez votre mot de passe" id="account-creation-repeat-password-input"
            type="password"></swag-input>

          <div class="flex w-full">
            <button :disabled="!newAccount.password.length || (newAccount.password !== newAccount.repeatPassword) || newAccount.creatingAccount"
              class="button w-full m-t-sm purple-background" @click="createAccount">
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
    <div class="f-wrap h-full">
      <div id="left-container">
        <div class="flex-column">
          <h1>Créez votre espace</h1>
          <div class="subtitle">Créez votre espace en ligne en quelque secondes, et retrouvez vos achats, vos garanties, et tous vos
            avantages Silver-Smok. </div>
          <div class="f-center-v f-wrap" style="margin : 0 -5px">
            <swag-input class="m-xs" style="flex : 1 1 320px" @keyup.enter="linkAccount" @input="accountCreationEmailChanged"
              v-model="newAccount.mail" placeholder="Votre adresse e-mail" label="E-mail" id="account-creation-mail-input"></swag-input>
            <button style="flex : 1 1 190px" class="button purple-background m-xs" @click="linkAccount">
              <div class="flex">
                <span v-if="newAccount.tryingLinking" class="spinner white active-element m-r-sm"></span>
                <span>{{newAccount.tryingLinkingString}}</span>
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

    <transition name="slide-up-fade">
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
    </transition>
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
    mail: '',
    step: 1,
    validEmail: false,
    tryingLinking: false,
    tryingLinkingString: 'Créer mon espace',
    hiboutikAccount: null,
    password: '',
    repeatPassword: '',
    creatingAccount: false,
    accountCreationString: "C'est parti !"
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
        newAccount: newAccountDefault
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
      backToLoginPage: function () {
        this.showCreateAccountPanel = false
        this.login = loginDefault
      },
      goToCreatingAccountProcess: function () {
        this.showLoginPanel = false
        this.newAccount = newAccountDefault
      },
      afterLoginLeave: function () {
        this.showCreateAccountPanel = true
        setTimeout(() => {
          this.backToLinkingStep(true)
        }, 600)
      },
      afterAccountCreationLeave: function () {
        this.showLoginPanel = true
      },
      accountCreationEmailChanged: function () {
        this.newAccount.validEmail = this.newAccount.mail.length > 0 && validateEmail(this.newAccount.mail)
      },
      backToLinkingStep: function (dontFocus: boolean = false) {
        this.newAccount.step = 1
        this.newAccount.tryingLinking = false
        this.newAccount.hiboutikAccount = null
        this.newAccount.tryingLinkingString = "Créer mon espace"
        if (!dontFocus) {
          this.focusInput('account-creation-mail-input')
        }
      },
      linkAccount: function (event: any) {
        if (this.newAccount.validEmail && !this.newAccount.tryingLinking) {
          event.target.blur()
          this.newAccount.tryingLinking = true
          this.newAccount.mail = this.newAccount.mail.toLowerCase()
          const mail = this.newAccount.mail
          const now = Date.now()
          fb.callFunction('searchCustomerForLinking', {
            mail
          }).then((response: any) => {
            if (response && response.data && response.data[0] && response.data[0].email.toLowerCase() ===
              mail) {
              this.newAccount.tryingLinking = false
              this.newAccount.hiboutikAccount = response.data[0]
              this.newAccount.step = 2
              console.log(this.newAccount.hiboutikAccount)
            } else {
              this.backToLinkingStep()
            }
          }).catch((e: any) => {
            if (e && e.code) {
              if (e.code === 'already-exists') {

              } else if (e.code === 'not-found') {

              }
            }
            this.backToLinkingStep()
          })
        }
      },
      createAccount: function () {
        if (this.newAccount.password.length && this.newAccount.password === this.newAccount.repeatPassword) {
          this.newAccount.creatingAccount = true
          this.newAccount.accountCreationString = "Création de votre espace..."
          const hiboutikAccount: any = this.newAccount.hiboutikAccount!
            fb.createAccount(this.newAccount.mail, this.newAccount.password, parseInt(hiboutikAccount.customers_id))
            .then(userCredentials => {
              this.newAccount.creatingAccount = false
              router.push('/home')
            }).catch((error: any) => {
              console.log(error)
              this.newAccount.creatingAccount = false
            })
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
  position : absolute;
  z-index: 1;
  top : 0;
  left: 0;
  right: 0;
}

.header-container {
  max-width: 1100px;
  width : 100%;
  padding: 20px;
  display : flex
}

#home-page .header-container h1 {
  font-size : 30px;
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
    margin: 50px;
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
  color : white;
  position : relative;
  top : -7px;
}

  @media screen and (max-width: 950px) {
    .connect-button {
      color :#333;
      top : 0
    }
    #left-container {
      justify-content: center
    }
    #home-page h1 span {
          display: none;
    font-size: 12px;
    margin-left : 10px
  }

    #left-container>div {
      margin: 30px 20px 0
    }
    .header-container {
      padding: 15px
    }
  #home-page .header-container h1 {

    font-size : 25px;
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
  }


  #right-container {
    flex: 1 1 350px;
  }

  .silversmok-card {
    height: 210px;
    width: 100%;
    background: white;
    border-radius: 8px;
    margin: 5px 0px 15px 0px;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, .15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .silversmok-card:after {
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

  .silversmok-card .card-header {
    width: 100%;
    background: #cd0067
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
    overflow-y: auto
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