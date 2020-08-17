<template>
  <div class="home">
    <Game />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from '@/components/Game.vue'; // @ is an alias to /src

@Component({
  components: {
    Game,
  },
})
export default class Home extends Vue {}
</script>
