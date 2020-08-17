<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations, Mutation } from 'vuex';
import { v4 as uuid } from 'uuid';

@Component({
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapMutations(['setToken']),
  },
})
export default class App extends Vue {
  private token!: string;
  private setToken!: (token: string) => void;

  created() {
    if (!this.token) this.setToken(uuid());
    console.log(this.token);
  }
}
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
