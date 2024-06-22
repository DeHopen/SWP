// pages/index.tsx
import Link from 'next/link';

const topics = [
  { id: 1, name: 'Алгебра', description: 'Изучение алгебраических выражений и уравнений.' },
  { id: 2, name: 'Геометрия', description: 'Изучение фигур, площадей и объемов.' },
  { id: 3, name: 'Тригонометрия', description: 'Изучение тригонометрических функций и уравнений.' },
];

export default function Home() {
  return (
      <div>
        <h1>Выберите математическую тему</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {topics.map((topic) => (
              <Link key={topic.id} href={`/task/${topic.id}`}>
                <span style={{ border: '1px solid #000', padding: '1rem', borderRadius: '8px' }}>
                  <h2>{topic.name}</h2>
                  <p>{topic.description}</p>
                </span>
              </Link>
          ))}
        </div>
      </div>
  );
}