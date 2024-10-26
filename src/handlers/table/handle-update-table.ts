import {Table, UpdateTableDto} from '@/interfaces/Itable';
import React from 'react';
import { FormikHelpers } from 'formik';
import {updateTable} from '@/services/table/table-service';

export async function handleUpdateTable(
  values: UpdateTableDto,
  actions: FormikHelpers<UpdateTableDto>,
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  await updateTable(values)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setTables((prevTables) => prevTables.map(table => {
        if (table.id === values.id) {
          return { ...table, ...data.data };
        }
        return table;
      }));
    });
  actions.resetForm();
}