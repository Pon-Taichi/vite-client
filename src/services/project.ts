import { Project } from "../types/project";
import { get, post } from "../utils/api";

export const getProjects = async () => {
  return await get<Project[]>("/projects");
};

export const getProject = async (name: string | undefined) => {
  if (!name) {
    throw new Error();
  }
  return await get<Project>(`/projects/${name}`);
};

export const createProject = async (project: Project) => {
  return await post<Project, Project>("/projects", project);
};
