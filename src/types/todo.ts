export type Todo = {
  id: string;
  body: string;
  done: boolean;
  createdAt: number;
};

export type TodoState = {
  todo: Todo | string;
  todos: Todo[];
  todoEditIndex: number;
  isTodoEditing: boolean;
};
