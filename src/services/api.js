import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});


class ApiServiceHandler {
  constructor() {
    this.api = api;
  }

  listProjects = async () => {
    const { data } = await this.api.get('/repositories');

    return data;
  }

  addProject = async params => {
    const { data } = await this.api.post('/repositories', params);

    return data;
  }

  deleteProject = async projectId => {
    await this.api.delete(`/repositories/${projectId}`);
  }
}

export const apiService = new ApiServiceHandler();

export default api;
