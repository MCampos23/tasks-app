import { useRef, useContext } from "react";
import { TasksContext } from "../store/tasks-context.jsx";

import Modal from "./Modal.jsx";
import Tasks from "./Tasks.jsx";

export default function SelectedProject() {
  const { projects, selectedProjectId, deleteProject } = useContext(TasksContext)
  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const modal = useRef();
  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <>
      <Modal ref={modal} buttonCaption={"Okay"}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Are you sure?</h2>
        <p className="text-stone-600 mb-4">This action could not be undone</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              {selectedProject.title}
            </h1>
            <button
              className="text-stone-600 hover:text-stone-950"
              onClick={deleteProject}
            >
              Delete
            </button>
          </div>
          <p className="mb-4 text-stone-400">{formattedDate}</p>
          <p className="text-stone-600 whitespace-pre-wrap">
            {selectedProject.description}
          </p>
        </header>
        <Tasks />
      </div>
    </>
  );
}
