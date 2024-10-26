import React from 'react';
import {Table} from '@/interfaces/Itable';
import {deleteTable} from '@/services/table/table-service';


export default async function handleDeleteTable(id: number, setTables: React.Dispatch<React.SetStateAction<Table[]>>) {
  await deleteTable(id)
    .then((response) => {
      return response;
    }).then((data) => {
      setTables((prevTables) => {
        return prevTables
          .filter((table) => table.id !== data.data.id);
      });
    });
}