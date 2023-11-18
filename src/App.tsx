import React, { FC, ChangeEvent, useState } from 'react';
import './App.scss';
import { ITask } from './Interfaces';
import { TodoTask } from './Components/TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);


  const handleChnage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value))
    }
  }

  const addTask = (): void => {
    const newTask: ITask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
    console.log(todoList)
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList( todoList.filter((task) => {
      return task.taskName !== taskNameToDelete;
    } ) )
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" placeholder="Task..." name="task" onChange={handleChnage} value={task} />
          <input type="number" placeholder="Deadline (days)" name="deadline" onChange={handleChnage} value={deadline} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map(( task: ITask, key: number)=>{
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
}

export default App;
