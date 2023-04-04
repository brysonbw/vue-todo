<template>
  <div class="text-left">
    <v-list-item
      :to="{
        name: 'todo-detail',
        params: { id: todo.id },
      }"
    >
      <template v-slot:default>
        <v-list-item-action @click.prevent="$emit('toggleDone')">
          <v-checkbox :input-value="todo.done"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-subtitle class="font-weight-bold">{{
            todo.body
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-icon @click.stop.prevent="$emit('deleteTodo')">mdi-delete</v-icon>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['todo'],
};
</script>
