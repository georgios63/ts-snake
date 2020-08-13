<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { v4 as uuid } from 'uuid';
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapMutations(['setToken']),
  },
  created() {
    console.log('token:', this.token);
    if (!this.token) {
      this.setToken(uuid());
    }
    console.log('token:', this.token);
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
