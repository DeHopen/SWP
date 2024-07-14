'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Task } from '@/components/Types/types';
import "@/components/styles/UserPartTopic.scss";
import { useGetTasksQuery } from '@/store/api/taskApi';
import {useGetTopicsQuery} from "@/store/api/topicsApi";

interface Topic {
  id: number;
  topic: string;
}

export default function ChooseTask() {
  const router = useRouter();
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const [id, setId] = useState<string>("2");
  const { data: topics } = useGetTopicsQuery(id);

  const { data: tasks = [], error, isLoading } = useGetTasksQuery({ topic_id: id, user_id: 1 }, { // Assuming user_id is 1 for demo purposes
    skip: !id,
  });


  if (!id) return null;


  return (
      <div className='admin-panel'>
        <h1 className="title">Math Helper</h1>
        <main>
          <div className="documentation"></div>
          <div>
            <div>
              <h2>Задачи по теме: {topics.topic}</h2>
              <div className="topics">
                {isLoading && <p>Loading...</p>}
                {tasks.length > 0 ? (
                    tasks.map((task: Task) => (
                        <div
                            key={task.id}
                            onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                            className="topic-item"
                        >
                          <h3>{task.summary}</h3>
                          {expandedTask === task.id && <p>{task.details}</p>}
                        </div>
                    ))
                ) : (
                    !isLoading && <p>No tasks available for this topic.</p>
                )}
              </div>
              <button onClick={() => router.push('/')}>Назад к выбору темы</button>
            </div>
          </div>
        </main>
      </div>
  );
}
