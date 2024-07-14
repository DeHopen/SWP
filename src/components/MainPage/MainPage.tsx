"use client"
import Link from 'next/link';
import styles from '@/components/styles/UserPart.module.scss';
import { useGetTopicsQuery } from "@/store/api/topicsApi";
import { useState } from "react";

interface Topic {
  id: number;
  topic: string;
}

export default function MainPage() {
  const [id, setId] = useState<string>("2");
  const { data: topics, isLoading } = useGetTopicsQuery(id);

  return (
      <div className={styles.continer}>
        <h1 className="title">Math Helper</h1>
        <main>
          <div className={styles.documentation}></div>
          <div>
            <h2>Directions</h2>
            <div className={styles.tasks}>
              {isLoading && <p>Loading...</p>}
              {topics && topics.length > 0 && (
                  topics.map((topic: Topic) => (
                      <div className={styles["task-item"]} key={topic.id}>
                        <h3>{topic.topic}</h3>
                        <div className="btn-study">
                          <Link href={`/task/${topic.id}`}>
                            <button>Учиться</button>
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
