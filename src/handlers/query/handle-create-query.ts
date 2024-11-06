import {FormikHelpers} from 'formik';
import {CreateQueryDto} from '@/interfaces/Iquery';
import {createQuery} from '@/services/query/query-service';
import {SelectedTable} from '@/interfaces/Iselectedtable';

export async function handleCreateQuery(
  values: CreateQueryDto,
  actions: FormikHelpers<CreateQueryDto>,
  selectedTables: SelectedTable[],
) {
  const tableMap: { [key: number]: Set<number> } = {};

  selectedTables
    .filter(table => table.tableId !== null && table.columns.length > 0)
    .forEach(table => {
      const tableId = table.tableId as number;
      if (!tableMap[tableId]) {
        tableMap[tableId] = new Set();
      }
      table.columns.forEach(columnId => tableMap[tableId].add(columnId));
    });
  
 
  const tables = Object.entries(tableMap).map(([tableId, columns]) => ({
    tableId: parseInt(tableId, 10),
    columns: columns.has(0) ? [] : Array.from(columns),
  }));

  const mainTable = tables[0].tableId as number;

  return await createQuery(
    values.name,
    values.dbType,
    '',
    mainTable,
    tables,
    []
  );
}