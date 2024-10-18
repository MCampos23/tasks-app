import noProjectImage from '../assets/ilustracion-concepto-planificacion-proyectos_114360-542.avif';
import Button from './Button';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';

export default function NoProjectSelected() {
    const { createProject } = useContext(TasksContext)
  
    return(
        <div className="mt-24 text-center w-2/3"> 
            <img 
            src={noProjectImage}
            alt='Adding project'
            className="w-24 h-24 object-contain mx-auto"
            />
            <h2 className="text-xl font-bold text-stone-500 my-4">
                No Project Selected
            </h2>
            <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
            <p className="mt-8">
                <Button onClick={createProject}>Create new project</Button>
            </p>
        </div>
    )
}