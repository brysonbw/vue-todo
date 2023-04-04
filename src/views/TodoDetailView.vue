<template>
  <v-container class="black--text my-12">
    <v-row class="text-center">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-10">Todo</h1>
        <h1 class="display-1 font-weight-bold mb-5">{{ todo.body }}</h1>
        <p class="mb-10">{{ convertDate(todo.createdAt) }}</p>
        <v-btn @click="$router.push('/')">Go back</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
export default {
  props: ['id'],
  data() {
    return {
      todo: null,
    };
  },
  created() {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const todo = todoList.find((item) => item.id === this.$route.params.id);
    return (this.todo = todo);
  },
  methods: {
    convertDate(date) {
      return moment(date).format('LL');
    },
  },
};
</script>
