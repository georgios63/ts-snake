<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';
import { mapState } from 'vuex';

const socket = io('http://localhost:3000', { autoConnect: false });

@Component({
  computed: { ...mapState(['token']) },
})
export default class Game extends Vue {
  private token!: string;

  created() {
    socket.io.opts.query = { token: this.token };
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to server...');
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
