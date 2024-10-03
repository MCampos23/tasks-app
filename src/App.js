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

  let content;
  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected handleCreateProject={handleCreateProject} />
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject />
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <SideBar handleCreateProject={handleCreateProject} />
      {content}
    </main>
  );
}

export default App;
