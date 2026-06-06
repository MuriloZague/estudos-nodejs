import { useState } from "react";
import Register from "../Register/Register";
import type { User } from "../../components/UsersPanel";
import api from "../../services/api";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const response = await api.get<User[]>("/usuarios");
      setUsers(response.data);
    }

    getUsers();
  }, []);

    return <Register users={users}/>;

}

export default App;