// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime
import { Todo } from './types';

export function isTodo(obj: any): obj is Todo {
  const hasRequiredFields =
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.task === 'string' &&
    typeof obj.completed === 'boolean';

  return hasRequiredFields;
}
// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid
export function isTodoArray(data: any): data is Todo[] {
  if (!Array.isArray(data)) {
    return false;
  }

  for (let i = 0; i < data.length; i++) {
    if (!isTodo(data[i])) {
      return false;
    }
  }
  return true;
}

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('id-ID');
}

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
export function isValidString(input: string): boolean {
  if (input.trim().length === 0) {
    return false;
  }
  return true;
}
