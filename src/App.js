import './App.css';
import SideBar from './Components/SideBar';
import NewProject from './Components/NewProject';
import { useContext } from 'react';
import NoProjectSelected from './Components/NoProjectSelected';
import SelectedProject from './Components/SelectedProject.jsx';
import TasksContextProvider, { TasksContext } from './store/tasks-context.jsx';

function App() {

  return (
    <TasksContextProvider>
      <Content />
    </TasksContextProvider>
  );
}

function Content() {
  const { selectedProjectId } = useContext(TasksContext);

  let content = <SelectedProject />;

  if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  } else if (selectedProjectId === null) {
    content = <NewProject />;
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <SideBar />
      {content}
    </main>
  );
}

export default App;
