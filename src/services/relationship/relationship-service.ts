import {axiosAuth} from '@/services/axios/axios';
import {CreateRelationshipDto, Relationship} from '@/interfaces/Irelationship';

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

