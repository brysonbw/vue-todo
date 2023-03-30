<template>
  <section>
    <!-- Todo Form -->
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="todo"
        label="Enter todo"
        placeholder="e.g Go running"
        outlined
        class="mb-n3"
        appennd-icon="plus"
        clearable
      ></v-text-field>
      <v-btn
        block
        :disabled="!todo"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Submit
      </v-btn>
    </v-form>
    <!-- Todo List -->
    <div
      v-show="todos.length"
      class="text-left my-3"
      v-for="todo in todos"
      :key="todo.id"
    >
      <v-list-item @click="toggleDone(todo.id)">
        <template v-slot:default>
          <v-list-item-action>
            <v-checkbox :input-value="todo.done"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-subtitle class="font-weight-bold">{{
              todo.body
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-icon @click.stop="deleteTodo(todo.id)">mdi-delete</v-icon>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </div>
    <!-- No Todos Placeholder -->
    <div v-show="!todos.length">
      <v-container class="grey lighten-5 mx-auto">
        <h2 class="pa-2 dispklay-2 orange--text">
          There are no todos to display.
        </h2>
      </v-container>
    </div>
    <!-- Snackbar -->
    <div>
      <v-snackbar
        :color="snackbar.color"
        timeout="5000"
        top
        v-model="snackbar.show"
        :outlined="snackbar.color === 'success'"
      >
        <strong>{{ snackbar.message }}</strong>
      </v-snackbar>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  data() {
    return {
      todo: null,
      todoList: [],
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
    };
  },
  computed: {
    // return todos sorted by createdAt (date) -  desc order
    todos() {
      return this.todoList
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    onSubmit() {
      // trim todo input
      const todoInput = this.todo.trim();
      // check if todo input is empty
      if (!todoInput.length) {
        return (this.snackbar = {
          show: true,
          message: 'Please enter a valid todo.',
          color: 'red',
        });
      }
      // check if todo input is > 50 characters
      if (todoInput.length > 50) {
        return (this.snackbar = {
          show: true,
          message: 'Todo must be less than or equal to 50 characters.',
          color: 'red',
        });
      }
      // add new todo obj to todoList array
      const newTodo = {
        id: uuidv4(),
        body: todoInput,
        done: false,
        createdAt: Date.now(),
      };
      this.todo = '';
      this.todoList.push(newTodo);
      this.snackbar = {
        show: true,
        message: 'Todo added successfully!',
        color: 'success',
      };
    },
    // toggle todo done checkbox
    toggleDone(id) {
      const todo = this.todoList.filter((todo) => todo.id === id);
      todo.done != todo.done;
    },
    // delete todo
    deleteTodo(id) {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
      this.snackbar = {
        show: true,
        message: 'Todo deleted successfully!',
        color: 'success',
      };
    },
  },
};
</script>
