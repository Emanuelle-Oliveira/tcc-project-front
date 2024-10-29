import { Column } from '@/interfaces/Icolumn';
import {Relationship} from '@/interfaces/Irelationship';

export interface Table {
  id: number;
  name: string;
  alias: string;
  projectId: number;
  xcolumns?: Column[] | null;
  firstRelationships?: Relationship[] | null;
  secondRelationships?: Relationship[] | null;
}

export interface CreateTableDto {
  tableName: string;
  tableAlias: string;
  projectId: number;
}

export interface UpdateTableDto {
  id: number;
  tableName: string;
  tableAlias: string;
  projectId: number;
}