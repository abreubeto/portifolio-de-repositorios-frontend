import React, { useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `pokemon-gama ${Date.now()}` ,
	    url: "https://github.com/abreuroberto/pokemon-gama",
	    techs: ["Node.js", "..."]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
            <div>{repository.title}</div>
            <div>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
