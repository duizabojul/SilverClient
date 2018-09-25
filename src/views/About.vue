<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="danger">Danger</a-button>
  </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src


@Component({
  components: {
  HelloWorld,
  },
  })
export default class Home extends Vue {}
</script>
