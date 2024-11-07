import { useEffect, useRef, useContext } from "react";
import Modal from "./Modal";
import Input from "./Input";
import { TasksContext } from "../store/tasks-context";

export default function Login() {
  const { addUser } = useContext(TasksContext);

  const modal = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    modal.current.open();
  }, []);

  function handleLogin() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // Aquí llamas a addUser o lo que corresponda
    addUser(username, password);
  }

  return (
    <Modal ref={modal} buttonCaption={"Access"} onSubmit={handleLogin}>
      <div className="px-12">
        <h2 className="text-xl font-bold text-stone-700 my-4">Login</h2>
        <p>
          <Input label="Username" ref={usernameRef} />
        </p>
        <p>
          <Input label="Password" type="password" ref={passwordRef} />
        </p>
        <p className="text-stone-600 mb-4">Register</p>
      </div>
    </Modal>
  );
}
