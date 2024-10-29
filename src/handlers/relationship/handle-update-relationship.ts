import {FormikHelpers} from 'formik';
import {UpdateRelationshipDto} from '@/interfaces/Irelationship';
import {Table} from '@/interfaces/Itable';
import React from 'react';
import {updateRelationship} from '@/services/relationship/relationship-service';

export async function handleUpdateRelationship(
  values: UpdateRelationshipDto,
  actions: FormikHelpers<UpdateRelationshipDto>,
  tables: Table[],
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  updateRelationship(values)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setTables((prevTables) => {
        return prevTables.map((table) => {
          if (table.id === values.firstTableId) {
            return {
              ...table,
              firstRelationships: table.firstRelationships?.map((relationship) => {
                if (relationship.id === values.id) {
                  return { ...relationship, ...data.data };
                } else {
                  return relationship;
                }
              }),
            };
          } else if (table.id === values.secondTableId) {
            return {
              ...table,
              secondRelationships: table.secondRelationships?.map((relationship) => {
                if (relationship.id === values.id) {
                  return { ...relationship, ...data.data };
                } else {
                  return relationship;
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