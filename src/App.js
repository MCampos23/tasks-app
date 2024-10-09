import './App.css';
import SideBar from './Components/SideBar';
import NewProject from './Components/NewProject';
import { useState } from 'react';
import NoProjectSelected from './Components/NoProjectSelected';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleCreateProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null
    }))
  }

  function handleAddProject(projectData) {
    const projectId = Math.random()
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: projectId
      };

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }


  let content;
  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected handleCreateProject={handleCreateProject} />
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject addProject={handleAddProject}/>
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <SideBar projects={projectsState.projects} handleCreateProject={handleCreateProject} />
      {content}
    </main>
  );
}

export default App;
