import { Column } from '@/interfaces/Icolumn';

export interface Table {
  id: number;
  name: string;
  alias: string;
  projectId: number;
  xcolumns?: Column[] | null;
}

export interface CreateTableDto {
  tableName: string;
  tableAlias: string;
  projectId: number;
}