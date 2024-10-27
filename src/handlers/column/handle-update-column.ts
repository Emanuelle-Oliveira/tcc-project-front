import {Table} from '@/interfaces/Itable';
import React from 'react';
import { FormikHelpers } from 'formik';
import {UpdateColumnDto} from '@/interfaces/Icolumn';
import {updateColumn} from '@/services/columnn/column-service';

export async function handleUpdateColumn(
  values: UpdateColumnDto,
  actions: FormikHelpers<UpdateColumnDto>,
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  updateColumn(values)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setTables((prevTables) => {
        return prevTables.map((table) => {
          if (table.id === values.xtableId) {
            return {
              ...table,
              xcolumns: table.xcolumns?.map((column) => {
                if (column.id === values.id) {
                  return { ...column, ...data.data };
                } else {
                  return column;
                }
              }),
            };
          } else {
            return table;
          }
        });
      });
    });
  actions.resetForm();
}