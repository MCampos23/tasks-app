import { useRef, useContext } from "react";
import { TasksContext } from "../store/tasks-context.jsx";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject() {
  const { addProject, cancel } = useContext(TasksContext);

  const modal = useRef();

  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const dueDateInput = useRef(null);

  const handleAddTask = () => {
    const enteredTitle = titleInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredDueDate = dueDateInput.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
        modal.current.open();
        return;
    }

    addProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  return (
    <>
      <Modal ref={modal} buttonCaption={'Okay'}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
        </ Modal> 
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button 
            onClick={cancel}
            className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleAddTask}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-900"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={titleInput} label={"Title"} />
          <Input ref={descriptionInput} label={"Description"} isTextArea />
          <Input type="date" ref={dueDateInput} label={"Due date"} />
        </div>
      </div>
    </>
  );
}
