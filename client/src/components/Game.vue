<template>
  <div>
    <canvas style="background-color: beige"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';
import { mapState } from 'vuex';
import userInput, { CustomKeyEvent } from '../util/input-handler';

interface Rect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GameData {
  player: Array<Rect2D>;
  fruit: Rect2D;
}

const socket = io('http://localhost:3000', {
  autoConnect: false,
  reconnectionDelay: 250,
});

@Component({
  computed: { ...mapState(['token']) },
})
export default class Game extends Vue {
  private token!: string;
  private ctx!: CanvasRenderingContext2D;
  private data: GameData = {
    player: [],
    fruit: {
      x: 0, y: 0, width: 0, height: 0,
    },
  };

  private makeSocketConnection() {
    socket.io.opts.query = { token: this.token };
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to server...');
      socket.on('update', (data) => {
        this.data = data;
      });
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
    } else if (e.keyName === 'K_ENTER' && e.type === 'keydown') {
      socket.emit('start', 'go!');
    }
  }

  private sendDirection(direction: { x: number; y: number }) {
    socket.emit('action', direction);
  }

  private draw() {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, 1024, 768);
      const { player, fruit } = this.data;
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);

      player.forEach((rect) => {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      });

      this.draw();
    });
  }

  private initializeCanvas() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.canvas.width = 1024;
    this.ctx.canvas.height = 768;
    this.draw();
  }

  mounted() {
    this.initializeCanvas();
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
