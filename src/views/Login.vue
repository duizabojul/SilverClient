<template>
  <div @click="hideTooltips" id="home-page" class="page-container">
    <transition name="slide-up-fade">
      <div class="full-page-modal" :class="newAccount.step === 2 ? 'leave' : ''" v-if="newAccount.hiboutikAccount">
        <div class="close-modal leave-element">
          <div @click="newAccount.hiboutikAccount = null" class="icon-close"></div>
        </div>
        <div class="flex-column f-center-v w-lg w-full" style="max-width : 430px; margin : 40px 0">
          <h1 style="font-size : 30px" class="leave-element text-center">Une dernière chose...</h1>
          <div class="f-center flex-grow-1 w-full">
            <div id="silversmok-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-header">
                    {{newAccount.hiboutikAccount.first_name}} {{newAccount.hiboutikAccount.last_name}}
                  </div>
                  <div class="f-center flex-grow-1 w-lg flex-column">
                    <div class="label"><span class="icon-info m-r-xs top-1px"></span>Veuillez créer un mot de passe
                      d'au moins 6 caractères</div>
                    <el-tooltip v-bind:manual="true" v-bind:content="passwordTooltip.content" v-bind:value="passwordTooltip.show"
                      placement="top">
                      <swag-input @input="closePopover(passwordTooltip)" @keyup.enter="focusInput('account-creation-repeat-password-input')"
                        style="max-width : 350px" class="no-border" v-model="newAccount.password" placeholder="Créez votre mot de passe"
                        id="account-creation-password-input" type="password"></swag-input>
                    </el-tooltip>
                    <el-tooltip v-bind:manual="true" v-bind:content="passwordRepeatTooltip.content" v-bind:value="passwordRepeatTooltip.show"
                      placement="top">
                      <swag-input @input="closePopover(passwordRepeatTooltip)" @keyup.enter="createAccount" class="no-border"
                        style="max-width : 350px" v-model="newAccount.repeatPassword" placeholder="Confirmez votre mot de passe"
                        id="account-creation-repeat-password-input" type="password"></swag-input>
                    </el-tooltip>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-header">
                    {{newAccount.hiboutikAccount.first_name}} {{newAccount.hiboutikAccount.last_name}}
                  </div>
                  <div class="flex-grow-1 f-center">
                    <img srcset="../assets/silver-smok-logo-2x.png 2x" src="../assets/silver-smok-logo.png" style="height : 140px">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <button class="button w-full purple-background leave-element" @click.stop="createAccount">
              <div class="flex">
                <span v-if="newAccount.creatingAccount" class="spinner white active-element m-r-sm"></span>
                <span>{{newAccount.accountCreationString}}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-up-fade">
      <div class="full-page-modal" :class="newAccount.step === 2 ? 'leave' : ''" v-show="login.showLogin">
        <div class="close-modal leave-element">
          <div @click="closeLoginPage" class="icon-close"></div>
        </div>
        <div class="flex-column f-center-v w-lg w-full" style="max-width : 430px; margin : 40px 0">
          <h1 style="font-size : 25px" class="leave-element text-center">{{login.loginText}}</h1>
          <div class="flex-column w-full">
            <el-tooltip v-bind:manual="true" v-bind:content="emailLoginTooltip.content" v-bind:value="emailLoginTooltip.show"
              placement="top">
              <swag-input @input="closePopover(emailLoginTooltip)" ref="loginMailInput" v-bind:isEmail="true"
                @keyup.enter="enterKeyOnLoginMailInput" v-model="login.mail" placeholder="Entrez votre e-mail..." label="E-mail"
                id="login-mail-input"></swag-input>
            </el-tooltip>
            <el-tooltip v-bind:manual="true" v-bind:content="passwordLoginTooltip.content" v-bind:value="passwordLoginTooltip.show"
              placement="top">
              <swag-input @input="closePopover(passwordLoginTooltip)" v-if="!login.passwordReset" @keyup.enter="logUser"
                v-model="login.password" type="password" placeholder="Entrez votre mot de passe..." label="Mot de passe"
                id="login-password-input"></swag-input>
            </el-tooltip>
          </div>
          <div class="flex w-full">
            <button @click.stop="login.passwordReset ? resetPassword() : logUser()" class="button purple-background w-full m-t-sm m-b-sm">
              <span v-if="!login.tryingLogin">{{login.loginButtonString}}</span>
              <div v-if="login.tryingLogin" class="spinner absolute-center white active-element">
              </div>
            </button>
          </div>
          <div class="forgotten-password" @click="triggerPasswordReset">{{login.resetPasswordString}}</div>
        </div>
      </div>
    </transition>
    <div class="header f-center-h">
      <div class="header-container f-center-v">
        <h1>Silver-Smok<span>Fidélité</span></h1>
        <div class="flex-grow-1"></div>
        <div class="connect-button" @click="showLoginPage">Connexion</div>
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
            <el-tooltip v-bind:enterable="false" v-bind:manual="true" v-bind:content="linkAccountTooltip.content" v-bind:value="linkAccountTooltip.show"
              placement="top">
              <swag-input @input="closePopover(linkAccountTooltip)" v-bind:isEmail="true" class="m-xs" style="flex : 1 1 320px"
                @keyup.enter="linkAccount" v-model="mail" placeholder="Votre adresse e-mail" label="E-mail" id="account-creation-mail-input"></swag-input>
            </el-tooltip>
            <button style="flex : 1 1 200px" class="button purple-background m-xs" @click.stop="linkAccount">
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
  </div>
</template>

<script lang="ts">
  import fb from '@/services/firebase'
  import Vue from 'vue';
  import SwagInput from '@/components/SwagInput.vue';
  import hb from '@/services/hiboutik'
  import router from '@/router';


  const validateEmail = (email: string) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const loginDefault = {
    showLogin: false,
    uid: < any > null,
    hiboutikId: < any > null,
    mail: '',
    passwordReset: false,
    password: '',
    error: '',
    loginText: 'Connexion',
    loginButtonString: 'Me connecter à mon espace',
    resetPasswordString: "J'ai oublié mon mot de passe",
    tryingLogin: false
  }

  const newAccountDefault = {
    step: 1,
    hiboutikAccount: null,
    password: '',
    repeatPassword: '',
    creatingAccount: false,
    accountCreationString: 'Créer mon espace'
  }

  const tooltips = [0, 0, 0, 0, 0].map(el => Object.assign({}, {
    content: '',
    show: false
  }))

  export default Vue.extend({
    components: {
      SwagInput
    },
    data() {
      return {
        showLoginWrapper: false,
        showLoginPanel: true,
        showCreateAccountPanel: false,
        login: Object.assign({}, loginDefault),
        newAccount: Object.assign({}, newAccountDefault),
        mail: '',
        tryingLinking: false,
        linkAccountTooltip: tooltips[0],
        passwordTooltip: tooltips[1],
        passwordRepeatTooltip: tooltips[2],
        emailLoginTooltip: tooltips[3],
        passwordLoginTooltip: tooltips[4]
      };
    },
    methods: {
      hideTooltips: function () {
        tooltips.forEach(this.closePopover)
      },
      enterKeyOnLoginMailInput: function () {
        if (this.login.passwordReset) {
          this.resetPassword()
        } else {
          this.focusInput('login-password-input')
        }
      },
      triggerPasswordReset: function () {
        this.login.passwordReset = !this.login.passwordReset
        if (this.login.passwordReset) {
          this.login.loginText = "Réinitialiser mon mot de passe"
          this.login.loginButtonString = 'Envoyer un e-mail de réinitialisation'
          this.login.resetPasswordString = "Retourner à la connexion"
        } else {
          this.login.loginText = 'Connexion'
          this.login.loginButtonString = 'Me connecter à mon espace'
          this.login.resetPasswordString = "J'ai oublié mon mot de passe"
        }
      },
      resetPassword: function () {
        if (this.login.mail.length && validateEmail(this.login.mail)) {
          this.login.tryingLogin = true
          fb.resetPassword(this.login.mail).then(() => {
            this.login.loginButtonString = 'Le mail de réinitialisation a été envoyé !'
          }).catch(e => {
            if (e.code === 'auth/user-not-found') {
              this.showPopover(this.emailLoginTooltip, `Cette adresse e-mail n'est associée à aucun compte.`)
            }
          }).finally(() => this.login.tryingLogin = false)
        } else {
          this.showPopover(this.emailLoginTooltip, `Oops. Cette adresse e-mail n'est pas valide`)
        }
      },
      closeLoginPage: function () {
        this.login.showLogin = false
        this.resetLoginPage()
      },
      resetLoginPage: function () {
        this.login.loginText = 'Connexion'
        this.login.uid = null
        this.login.hiboutikId = null
        this.login.passwordReset = false
        this.login.error = ''
        this.login.loginText = 'Connexion'
        this.login.loginButtonString = 'Me connecter à mon espace'
        this.login.resetPasswordString = "J'ai oublié mon mot de passe"
      },
      showLoginPage: function () {
        this.login.showLogin = true
        setTimeout(() => {
          this.focusInput('login-mail-input')
        }, 300)
      },
      logUser: function () {
        if (!validateEmail(this.login.mail)) {
          this.showPopover(this.emailLoginTooltip, `Oops. Cette adresse e-mail n'est pas valide`)
          return
        }
        if (!this.login.password.length) {
          this.showPopover(this.passwordLoginTooltip, `Veuillez entrer un mot de passe`)
          return
        }
        this.login.tryingLogin = true
        fb.logUser(this.login.mail, this.login.password).then(() => {
          if (this.login.uid) {
            fb.createSpace(this.login.uid, this.login.hiboutikId).then(() => {
              this.login.tryingLogin = false
              router.push('/home')
            }).catch(() => {
              this.login.tryingLogin = false
            })
          } else {
            this.login.tryingLogin = false
            router.push('/home')
          }
        }).catch(error => {
          if(error.code === 'auth/user-not-found'){
             this.showPopover(this.emailLoginTooltip, `Cette adresse e-mail n'est associée à aucun compte.`)
          } else if(error.code === 'auth/wrong-password'){
             this.showPopover(this.passwordLoginTooltip, `Mot de passe incorrect`)
          }
          this.login.tryingLogin = false
        })
      },
      focusInput: function (elementId: string) {
        const input = document.getElementById(elementId)
        input && input.focus()
      },
      closePopover: function (popover: any) {
        popover.show = false
      },
      showPopover: function (popover: any, content: string) {
        popover.content = content
        popover.show = true
      },
      linkAccount: function (event: any) {
        if (this.tryingLinking) {
          return
        }
        if (!validateEmail(this.mail)) {
          this.showPopover(this.linkAccountTooltip, `Oops. Cette adresse e-mail n'est pas valide.`)
          return
        }
        if (event && event.target) {
          event.target.blur()
        }
        this.tryingLinking = true
        this.mail = this.mail.toLowerCase()
        const mail = this.mail
        fb.callFunction('searchCustomerForLinking', {
          mail
        }).then((response: any) => {
          const customerData = response.data.customerData
          if (!response.data.uid) {
            if (customerData) {
              this.newAccount = Object.assign({}, newAccountDefault)
              this.newAccount.hiboutikAccount = response.data.customerData
              setTimeout(() => {
                this.focusInput('account-creation-password-input')
              }, 300)
            } else if (!customerData) {

            }
          } else {
            if (customerData) {
              this.login.uid = response.data.uid
              this.login.hiboutikId = parseInt(customerData.customers_id)
              this.login.mail = mail
              this.login.loginText = "Connectez vous pour créer votre espace"
              this.login.showLogin = true
              setTimeout(() => {
                this.focusInput('login-password-input')
              }, 300)
            } else if (!customerData) {
              this.login.mail = mail
              this.login.showLogin = true
              setTimeout(() => {
                this.focusInput('login-password-input')
              }, 300)
            }
          }
        }).catch((e: any) => {
          console.log(e)
          if (e && e.code) {
            if (e.code === 'not-found') {
              this.showPopover(this.linkAccountTooltip,
                `Oops. Cette adresse e-mail n'est associée à aucun compte Silver-Smok.`)
            }
          } else {
            this.showPopover(this.linkAccountTooltip,
              `Erreur. Réessayez ou contactez le service client Silver-Smok`)
          }
        }).finally(() => {
          this.tryingLinking = false
        })
      },
      createAccount: function () {
        if (this.newAccount.password.length < 6) {
          this.showPopover(this.passwordTooltip, `Veuillez entrer un mot de passe d'au moins 6 caractères.`)
          return
        }
        if (this.newAccount.password !== this.newAccount.repeatPassword) {
          this.showPopover(this.passwordRepeatTooltip, `Les mots de passe sont différents.`)
          return
        }
        this.newAccount.creatingAccount = true
        this.newAccount.accountCreationString = "Création de votre espace..."
        const hiboutikAccount: any = this.newAccount.hiboutikAccount!
          fb.createAccount(this.mail, this.newAccount.password, parseInt(hiboutikAccount.customers_id))
          .then(userCredentials => {
            this.newAccount.step = 2
            import('@/views/VerifyEmail.vue')
            setTimeout(() => {
              router.push('/verifyEmail')
            }, 1800)
          }).catch((error: any) => {
            this.showPopover(this.linkAccountTooltip,
              `Erreur. Réessayez ou contactez le service client Silver-Smok`)
            console.log(error)
          }).finally(() => this.newAccount.creatingAccount = false)
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
  .forgotten-password {
    font-size: 14px;
    opacity: .5;
    margin: 0 10px;
    align-self: flex-end;
    cursor: pointer;
  }

  .forgotten-password:hover {
    opacity: 1;
    text-decoration: underline
  }

  .header {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
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
    top: -4px;
    border: 1px solid rgba(255, 255, 255, .45);
    border-radius: 4px;
    padding: 5px 15px;
    background: transparent;
    transition: .15s ease all;
    cursor: pointer
  }

  .connect-button:hover {
    background: rgba(0, 0, 0, 0.1);
    border-color: transparent;
  }

  .connect-button:active {
    background: rgba(0, 0, 0, .2);
    border-color: transparent;
  }

  @media screen and (max-width: 950px) {
    .connect-button {
      color: #7765f3;
      top: -1px;
      border-color: #7765f3;
      padding: 1px 10px;
      font-size: 15px;
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
    margin: 15px 0px;
    perspective: 1000px;
    transform: translateY(0);
    transition: .4s cubic-bezier(0.55, 0.06, 0.68, 0.19) all;
    will-change: transform;
  }

  .full-page-modal.leave #silversmok-card {
    transition-delay: .9s;
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
    transition: all .66s cubic-bezier(0.25, 0.8, 0.25, 1.1);
    transform-style: preserve-3d;
    will-change: transform;
  }

  /* Do an horizontal flip when you move the mouse over the flip box container */
  .full-page-modal.leave #silversmok-card .flip-card-inner {
    transform: rotateY(180deg);
  }

  /* Position the front and back side */
  .flip-card-front,
  .flip-card-back {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 8px;
    backface-visibility: hidden;
  }

  /* Style the front side (fallback if image is missing) */
  .flip-card-front {}

  /* Style the back side */
  .flip-card-back {
    transform: rotateY(180deg);
  }

  #silversmok-card .card-header {
    margin: 0 20px;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 0 3px;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 700;
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