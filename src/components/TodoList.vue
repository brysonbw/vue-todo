<template>
  <section>
    <!-- Todo Add Form -->
    <v-form v-if="!isTodoEditing" @submit.prevent="addTodo(todo.trim())">
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
    <v-form v-else @submit.prevent="updateTodo(todo.trim())">
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
    <v-container v-show="!todosLength" class="grey lighten-5 mx-auto">
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TodoItem from '@/components/TodoItem.vue';
export default {
  components: { TodoItem },
  // fetch todos from localStorage
  created() {
    this.fetchTodos();
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
  computed: {
    todo: {
      get() {
        return this.$store.state.todo.todo;
      },
      set(todoValue) {
        this.$store.commit('SET_TODO_INPUT', todoValue);
      },
    },
    ...mapGetters(['todosLength', 'todos', 'isTodoEditing', 'snackbar']),
  },
  methods: {
    ...mapActions([
      'addTodo',
      'updateTodo',
      'deleteTodo',
      'fetchTodos',
      'toggleDone',
    ]),
    ...mapMutations({
      toggleDone: 'MARK_TODO_DONE',
      editTodo: 'EDIT_TODO',
      cancelEdit: 'CANCEL_EDIT',
    }),
  },
};
</script>
