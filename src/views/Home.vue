<template>
  <div class="about">
    <h1 v-if="userDetails">Bonjour {{userDetails.first_name}} {{userDetails.last_name}}. Vous avez {{nbPoints}}</h1>
    <button @click="unlog">Unlog</button>
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
        userData : <any>null,
        userDetails : <any>null
      }
    },
    methods : {
      unlog : function(){
        fb.unlogUser().then(() => {
          router.push('login')
        })
      }
    },
    computed : {
      nbPoints : function() {
        return `${this.userDetails.loyalty_points} point${this.userDetails.loyalty_points > 1 ? 's' : ''}`
      }
    },
    created : function(){
      fb.getUserData().then((object:any) => {
        this.userData = object
        return hiboutik.customer_details(this.userData.val.id).then((data) => {
          this.userDetails = data
        }).catch(console.log)
      })
    }
  })
</script>
