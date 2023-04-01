<template>
  <v-container class="black--text my-12">
    <v-row class="text-center">
      <v-col>
        <!-- Showcase Title/Text-->
        <h1 class="display-2 font-weight-bold mb-10">Vue Todo</h1>
        <!-- Todo List -->
        <TodoList :todoList="todoList" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import TodoList from '@/components/TodoList.vue';
export default Vue.extend({
  name: 'HomeView',

  components: { TodoList },
  data() {
    return {
      todoList: [],
    };
  },
});
</script>
