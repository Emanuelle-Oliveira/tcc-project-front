import {RelatedKeys} from '@/interfaces/Irelatedkeys';

export interface Relationship {
  id: number;
  firstTableId: number;
  secondTableId: number;
  firstTableCardinality: string;
  secondTableCardinality: string;
  relatedKeys: RelatedKeys[];
}

export interface CreateRelationshipDto {
  firstTableId: null;
  secondTableId: null;
  firstTableCardinality: string;
  secondTableCardinality: string;
  relatedKeys: { firstColumnId: null; secondColumnId: null; }[];
}