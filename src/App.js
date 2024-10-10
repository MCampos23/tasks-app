import './App.css';
import SideBar from './Components/SideBar';
import NewProject from './Components/NewProject';
import { useState } from 'react';
import NoProjectSelected from './Components/NoProjectSelected';
import SelectedProject from './Components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
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

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = (
    <SelectedProject
      projectInfo={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected handleCreateProject={handleCreateProject} />
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject
      addProject={handleAddProject}
      onCancel={handleCancel}
    />
  }
console.log(projectsState)
  return (
    <main className='h-screen my-8 flex gap-8'>
      <SideBar
        projects={projectsState.projects}
        handleCreateProject={handleCreateProject}
        onSelect={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
