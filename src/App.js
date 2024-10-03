import './App.css';
import SideBar from './Components/SideBar';
import NewProject from './Components/NewProject';

function App() {
  return (
    <main className='h-screen my-8 flex gap-8'>
      <SideBar />
      <NewProject />
    </main>
  );
}

export default App;
