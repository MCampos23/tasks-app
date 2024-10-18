import { useState, useContext } from "react"
import { TasksContext } from "../store/tasks-context.jsx";

export default function NewTask() {
    const { addTask } = useContext(TasksContext)
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(e) {
        setEnteredTask(e.target.value)
    }

    function handleClick() {
        if (enteredTask.trim() === ''){
          return;
        } 
        addTask(enteredTask);
        setEnteredTask('');
    }

    return(
      <div className="flex items-center gap-4">
        <input 
        type="text" 
        className="w-64 px-2 py-1 bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
        />
        <button 
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
        >Add Task</button>
      </div>
    )
}