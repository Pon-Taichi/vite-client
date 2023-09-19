import { Project } from "../types/project";
import { api } from "../utils/api";

export const getProjects = async () => {
  const response = await api.get<Project[]>("/projects");
  return response.data;
};

export const getProject = async (name: string | undefined) => {
  if (!name) {
    throw new Error();
  }
  const response = await api.get<Project>(`/projects/${name}`);
  return response.data;
};

export const createProject = async (project: Project) => {
  const response = await api.post<Project>("/projects", project);
  return response;
};
