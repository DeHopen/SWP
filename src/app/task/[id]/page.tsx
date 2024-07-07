'use client';

import {useParams, useRouter} from 'next/navigation';
import { useState } from 'react';
import { Task, Tasks } from '@/components/Types/types';
import "@/components/styles/UserPartTopic.scss";

const tasks: Tasks = {
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
};

const topicNames: { [key: number]: string } = {
  1: 'Алгебра',
  2: 'Геометрия',
  3: 'Тригонометрия',
};

export default function Topic() {
  const { id } = useParams();
  const router = useRouter();
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  if (!id) return null;

  const topicId = +id;
  const topicTasks: Task[] = tasks[topicId] || [];
  const topicName = topicNames[topicId] || 'Неизвестная тема';

  return (
      <div className='admin-panel'>
        <h1 className="title">Math Helper</h1>
        <main>
          <div className="documentation"></div>
          <div>
            <div>
              <h2>Задачи по теме: {topicName}</h2>
              <div className="topics">
                {topicTasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                        className="topic-item"
                    >
                      <h3>{task.summary}</h3>
                      {expandedTask === task.id && <p>{task.details}</p>}
                    </div>
                ))}
              </div>
              <button onClick={() => router.push('/')}>Назад к выбору темы</button>
            </div>
          </div>
        </main>
      </div>
  );
}