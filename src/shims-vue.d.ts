import { Todo } from './types/todo';
import { Snackbar } from './types/snackbar';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// typing vuex and $store property
// vuex docs: https://vuex.vuejs.org/guide/typescript-support.html

declare module '@vue/runtime-core' {
  // declaring store states
  export interface State {
    snackbar: Snackbar;
    todo: Todo;
    todos: Todo[];
  }
}
