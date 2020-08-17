<template>
  <div>
    <canvas style="width: 1024px; height: 764px; background-color: black"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';
import { mapState } from 'vuex';
import userInput, { CustomKeyEvent } from '../util/input-handler';

const socket = io('http://localhost:3000', {
  autoConnect: false,
  reconnectionDelay: 250,
});

@Component({
  computed: { ...mapState(['token']) },
})
export default class Game extends Vue {
  private token!: string;
  private ctx: CanvasRenderingContext2D | null;

  private makeSocketConnection() {
    socket.io.opts.query = { token: this.token };
    // socket.connect();
    socket.on('connect', () => {
      console.log('Connected to server...');
    });
  }

  private onUserInput(e: CustomKeyEvent) {
    if (e.type === 'keydown' && e.keyName !== 'K_ENTER') {
      let direction = { x: 0, y: 0 };

      if (e.keyName === 'K_ARROWUP') {
        direction = { x: 0, y: -1 };
      }
      if (e.keyName === 'K_ARROWLEFT') {
        direction = { x: -1, y: 0 };
      }
      if (e.keyName === 'K_ARROWRIGHT') {
        direction = { x: 1, y: 0 };
      }
      if (e.keyName === 'K_ARROWDOWN') {
        direction = { x: 0, y: 1 };
      }
      this.sendDirection(direction);
    } else if (e.keyName === 'K_ENTER') {
      socket.emit('start', 'go!');
    }
  }

  private sendDirection(direction: { x: number; y: number }) {
    socket.emit('action', direction);
    console.log('sent:', direction);
  }

  private draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(10, 10, 1, 1);
  }

  mounted() {
    const canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    console.log(this.ctx);
    this.draw();
  }

  created() {
    this.makeSocketConnection();
    userInput.add(this.onUserInput);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
