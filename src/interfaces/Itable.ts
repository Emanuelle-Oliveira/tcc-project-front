import { Column } from '@/interfaces/Icolumn';

export interface Table {
  id: number;
  name: string;
  alias: string;
  projectId: number;
  columns?: Column[] | null;
}