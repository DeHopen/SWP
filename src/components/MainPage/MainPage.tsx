"use client";
import Link from 'next/link';
import styles from '@/components/styles/UserPart.module.scss';
import { useGetTopicsQuery } from "@/store/api/topicsApi";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedTopicId, saveSelectedTopic } from '@/store/userSlice/userSlice';
import { useState } from "react";

interface Topic {
  ID: number;
  topic: string;
}

export default function MainPage() {
  const [id, setId] = useState<string>("2");
  const { data: topics, isLoading } = useGetTopicsQuery(id);
  const dispatch = useDispatch();

  const handleTopicClick = (topic: Topic) => {
    dispatch(setSelectedTopicId(topic.ID.toString()));
    dispatch(saveSelectedTopic({ id: topic.ID.toString(), topic: topic.topic }));
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Math Helper</h1>
        <main>
          <div className={styles.documentation}></div>
          <div>
            <h2>Directions</h2>
            <div className={styles.tasks}>
              {isLoading && <p>Loading...</p>}
              {topics && topics.length > 0 && (
                  topics.map((topic: Topic) => (
                      <div className={styles.task_item} key={topic.ID}>
                        <h3>{topic.topic}</h3>
                        <div className={styles.btn_study}>
                          <Link href={`/task/${topic.ID}`}>
                            <button onClick={() => handleTopicClick(topic)}>Учиться</button>
                          </Link>
                        </div>
                      </div>
                  ))
              )}
            </div>
          </div>
        </main>
      </div>
  );
}
