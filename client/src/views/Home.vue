<template>
  <div class="home">
    <Game />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from '@/components/Game.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Game,
  },
});
</script>
