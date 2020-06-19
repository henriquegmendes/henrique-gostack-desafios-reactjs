import React, { useState, useEffect } from "react";
import { apiService } from './services/api';

import "./styles.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState({
    ReactJS: false,
    'React Native': false,
    'Node.js': false,
    Javascript: false,
  });

  const handleChange = event => {
    const { name, value, checked } = event.target;

    switch(name) {
      case 'title':
        setTitle(value);
        break;
      case 'url':
        setUrl(value);
        break;
      default:
        setTechs({ ...techs, [name]: checked });
    }
  }

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setTechs({
      ReactJS: false,
      'React Native': false,
      'Node.js': false,
      Javascript: false,
    });
  }

  const loadAllProjects = async () => {
    try {
      const projects = await apiService.listProjects();
      
      setProjects(projects);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddRepository = async () => {
    const techsList = Object.keys(techs).filter(tech => techs[tech]);

    const params = {
      title,
      url,
      techs: techsList,
    }

    try {
      const newProject = await apiService.addProject(params);

      setProjects([...projects, newProject]);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveRepository = async (id) => {
    try {
      await apiService.deleteProject(id);
  
      const newProjectList = projects.filter(project => project.id !== id);

      setProjects(newProjectList)
    } catch (error) {
      console.log(error);
    }
  }

  const listAllProjects = () => projects.map(project => {
    return(
      <li key={project.id}>
        {project.title}

        <button onClick={() => handleRemoveRepository(project.id)}>
          Remover
        </button>
      </li>
    )
  })

  useEffect(() => {
    loadAllProjects();
  }, []);


  return (
    <div>
      <ul data-testid="repository-list">
        {listAllProjects()}
      </ul>

      <form className="form-container">
        <div>
          <input type="text" name="title" placeholder="Digite o nome do seu projeto" value={title} onChange={handleChange} />
        </div>

        <div>
          <input type="text" name="url" placeholder="Digite a url do seu projeto" value={url} onChange={handleChange} />
        </div>

        <p>Technologies:</p>

        <div>
          <div>
            <label htmlFor="ReactJS">ReactJS</label>
            <input type="checkbox" name="ReactJS" id="ReactJS" checked={techs.ReactJS} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="React Native">React Native</label>
            <input type="checkbox" name="React Native" id="React Native" checked={techs['React Native']} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="Node.js">Node.js</label>
            <input type="checkbox" name="Node.js" id="Node.js" checked={techs['Node.js']} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="Javascript">Javascript</label>
            <input type="checkbox" name="Javascript" id="Javascript" checked={techs.Javascript} onChange={handleChange} />
          </div>
        </div>

        <button type="button" onClick={handleAddRepository}>Adicionar</button>
      </form>
    </div>
  );
}

export default App;
