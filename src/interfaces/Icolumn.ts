export interface Column {
  id: number;
  name: string;
  alias: string;
  isForeignKey: boolean;
  isPrimaryKey: boolean;
  dataType: string;
  xtableId: number;
}

export interface CreateColumnDto {
  name: string;
  alias: string;
  isForeignKey: boolean;
  isPrimaryKey: boolean;
  dataType: string;
  xtableId: number;
}

export interface UpdateColumnDto {
  id: number;
  name: string;
  alias: string;
  isForeignKey: boolean;
  isPrimaryKey: boolean;
  dataType: string;
  xtableId: number;
}