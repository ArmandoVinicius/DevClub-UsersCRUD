import './style.css';
import Trash from '../../../assets/trash.svg';

import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromAPI = await api.get('/users');
    setUsers(usersFromAPI.data);
  }

  async function handleSubmit() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function handleDelete(id) {
    await api.delete(`/users/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>

        <input placeholder="Nome" type="text" ref={inputName} />
        <input placeholder="Idade" type="text" ref={inputAge} />
        <input placeholder="E-mail" type="email" ref={inputEmail} />

        <button type="button" onClick={handleSubmit}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => {
        return (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                E-mail: <span>{user.email}</span>
              </p>
            </div>

            <button>
              <img
                onClick={() => handleDelete(user.id)}
                width={32}
                src={Trash}
                alt="Ícone de lixeira para apagar o cadastro do usuário"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
