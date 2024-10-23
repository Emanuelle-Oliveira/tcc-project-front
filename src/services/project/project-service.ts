import {axiosAuth} from '@/services/axios/axios';
import {Project} from '@/interfaces/Iproject';

export const getAllProject = async () => {
  return axiosAuth.get<Project[]>('/project')
    .then((response): Project[] => {
      return response.data;
    });
};

export const createProject = async (
  projectName: string,
) => {
  return axiosAuth.post<Project>('/project', {
    name: projectName,
    userId: 1
  });
};

export const updateProject = async (
  id: number,
  projectName: string,
) => {
  return axiosAuth.patch<Project>(`/project/${id}`, {
    name: projectName,
    userId: 1
  });
};

export const deleteProject = async (
  id: number,
) => {
  return axiosAuth.delete<Project>(`/project/${id}`);
};
