import {FormikHelpers} from 'formik';
import {CreateRelationshipDto} from '@/interfaces/Irelationship';
import {createRelationship} from '@/services/relationship/relationship-service';
import {Table} from '@/interfaces/Itable';
import React from 'react';

export async function handleCreateRelationship(
  values: CreateRelationshipDto,
  actions: FormikHelpers<CreateRelationshipDto>,
  tables: Table[],
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  const response = await createRelationship(values);
  const newRelationship = response.data;

  const updatedTables = tables.map((table) => {
    if (table.id === values.firstTableId) {
      return {
        ...table,
        firstRelationships: [...(table.firstRelationships || []), newRelationship],
      };
    }
    if (table.id === values.secondTableId) {
      return {
        ...table,
        secondRelationships: [...(table.secondRelationships || []), newRelationship],
      };
    }
    return table;
  });

  setTables(updatedTables);

  actions.resetForm();
}