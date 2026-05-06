// TODO: Definisikan tipe data untuk To-Do item di sini

// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item

export interface Todo {
  id: number;
  task: string;
  status: TodoStatus;
}

// TODO: Buat tipe untuk status To-Do (active/done)

export type TodoStatus = 'active' | 'done';

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

export type AddTodo = (task: string) => void;
export type ToggleTodo = (id: number) => void;
export type DeleteTodo = (id: number) => void;

// test   