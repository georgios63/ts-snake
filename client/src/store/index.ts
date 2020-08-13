import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
  },
  plugins: [vuexLocal.plugin],
});
