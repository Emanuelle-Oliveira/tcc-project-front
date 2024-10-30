import {axiosAuth} from '@/services/axios/axios';
import {Query} from '@/interfaces/Iquery';

export const createQuery = async (
  name: string,
  dbType: string,
  query: string,
  mainTable: number,
  tables,
  conditions: []
) => {
  return axiosAuth.post<Query>('/query', {
    name: name,
    dbType: dbType,
    query: '',
    mainTableId: mainTable,
    tables: tables,
    conditions: conditions
  });
};
