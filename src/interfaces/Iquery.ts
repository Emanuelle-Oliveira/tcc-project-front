import {QueryTable} from '@/interfaces/Iquerytable';

export interface Query {
  id: number;
  name: string;
  dbType: string;
  query: string;
  mainTableId: number;
  tables: QueryTable[];
  conditions: QueryTable[];
}

export interface CreateQueryDto {
  name: string;
  dbType: string;
}