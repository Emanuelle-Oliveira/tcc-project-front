import {FormikHelpers} from 'formik';
import React from 'react';
import {CreateColumnDto} from '@/interfaces/Icolumn';
import {Table} from '@/interfaces/Itable';
import {createColumn} from '@/services/columnn/column-service';

export async function handleCreateColumn(
  values: CreateColumnDto,
  actions: FormikHelpers<CreateColumnDto>,
  tables: Table[],
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  const response = await createColumn(values);
  const newColumn = response.data;

  const updatedTables = tables.map((table) => {
    if (table.id === values.xtableId) {
      return {
        ...table,
        xcolumns: [...(table.xcolumns || []), newColumn],
      };
    }
    return table;
  });

  setTables(updatedTables);
  actions.resetForm();
}