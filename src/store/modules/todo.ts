import { Todo, TodoState } from '@/types/todo';
import { Commit } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

/** Todo Module */

// STATE //
export const state = {
  todo: '',
  isTodoEditing: false,
  todoEditIndex: null,
  todos: [],
};

// MUTATIONS //
export const mutations = {
  SET_TODOS(state: TodoState, payload: Array<Todo>) {
    state.todos = payload;
  },
  SET_TODO_INPUT(state: TodoState, payload: Todo) {
    state.todo = payload;
  },
  ADD_TODO(state: TodoState, payload: Todo) {
    state.todos.push(payload);
    state.todo = '';
  },
  UPDATE_TODO(state: TodoState, payload: string) {
    state.todos[state.todoEditIndex].body = payload;
    state.todo = '';
    state.isTodoEditing = false;
  },
  EDIT_TODO(state: TodoState, payload: string) {
    state.isTodoEditing = true;
    state.todoEditIndex = state.todos.findIndex((todo) => todo.id === payload);
    state.todo = state.todos[state.todoEditIndex].body;
  },
  DELETE_TODO(state: TodoState, payload: string) {
    state.todos = state.todos.filter((todo) => todo.id !== payload);
  },
  MARK_TODO_DONE(state: TodoState, payload: string) {
    const todoIndex = state.todos.findIndex((todo) => todo.id === payload);
    const todo = state.todos[todoIndex];
    todo.done = !todo.done;
  },
  CANCEL_EDIT(state: TodoState) {
    state.isTodoEditing = false;
    state.todo = '';
  },
};

// ACTIONS //
export const actions = {
  fetchTodos({ commit }: { commit: Commit }) {
    const getTodos = JSON.parse(localStorage.getItem('todoList') ?? '[]'); // default empty array ('[]') if localStorage.getItem('todoList') is null
    commit('SET_TODOS', getTodos);
  },
  addTodo({ commit }: { commit: Commit }, payload: string) {
    // check if payload (todo input) is empty
    if (!payload.length) {
      commit(
        'SET_SNACKBAR',
        {
          show: true,
          message: 'Please enter a valid todo',
          color: 'red',
        },
        { root: true }
      );
    }
    // check if payload (todo input) is > 50 char
    if (payload.length > 50) {
      commit(
        'SET_SNACKBAR',
        {
          show: true,
          message: 'Todo must be less than or equal to 50 characters.',
          color: 'red',
        },
        { root: true }
      );
    }
    // add new todo object to todos
    const newTodo = {
      id: uuidv4().slice(0, 8), // uuid lib for generating random id
      body: payload,
      done: false,
      createdAt: Date.now(),
    };
    commit('ADD_TODO', newTodo);
    commit(
      'SET_SNACKBAR',
      {
        show: true,
        message: 'Todo added successfully!',
        color: 'success',
      },
      { root: true }
    );
  },
  updateTodo({ commit }: { commit: Commit }, payload: string) {
    // check if payload (edit todo input) is empty
    if (!payload.length) {
      commit(
        'SET_SNACKBAR',
        {
          show: true,
          message: 'Please enter a valid todo',
          color: 'red',
        },
        { root: true }
      );
    }
    // check if payload (edit todo input) is > 50 char
    if (payload.length > 50) {
      commit(
        'SET_SNACKBAR',
        {
          show: true,
          message: 'Todo must be less than or equal to 50 characters.',
          color: 'red',
        },
        { root: true }
      );
    }
    commit('UPDATE_TODO', payload);
    commit(
      'SET_SNACKBAR',
      {
        show: true,
        message: 'Todo updated successfully!',
        color: 'success',
      },
      { root: true }
    );
  },
  deleteTodo({ commit }: { commit: Commit }, payload: string) {
    commit('DELETE_TODO', payload);
    commit(
      'SET_SNACKBAR',
      {
        show: true,
        message: 'Todo deleted successfully!',
        color: 'success',
      },
      { root: true }
    );
  },
};

// GETTERS //
export const getters = {
  todos(state: TodoState) {
    return state.todos;
  },
  todosLength(state: TodoState) {
    return state.todos.length;
  },
  isTodoEditing(state: TodoState) {
    return state.isTodoEditing;
  },
};
