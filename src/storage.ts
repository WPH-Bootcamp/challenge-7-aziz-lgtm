import * as fs from 'fs';
import * as path from 'path';
import {Todo} from './types';
import { isTodoArray } from './utils';
// TODO: Definisikan path file untuk menyimpan data To-Do
const DATA_DIR = path.join(__dirname, '../data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');
// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file
export const readTodos = (): Todo[] => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    const parsed: unknown = JSON.parse(data);
    if (!isTodoArray(parsed)) {
      console.error('Format data tidak valid, reset ke array kosong');
      return [];
    }
    return parsed;
  } catch (error) {
    console.error('Gagal membaca file:', error);
    return [];
  }
};
// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan
export const saveTodos = (todos: Todo[]): void => {
  try {
    const data = JSON.stringify(todos, null, 2);
    fs.writeFileSync(FILE_PATH, data, 'utf-8');
  } catch (error) {
    console.error('Gagal menyimpan file:', error);
  }
};
// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)
export const initStorage = (): void => {
  try {
    
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR);
    }
   
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Gagal inisialisasi storage:', error);
  }
};