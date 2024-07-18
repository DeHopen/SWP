'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styles from "@/components/styles/UserPartTopic.module.scss";

export default function ChooseTask() {
  const { id } = useParams();
  const router = useRouter();
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const tasks = useSelector((state: RootState) => state.task.tasks);
  const topicNames = useSelector((state: RootState) => state.task.topicNames);

  if (!id) return null;

  const topicId = +id;
  const topicTasks = tasks[topicId] || [];
  const topicName = topicNames[topicId] || 'Неизвестная тема';

  const handleSolveTask = (task: string) => {
    router.push(`/model?task=${encodeURIComponent(task)}`);
  };

  const toggleTaskDetails = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
      <div className={styles.taskPanel}>
        <h1 className={styles.title}>Math Helper</h1>
        <main className={styles.main}>
          <div className={styles.documentation}></div>
          <div>
            <div>
              <h2>Задачи по теме: {topicName}</h2>
              <div className={styles.tasks}>
                {topicTasks.map((task) => (
                    <div
                        key={task.id}
                        className={`${styles.taskItem} ${expandedTask === task.id ? styles.expanded : ''}`}
                        onClick={() => toggleTaskDetails(task.id)}
                    >
                      <h3>{task.summary}</h3>
                      {expandedTask === task.id && <p>{task.details}</p>}
                      <button className={styles.solveButton} onClick={(e) => { e.stopPropagation(); handleSolveTask(task.summary); }}>Решить в модели</button>
                    </div>
                ))}
              </div>
              <button className={styles.backButton} onClick={() => router.push('/')}>Назад к выбору темы</button>
            </div>
          </div>
        </main>
      </div>
  );
}
