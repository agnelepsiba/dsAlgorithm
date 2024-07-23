import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type TaskFunction = (input: string, k?: string) => string;

interface Task {
  id: string;
  name: string;
  function: TaskFunction;
  placeholders: string[];
  buttonLabel: string;
}

const tasks: Task[] = [
  { id: "1", name: "Find Missing Number", function: findMissingNumber, placeholders: ["e.g., 1,2,3,4,6"], buttonLabel: "Find" },
  { id: "2", name: "Remove Duplicates", function: removeDuplicates, placeholders: ["e.g., 1,2,2,3,4"], buttonLabel: "Remove" },
  { id: "3", name: "Factorial", function: factorial, placeholders: ["e.g., 5"], buttonLabel: "Submit" },
  { id: "4", name: "Rotate Array", function: rotateArray, placeholders: ["Array: e.g., 1,2,3,4,5", "Rotate by: e.g., 2"], buttonLabel: "Rotate" },
  
];

const taskFunctions: { [key: string]: TaskFunction } = {};
tasks.forEach(task => {
  taskFunctions[task.id] = task.function;
});

function findMissingNumber(input: string): string {
  if (input.trim() === '') {
      return 'Input is empty';
  }

  const arr = input.split(',').map(value => {
      const num = Number(value.trim());
      return isNaN(num) ? null : num;
  });

  if (arr.includes(null)) {
      return 'Please enter valid numbers';
  }

  const sortedArr = arr.filter((num): num is number => num !== null).sort((a, b) => a - b);

  if (sortedArr.length === 0) {
      return 'No numbers provided';
  }

  const missingNumbers: number[] = [];
  const first = sortedArr[0];
  const last = sortedArr[sortedArr.length - 1];
  
  for (let i = first; i <= last; i++) {
      if (!sortedArr.includes(i)) {
          missingNumbers.push(i);
      }
  }
 
  if (missingNumbers.length === 0) {
      return 'No numbers are missing';
  }
  return missingNumbers.join(', ');
}


  

function removeDuplicates(input: string): string {
  const arr = input.split(',').map(Number);
  const uniqueArr = Array.from(new Set(arr));
  return `Array without duplicates: ${uniqueArr.join(',')}`;
}

function factorial(input: string): string {
    if (input.trim() === '' || isNaN(Number(input))) {
      return 'Invalid input';
    }
    
    const n = parseInt(input, 10);
    
    if (n < 0) {
      return 'Invalid input';
    }
    
    const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
    
    return fact(n).toString();
  }
  

function rotateArray(input: string, kStr?: string): string {
  if (!kStr) {
    return "Rotation count (k) is missing";
  }
    
  const arr = input.split(',').map(Number);
  const k = parseInt(kStr, 10);
  const rotated = [...arr.slice(-k), ...arr.slice(0, -k)];
  return `Rotated Array: ${rotated.join(',')}`;
}

const ProgramPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const task = tasks.find(t => t.id === taskId);
  const [input, setInput] = useState<string>('');
  const [kValue, setKValue] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  if (!task) return <p>Task not found</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (taskId && taskFunctions[taskId]) {
      const result = taskId === "4" ? taskFunctions[taskId](input, kValue) : taskFunctions[taskId](input);
      setOutput(result);
    }
  };

  return (
    <div>
      <h2>{task.name}</h2>
      {taskId === "4" ? (
        <>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={task.placeholders[0]}
          />
          <input
            type="text"
            value={kValue}
            onChange={handleKValueChange}
            placeholder={task.placeholders[1]}
          />
        </>
      ) : (
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={task.placeholders[0]}
        />
      )}
      <button onClick={handleButtonClick}>{task.buttonLabel}</button>
      <p>Output: {output}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default ProgramPage;
