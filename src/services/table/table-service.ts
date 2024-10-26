import {axiosAuth} from '@/services/axios/axios';
import {CreateTableDto, Table, UpdateTableDto} from '@/interfaces/Itable';

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

export const updateTable = async (
  values: UpdateTableDto
) => {
  return axiosAuth.patch<Table>(`/table/${values.id}`, {
    name: values.tableName,
    alias: values.tableAlias,
    projectId: values.projectId
  });
};

export const deleteTable = async (
  id: number,
) => {
  return axiosAuth.delete<Table>(`/table/${id}`);
};

// export const getAllProject = async () => {
//   return axiosAuth.get<Project[]>('/project')
//     .then((response): Project[] => {
//       return response.data;
//     });
// };
//
// export const deleteProject = async (
//   id: number,
// ) => {
//   return axiosAuth.delete<Project>(`/project/${id}`);
// };
