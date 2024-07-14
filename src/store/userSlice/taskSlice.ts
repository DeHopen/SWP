import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  summary: string;
  details: string;
}

interface TasksState {
  tasks: { [key: number]: Task[] };
  topicNames: { [key: number]: string };
}

const initialState: TasksState = {
  tasks: {
    1: [
      { id: 1, summary: 'Решить уравнение x^2 - 5x + 6 = 0', details: 'Найдите корни уравнения.' },
      { id: 2, summary: 'Упростить выражение (a+b)^2', details: 'Раскройте скобки.' },
    ],
    2: [
      { id: 1, summary: 'Найти площадь круга с радиусом 5', details: 'Используйте формулу πr^2.' },
      { id: 2, summary: 'Вычислить объем куба со стороной 3', details: 'Используйте формулу a^3.' },
    ],
    3: [
      { id: 1, summary: 'Найти sin(30°)', details: 'Используйте таблицу значений тригонометрических функций.' },
      { id: 2, summary: 'Решить уравнение sin(x) = 0.5', details: 'Найдите x.' },
    ],
  },
  topicNames: {
    1: 'Алгебра',
    2: 'Геометрия',
    3: 'Тригонометрия',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;
