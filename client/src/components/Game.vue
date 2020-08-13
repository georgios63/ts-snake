<template>
  <div class="hello"><h1>Game component rendered.</h1></div>
</template>

<script lang="ts">
import Vue from 'vue';
import io from 'socket.io-client';
import store from '../store';

const socket = io('http://localhost:3000', {
  autoConnect: false,
  query: {
    // eslint-disable-next-line dot-notation
    token: store.state['token'],
  },
});

console.log(store.state);

export default Vue.extend({
  name: 'Game',
  props: {
    msg: String,
  },

  created() {
    socket.connect();
    socket.on('connect', () => {
      console.log(socket);
      socket.emit('custom-message', 'Hello George!');
    });
    socket.on('message-response', (message: string) => {
      console.log('Server sent me:', message);
    });
  },
});
</script>

<style scoped lang="scss"></style>
