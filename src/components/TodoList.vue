<template>
  <section>
    <!-- Todo Add Form -->
    <v-form v-if="!isTodoEditing" @submit.prevent="addTodo">
      <v-text-field
        v-model="todo"
        label="Enter todo"
        placeholder="e.g Go running"
        outlined
        class="mb-n5"
        appennd-icon="plus"
        clearable
      ></v-text-field>
      <v-btn
        block
        class="mb-3"
        :disabled="!todo"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Submit
      </v-btn>
    </v-form>
    <!-- Todo Edit/Update Form -->
    <v-form v-else @submit.prevent="updateTodo">
      <v-text-field
        v-model="todo"
        label="Edit todo"
        placeholder="e.g Go running"
        outlined
        class="mb-n5"
        appennd-icon="plus"
        clearable
      ></v-text-field>
      <v-btn
        block
        class="mb-3"
        :disabled="!todo"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Edit
      </v-btn>
      <!-- Cancel Edit/Update Button -->
      <v-btn
        block
        @click="cancelEdit"
        class="mb-3 white--text"
        color="orange"
        size="large"
        type="button"
        variant="elevated"
      >
        Cancel
      </v-btn>
    </v-form>
    <!-- Todo Item -->
    <TodoItem
      @editTodo="editTodo(todo.id)"
      @deleteTodo="deleteTodo(todo.id)"
      @toggleDone="toggleDone(todo.id)"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />
    <!-- No Todo Items Placeholder -->
    <v-container v-show="!todos.length" class="grey lighten-5 mx-auto">
      <h2 class="pa-2 dispklay-2 orange--text">
        There are no todos to display.
      </h2>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar
      :color="snackbar.color"
      timeout="5000"
      top
      v-model="snackbar.show"
      :outlined="snackbar.color === 'success'"
    >
      <strong>{{ snackbar.message }}</strong>
    </v-snackbar>
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import TodoItem from '@/components/TodoItem.vue';
export default {
  props: ['todoList'],
  components: { TodoItem },
  data() {
    return {
      todo: null,
      isTodoEditing: false,
      todoEditIndex: null,
      todos: this.todoList, // assign passed prop todoList to todos locally
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
    };
  },
  created() {
    return this.fetchTodos();
  },
  // watch changes for todos
  watch: {
    todos: {
      // update localStorage 'todoList' with new todos
      handler(newTodos) {
        localStorage.setItem('todoList', JSON.stringify(newTodos));
      },
      deep: true, // set to true to trigger when the watched property has been assigned a new value (todos)
    },
  },
  methods: {
    fetchTodos() {
      const getTodos = JSON.parse(localStorage.getItem('todoList'));
      if (getTodos) {
        this.todos = getTodos;
      } else {
        return [];
      }
    },
    addTodo() {
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
      // add new todo object to todos
      const newTodo = {
        id: uuidv4().slice(0, 8), // uuid lib for generating random id
        body: todoInput,
        done: false,
        createdAt: Date.now(),
      };
      this.todo = '';
      this.todos.push(newTodo);
      this.snackbar = {
        show: true,
        message: 'Todo added successfully!',
        color: 'success',
      };
    },
    updateTodo() {
      // trim todo input
      const todoEditInput = this.todo.trim();
      // check if todo input is empty
      if (!todoEditInput.length) {
        return (this.snackbar = {
          show: true,
          message: 'Please enter a valid todo.',
          color: 'red',
        });
      }
      // check if todo input is > 50 characters
      if (todoEditInput.length > 50) {
        return (this.snackbar = {
          show: true,
          message: 'Todo must be less than or equal to 50 characters.',
          color: 'red',
        });
      }
      this.todos[this.todoEditIndex].body = todoEditInput;
      this.todo = '';
      this.isTodoEditing = false;
      this.snackbar = {
        show: true,
        message: 'Todo updated successfully!',
        color: 'success',
      };
    },
    // toggle todo done checkbox
    toggleDone(id) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id);
      const todo = this.todos[todoIndex];
      todo.done = !todo.done;
    },
    // edit todo
    editTodo(id) {
      this.isTodoEditing = true;
      this.todoEditIndex = this.todos.findIndex((todo) => todo.id === id);
      this.todo = this.todos[this.todoEditIndex].body;
    },
    // delete todo
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.snackbar = {
        show: true,
        message: 'Todo deleted successfully!',
        color: 'success',
      };
    },
    // cancel edit function for button
    cancelEdit() {
      this.todo = '';
      this.isTodoEditing = false;
    },
  },
};
</script>
