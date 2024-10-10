import './App.css';
import SideBar from './Components/SideBar';
import NewProject from './Components/NewProject';
import { useState } from 'react';
import NoProjectSelected from './Components/NoProjectSelected';
import SelectedProject from './Components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  })
  
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
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
  
  let content =  <SelectedProject projectInfo={selectedProject}/>;
  
  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected handleCreateProject={handleCreateProject} />
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject 
    addProject={handleAddProject} 
    onCancel={handleCancel}
    />
  }

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
