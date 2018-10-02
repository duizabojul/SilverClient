<template>
  <div >
    Merci de vérifier votre email {{currentUser.email}}
    <button @click="unlog">Unlog</button>
    <button @click="sendEmail">Renvoyer e-mail</button>
    <div>
  </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import fb from '@/services/firebase.ts'
import hiboutik from '@/services/hiboutik.ts'
import router from '@/router';

  export default Vue.extend({
    data() {
      return {
        currentUser : fb.getCurrentUser()
      }
    },
    methods : {
      unlog : function(){
        fb.unlogUser().then(() => {
          router.push('login')
        })
      },
      sendEmail : function(){
        fb.sendEmailVerification()
      }
    },
    created : function(){
      console.log(this.currentUser)

    }
  })
</script>
