import React from 'react';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  name: string;
}

const tasks: Task[] = [
  { id: 1, name: 'Find Missing Number' },
  { id: 2, name: 'Remove Duplicates' },
  { id: 3, name: 'Factorial' },
  { id: 4, name: 'Rotate Array' },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>DS Algorithm</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/program/${task.id}`}>{task.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
