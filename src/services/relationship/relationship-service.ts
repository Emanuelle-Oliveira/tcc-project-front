import {axiosAuth} from '@/services/axios/axios';
import {CreateRelationshipDto, Relationship, UpdateRelationshipDto} from '@/interfaces/Irelationship';

export const createRelationship = async (
  values: CreateRelationshipDto
) => {
  return axiosAuth.post<Relationship>('/relationship', {
    firstTableId: values.firstTableId,
    secondTableId: values.secondTableId,
    firstTableCardinality: values.firstTableCardinality,
    secondTableCardinality: values.secondTableCardinality,
    relatedKeys: values.relatedKeys
  });
};

export const updateRelationship = async (
  values: UpdateRelationshipDto
) => {
  return axiosAuth.patch<Relationship>(`/relationship/${values.id}`, {
    firstTableId: values.firstTableId,
    secondTableId: values.secondTableId,
    firstTableCardinality: values.firstTableCardinality,
    secondTableCardinality: values.secondTableCardinality,
    relatedKeys: values.relatedKeys
  });
};

export const deleteRelationship = async (
  id: number,
) => {
  return axiosAuth.delete<Relationship>(`/relationship/${id}`);
};

