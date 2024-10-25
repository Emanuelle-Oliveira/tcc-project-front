export interface Column {
  id: number;
  name: string;
  alias: string;
  isForeignKey: boolean;
  isPrimaryKey: boolean;
  dataType: string;
  tableId: number;
}