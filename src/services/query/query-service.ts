import {axiosAuth} from '@/services/axios/axios';
import {Query} from '@/interfaces/Iquery';
import {SelectedTable} from '@/interfaces/Iselectedtable';

export const createQuery = async (
  name: string,
  dbType: string,
  query: string,
  mainTable: number,
  tables: SelectedTable[],
  conditions: []
): Promise<Query> => {
  return axiosAuth.post<Query>('/query', {
    name: name,
    dbType: dbType,
    query: query,
    mainTableId: mainTable,
    tables: tables,
    conditions: conditions
  }).then((response): Query => {
    return response.data;
  });
};

export const getQueryByProject = async (
  projectId: number
) => {
  return axiosAuth.get<Query[]>(`/query/project/${projectId}`)
    .then((response): Query[] => {
      return response.data;
    });
};
