import {FormikHelpers} from 'formik';
import {CreateTableDto, Table} from '@/interfaces/Itable';
import {createTable} from '@/services/table/table-service';
import React from 'react';

export async function handleCreateTable(
  values: CreateTableDto,
  actions: FormikHelpers<CreateTableDto>,
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  createTable(values)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setTables(prevTables => [...prevTables, { ...data.data }]);
    });
  actions.resetForm();
}