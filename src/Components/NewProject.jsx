import Input from "./Input";
import { useRef } from "react";

export default function NewProject({addProject}){


    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const dueDateInput = useRef(null);

    const validateFields = (taskObject) => {
        return taskObject.title !== '' && taskObject.description !== '' && taskObject.dueDate !== ''   
    }

    const handleAddTask = () => {    
        const enteredTitle = titleInput.current.value;
        const enteredDescription = descriptionInput.current.value;
        const enteredDueDate= dueDateInput.current.value;

       // if(validateFields(newTask)) setTaskInfo(newTask)
        addProject({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        })
        
    }
    return(
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950">Cancel</button>    
                </li>
                <li>
                    <button 
                    onClick={handleAddTask} 
                    className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-900">Save</button>    
                </li>
            </menu>
            <div>
                <Input type='text' ref={titleInput} label={'Title'}/>
                <Input ref={descriptionInput} label={'Description'} isTextArea/>
                <Input type='date' ref={dueDateInput} label={'Due date'}/>
            </div>
        </div>


    )
}