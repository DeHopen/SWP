'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styles from "@/components/styles/UserPartTopic.module.scss";
import { useGetTasksQuery } from "@/store/api/taskApi";
import Link from "next/link";

export default function ChooseTask() {
  const { id } = useParams();
  const router = useRouter();
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const { data: tasksData, isLoading: isTasksLoading, refetch } = useGetTasksQuery({
    topic_id: id as string,
    user_id: "2",
  });

  if (!id) return null;

  const topicName = tasksData && tasksData.length > 0 ? tasksData[0].topic_name : 'Задачи не добавлены';

  const handleSolveTask = (task: string) => {
    router.push(`/model?task=${encodeURIComponent(task)}`);
  };

  const toggleTaskDetails = (taskId: string) => {
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
                {isTasksLoading && <p>Loading...</p>}
                {tasksData && tasksData.map((task) => (
                    <div
                        key={task.id}
                        className={`${styles.taskItem} ${expandedTask === task.id ? styles.expanded : ''}`}
                        onClick={() => toggleTaskDetails(task.id)}
                    >
                      <h3>{task.name}</h3>
                      {expandedTask === task.id && <p>{task.description}</p>}
                      <button className={styles.solveButton} onClick={(e) => {
                        e.stopPropagation();
                        handleSolveTask(task.description);
                      }}>Решить в модели
                      </button>
                    </div>
                ))}

              </div>
              <div className={styles.backButton}>
                <button  onClick={() => router.push('/')}>Назад к выбору темы</button>
                <button  onClick={() => router.push('/model')}>Общение с моделью</button>
              </div>
             </div>
          </div>
        </main>
      </div>
  );
}
