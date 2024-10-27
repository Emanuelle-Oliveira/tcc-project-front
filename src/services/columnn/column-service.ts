import {axiosAuth} from '@/services/axios/axios';
import {Column, CreateColumnDto, UpdateColumnDto} from '@/interfaces/Icolumn';

export const createColumn = async (
  values: CreateColumnDto,
) => {
  return axiosAuth.post<Column>('/column', {
    name: values.name,
    alias: values.alias,
    isForeignKey: values.isForeignKey,
    isPrimaryKey: values.isPrimaryKey,
    dataType: values.dataType,
    xtableId: values.xtableId
  });
};

export const updateColumn = async (
  values: UpdateColumnDto
) => {
  return axiosAuth.patch<Column>(`/column/${values.id}`, {
    name: values.name,
    alias: values.alias,
    isForeignKey: values.isForeignKey,
    isPrimaryKey: values.isPrimaryKey,
    dataType: values.dataType,
    xtableId: values.xtableId
  });
};

export const deleteColumn = async (
  id: number,
) => {
  return axiosAuth.delete<Column>(`/column/${id}`);
};
