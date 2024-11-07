import { createContext, useReducer } from "react";

const baseUrl = 'https://yellow-pig-360471.hostingersite.com/'

function reducer(state, action) {
  if (action.type === "ADD_USER") {
    const newUser = {
      id: action.id,
      username: action.username,
      password: action.password,
    };
    return {
      ...state,
      users: [...state.users, newUser],
    };

  }

  if (action.type === "ADD_TASK") {
    const taskId = Math.random();
    const newTask = {
      text: action.text,
      id: taskId,
      projectId: state.selectedProjectId,
    };
    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }

  if (action.type === "DELETE_TASK") {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.id),
    };
  }

  if (action.type === "ADD_PROJECT") {
    const projectId = Math.random();

    const newProject = {
      ...action.projectData,
      id: projectId,
    };

    return {
      ...state,
      selectedProjectId: projectId,
      projects: [...state.projects, newProject],
    };
  }

  if (action.type === "CREATE_PROJECT") {
    return {
      ...state,
      selectedProjectId: null,
    };
  }

  if (action.type === "CANCEL") {
    return {
      ...state,
      selectedProjectId: undefined,
    };
  }

  if (action.type === "SELECT_PROJECT") {
    return {
      ...state,
        selectedProjectId: action.projectId,
    };
  }

  if (action.type === "DELETE_PROJECT") {
    return {
      ...state,
      selectedProjectId: undefined,
      projects: state.projects.filter(
        (project) => project.id !== state.selectedProjectId
      ),
    };
  }

  throw Error("Unknown action.");
}

const initalValue = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  users: [],
  loggedUser: null
};

export const TasksContext = createContext(initalValue);

export default function TasksContextProvider({ children }) {
  const [projectsState, dispatch] = useReducer(reducer, initalValue);

  async function handleAddUser(username, password) {
    // Crear el usuario en la base de datos
    const response = await fetch( baseUrl + '/register_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    const userIdFromDB = data.id; // El ID generado en la base de datos
  
    // Despachar el ID generado al estado global
    dispatch({
      type: 'ADD_USER',
      id: userIdFromDB,
      username: username,
      password: password,
    });
  }

  function handleAddTask(text) {
    dispatch({
      type: "ADD_TASK",
      text: text,
    });
  }

  function handleDeleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      id: id,
    });
  }

  function handleAddProject(projectData) {
    dispatch({
      type: "ADD_PROJECT",
      projectData: projectData,
    });
  }

  function handleCreateProject() {
    dispatch({
      type: "CREATE_PROJECT"
    });
  }

  function handleCancel() {
    dispatch({
      type: "CANCEL"
    });
  }

  function handleSelectProject(projectId) {
    dispatch({
      type: "SELECT_PROJECT",
      projectId: projectId
    });
  }

  function handleDeleteProject() {
    dispatch({
      type: "DELETE_PROJECT"
    });
  }

  const selectedProjectTasks = projectsState.tasks.filter(
    (task) => task.projectId === projectsState.selectedProjectId
  );

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
    addUser: handleAddUser
  };

  return (
    <TasksContext.Provider value={ctxValue}>{children}</TasksContext.Provider>
  );
}
