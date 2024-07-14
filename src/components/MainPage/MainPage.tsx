// pages/index.tsx
import Link from 'next/link';
import "@/components/styles/UserPart.scss";

const topics = [
  { id: 1, name: 'Алгебра', description: 'Изучение алгебраических выражений и уравнений.' },
  { id: 2, name: 'Геометрия', description: 'Изучение фигур, площадей и объемов.' },
  { id: 3, name: 'Тригонометрия', description: 'Изучение тригонометрических функций и уравнений.' },
];

export default function Home() {
  return (
      <div className='admin-panel'>
        <h1 className="title">Math Helper</h1>
        <main>
          <div className="documentation"></div>
          <div>
            <h2>Directions</h2>
            <div className="tasks">
              {topics.map((topic) => (
                  <div className="task-item">
                    <h3>{topic.name}</h3>
                    <p>{topic.description}</p>
                    <div className="btn-study">
                      <Link key={topic.id} href={`/task/${topic.id}`}>
                        <button>Учиться</button>
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </main>
      </div>
  );
}