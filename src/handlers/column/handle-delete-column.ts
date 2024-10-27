import React from 'react';
import {Table} from '@/interfaces/Itable';
import {deleteColumn} from '@/services/columnn/column-service';

export default async function handleDeleteColumn(
  id: number,
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  const response = await deleteColumn(id);
  const deletedColumnData = response.data;

  setTables((prevTables) =>
    prevTables.map((table) => {
      if (table.id === deletedColumnData.xtableId) {
        return {
          ...table,
          xcolumns: table.xcolumns?.filter((column) => column.id !== deletedColumnData.id) || [],
        };
      }
      return table;
    })
  );
}