<template>
  <div id="verify-email" class="page-container flex-column f-center-v">
    <div class="header-container flex-shrink-0 ">
      <div class="flex-grow-1"></div>
      <button class="outlined-button" @click="unlog">Déconnexion</button>
    </div>
    <div class="flex-grow-1 flex-shrink-0  flex-column f-center w-lg" style="max-width : 460px">
      <div class="ghost flex-shrink-0 ">
        <div class="body">
          <div class="face">
            <div class="eye left"></div>
            <div class="eye right"></div>
            <div class="smile"></div>
            <div class="rosy left"></div>
            <div class="rosy right"></div>
          </div>
          <div class="arm left"></div>
          <div class="arm right"></div>
          <div class="bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="shadow"></div>
      </div>
      <div class="title flex-shrink-0 ">Afin de vérifier que vous êtes le propriétaire de ce compte, un e-mail de
        confirmation a été envoyé à <span class="bold">{{currentUser.email}}</span></div>
      <button class="button flex-shrink-0  purple-background lg w-full" @click="sendEmail"> <span v-if="sendingMail"
          class="spinner white active-element m-r-sm"></span>{{buttonString}}</button>
      <div class="subtitle flex-shrink-0  w"><span class="icon-info m-r-xs top-1px"></span>N'oubliez pas de vérifier
        dans les spams si vous ne trouvez pas l'e-mail dans votre boîte de réception.</div>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import fb from '@/services/firebase.ts';
import hiboutik from '@/services/hiboutik.ts';
import router from '@/router';

export default Vue.extend({
  data() {
    return {
      currentUser: fb.getCurrentUser(),
      buttonString: "Renvoyer l'e-mail",
      sendingMail: false,
    };
  },
  methods: {
    unlog() {
      fb.unlogUser().then(() => {
        router.push('login');
      });
    },
    sendEmail() {
      if (!this.sendingMail) {
        this.sendingMail = true;
        this.buttonString = 'Envoi en cours';
        fb.sendEmailVerification().then(() => {
          this.buttonString = 'E-mail envoyé !';
          setTimeout(() => {
            this.buttonString = "Renvoyer l'e-mail";
          }, 3000);
        }).catch((error) => {
          this.buttonString = 'Oops. Une erreur a eu lieu';
          setTimeout(() => {
            this.buttonString = "Renvoyer l'e-mail";
          }, 2000);
        }).finally(() => {
          this.sendingMail = false;
        });
      }
    },
  },
  created() {
    console.log(this.currentUser);
  },
});

</script>

<style>
  #verify-email .title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 25px;
    text-align: center
  }

  #verify-email .subtitle {
    font-size: 14px;
    text-align: center
  }

  body .ghost {
    position: relative;
    width: 160px;
    height: 200px;
    margin: 20px 0 70px;
    perspective: 1000px
  }

  body .ghost .body {
    position: relative;
    width: 160px;
    height: 200px;
    border-top-right-radius: 80px;
    border-top-left-radius: 80px;
    background: linear-gradient(to top, #e8e8e8, #fdfdfd);
    -webkit-animation: float 4s ease infinite;
    animation: float 4s ease infinite;
  }

  body .ghost .body .face {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 67px;
    left: 37px;
    width: 72px;
    height: 41px;
  }

  body .ghost .body .face .eye {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #272B24;
  }

  body .ghost .body .face .eye.left {
    margin-right: 32px;
  }

  body .ghost .body .face .smile {
    margin-top: 6px;
    width: 32px;
    height: 16px;
    margin-left: 20px;
    border-bottom-left-radius: 16px 12px;
    border-bottom-right-radius: 16px 12px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #272B24;
  }

  body .ghost .body .face .rosy {
    position: absolute;
    top: 28px;
    width: 22px;
    height: 8px;
    border-radius: 100%;
    background-color: #FFAA9E;
  }

  body .ghost .body .face .rosy.left {
    left: -6px;
    -webkit-transform: rotate(-8deg);
    transform: rotate(-8deg);
  }

  body .ghost .body .face .rosy.right {
    right: -6px;
    -webkit-transform: rotate(8deg);
    transform: rotate(8deg);
  }

  body .ghost .body .arm {
    position: absolute;
    top: 136px;
    width: 60px;
    height: 40px;
    background-color: #efefef;
  }

  body .ghost .body .arm.left {
    left: -4px;
    border-radius: 60% 100%;
    -webkit-animation: arms-left 4s ease infinite;
    animation: arms-left 4s ease infinite;
  }

  body .ghost .body .arm.right {
    right: -65px;
    border-radius: 100% 60%;
    -webkit-animation: arms-right 4s ease infinite;
    animation: arms-right 4s ease infinite;
  }

  body .ghost .body .bottom {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0px;
    right: -1px;
  }

  body .ghost .body .bottom div {
    flex-grow: 1;
    position: relative;
    top: -14px;
    height: 28px;
    border-radius: 100%;
    background-color: #e8e8e8;
  }

  body .ghost .body .bottom div:nth-child(2n) {
    top: -10px;
    margin: 0 -2px;
    border-top: 10px solid #e8e8e8;
    background: transparent;
  }

  body .ghost .shadow {
    position: absolute;
    bottom: -140px;
    right: -20px;
    width: 200px;
    height: 200px;
    transform: rotateX(92deg);
    border-radius: 100%;
    background: radial-gradient(#d4d4d4, #ffffff 70%);
    -webkit-animation: shadow 4s ease infinite;
    animation: shadow 4s ease infinite;
  }

  @-webkit-keyframes float {

    0%,
    100% {
      top: 0px;
    }

    40% {
      top: -40px;
    }
  }

  @keyframes float {

    0%,
    100% {
      top: 0px;
    }

    40% {
      top: -40px;
    }
  }

  @-webkit-keyframes arms-left {

    0%,
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(50deg);
      transform: translate(-50%, -50%) rotate(50deg);
    }

    40% {
      -webkit-transform: translate(-50%, -50%) rotate(40deg);
      transform: translate(-50%, -50%) rotate(40deg);
    }
  }

  @keyframes arms-left {

    0%,
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(50deg);
      transform: translate(-50%, -50%) rotate(50deg);
    }

    40% {
      -webkit-transform: translate(-50%, -50%) rotate(40deg);
      transform: translate(-50%, -50%) rotate(40deg);
    }
  }

  @-webkit-keyframes arms-right {

    0%,
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(-50deg);
      transform: translate(-50%, -50%) rotate(-50deg);
    }

    40% {
      -webkit-transform: translate(-50%, -50%) rotate(-40deg);
      transform: translate(-50%, -50%) rotate(-40deg);
    }
  }

  @keyframes arms-right {

    0%,
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(-50deg);
      transform: translate(-50%, -50%) rotate(-50deg);
    }

    40% {
      -webkit-transform: translate(-50%, -50%) rotate(-40deg);
      transform: translate(-50%, -50%) rotate(-40deg);
    }
  }

  @-webkit-keyframes shadow {

    0%,
    100% {
      -webkit-transform: rotateX(92deg) scale(1);
      transform: rotateX(92deg) scale(1);
      opacity: 1
    }

    40% {
      -webkit-transform: rotateX(92deg) scale(0.5);
      transform: rotateX(92deg) scale(0.5);
      opacity: .5
    }
  }

  @keyframes shadow {

    0%,
    100% {
      -webkit-transform: rotateX(92deg) scale(1);
      transform: rotateX(92deg) scale(1);
      opacity: 1
    }

    40% {
      -webkit-transform: rotateX(92deg) scale(0.5);
      transform: rotateX(92deg) scale(0.5);
      opacity: .5
    }
  }

</style>
