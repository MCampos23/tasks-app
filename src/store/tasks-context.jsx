import { createContext, useState } from "react";

export const TasksContext = createContext({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
        addTask: () => {},
        deleteTask: () => {},
        addProject: () => {},
        createProject: () => {},
        cancel: () => {},
        selectProject: () => {},
        deleteProject: () => {},
})

export default function TasksContextProvider({ children }){

    const [ projectsState, setProjectsState ] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
      })
    
      function handleAddTask(text) {
        const taskId = Math.random()
        setProjectsState((prevState) => {
          const newTask = {
            text: text,
            id: taskId,
            projectId: prevState.selectedProjectId
          };
    
          return {
            ...prevState,
            tasks: [...prevState.tasks, newTask]
          }
        })
    
      }
    
      function handleDeleteTask(id) {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            tasks: prevState.tasks.filter((task) => task.id !== id)
          }
        })
    
      }
    
      function handleAddProject(projectData) {
        const projectId = Math.random()
        setProjectsState((prevState) => {
          const newProject = {
            ...projectData,
            id: projectId
          };
    
          return {
            ...prevState,
            selectedProjectId: projectId,
            projects: [...prevState.projects, newProject]
          }
        })
      }
    
      function handleCreateProject() {
        setProjectsState((prevState) => ({
          ...prevState,
          selectedProjectId: null
        }))
      }
    
      function handleCancel() {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            selectedProjectId: undefined,
          }
        })
      }
    
      function handleSelectProject(projectId) {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            selectedProjectId: projectId,
          }
        })
      }
    
      function handleDeleteProject() {
        setProjectsState((prevState) => {
          return {
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
          }
        })
      }
    
     
      const selectedProjectTasks = projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId);

      const ctxValue = {
        selectedProjectId: projectsState.selectedProjectId,
        projects: projectsState.projects,
        tasks: selectedProjectTasks,
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
        addProject: handleAddProject,
        createProject: handleCreateProject,
        cancel: handleCancel,
        selectProject: handleSelectProject,
        deleteProject: handleDeleteProject,
      };
    
      return (
        <TasksContext.Provider value={ctxValue}>{children}</TasksContext.Provider>
      );
}