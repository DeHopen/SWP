'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import "@/components/styles/UserPartTopic.scss";

export default function ChooseTask() {
  const { id } = useParams();
  const router = useRouter();
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const topicNames = useSelector((state: RootState) => state.tasks.topicNames);

  if (!id) return null;

  const topicId = +id;
  const topicTasks = tasks[topicId] || [];
  const topicName = topicNames[topicId] || 'Неизвестная тема';

  const handleSolveTask = (task: string) => {
    router.push(`/model?task=${encodeURIComponent(task)}`);
  };

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
                        className="topic-item"
                    >
                      <h3>{task.summary}</h3>
                      {expandedTask === task.id && <p>{task.details}</p>}
                      <button onClick={() => handleSolveTask(task.summary)}>Решить в модели</button>
                      <button onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}>
                        {expandedTask === task.id ? 'Скрыть детали' : 'Показать детали'}
                      </button>
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