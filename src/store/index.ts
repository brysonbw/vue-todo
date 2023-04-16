import Vue from 'vue';
import Vuex from 'vuex';
import * as todo from './modules/todo';
import * as snackbar from './modules/snackbar';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
    snackbar,
  },
});
