import {axiosAuth} from '@/services/axios/axios';
import {CreateTableDto, Table} from '@/interfaces/Itable';

export const getTableByProject = async (
  projectId: number
) => {
  return axiosAuth.get<Table[]>(`/table/project/${projectId}`)
    .then((response): Table[] => {
      return response.data;
    });
};

export const createTable = async (
  values: CreateTableDto
) => {
  return axiosAuth.post<Table>('/table', {
    name: values.tableName,
    alias: values.tableAlias,
    projectId: values.projectId,
  });
};

// export const getAllProject = async () => {
//   return axiosAuth.get<Project[]>('/project')
//     .then((response): Project[] => {
//       return response.data;
//     });
// };
//
//
// export const updateProject = async (
//   id: number,
//   projectName: string,
// ) => {
//   return axiosAuth.patch<Project>(`/project/${id}`, {
//     name: projectName,
//     userId: 1
//   });
// };
//
// export const deleteProject = async (
//   id: number,
// ) => {
//   return axiosAuth.delete<Project>(`/project/${id}`);
// };
