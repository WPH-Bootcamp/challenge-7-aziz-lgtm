// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts
import { Todo, AddTodo, ToggleTodo, DeleteTodo } from './types';
// TODO: Import fungsi storage untuk baca/tulis file
import { readTodos, saveTodos } from './storage';
import { isValidString, formatDate } from './utils';
// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

export const addTodo: AddTodo = (task: string): void => {
  if (!isValidString(task)) {
    console.log('Task tidak boleh kosong!');
    return;
  }

  const todos = readTodos();

  const newTodo: Todo = {
    id: Date.now(),
    task: task.trim(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Todo "${newTodo.task}" berhasil ditambahkan!`);
};
// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

export const completeTodo: ToggleTodo = (id: number): void => {
  const todos = readTodos();

  let foundIndex = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex === -1) {
    console.log(`Todo dengan id ${id} tidak ditemukan`);
    return;
  }

  todos[foundIndex].status = 'done';
  saveTodos(todos);
  console.log(`Todo "${todos[foundIndex].task}" sudah ditandai selesai!`);
};
// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

export const deleteTodo: DeleteTodo = (id: number): void => {
  const todos = readTodos();

  const todoToDelete = todos.find((todo) => todo.id === id);
  if (!todoToDelete) {
    console.log(`Todo dengan id ${id} tidak ditemukan`);
    return;
  }

  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(updatedTodos);
  console.log(`Todo "${todoToDelete.task}" berhasil dihapus!`);
};

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

export const listTodos = (): void => {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log('Belum ada todo. Yuk tambah yang baru!');
    return;
  }

  console.log('\n=== Daftar Todo ===');
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const status = todo.status === 'done' ? '[DONE]  ' : '[ACTIVE]';
    const tanggal = formatDate(todo.createdAt);
    console.log(`${status} ${i + 1}. ${todo.task}  (${tanggal}) [id: ${todo.id}]`);
  }
  console.log('===================\n');
};
// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

export const searchTodos = (keyword: string): void => {
  if (!isValidString(keyword)) {
    console.log('Keyword tidak boleh kosong!');
    return;
  }

  const todos = readTodos();
  const results = todos.filter((todo) =>
    todo.task.toLowerCase().includes(keyword.toLowerCase())
  );

  if (results.length === 0) {
    console.log(`Tidak ada todo yang mengandung kata "${keyword}"`);
    return;
  }

  console.log(`\n=== Hasil Pencarian: "${keyword}" ===`);
  for (let i = 0; i < results.length; i++) {
    const todo = results[i];
    const status = todo.status === 'done' ? '[DONE]  ' : '[ACTIVE]';
    console.log(`${status} ${i + 1}. ${todo.task}  [id: ${todo.id}]`);
  }
  console.log('=====================================\n');
};