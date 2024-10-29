import React from 'react';
import {Table} from '@/interfaces/Itable';
import {deleteRelationship} from '@/services/relationship/relationship-service';


export default async function handleDeleteRelationship(
  id: number,
  setTables: React.Dispatch<React.SetStateAction<Table[]>>,
) {
  const response = await deleteRelationship(id);
  const deletedRelationshipData = response.data;

  setTables((prevTables) =>
    prevTables.map((table) => {
      if (table.id === deletedRelationshipData.firstTableId) {
        return {
          ...table,
          firstRelationships: table.firstRelationships?.filter((relationship) => relationship.id !== deletedRelationshipData.id) || [],
        };
      }
      if (table.id === deletedRelationshipData.secondTableId) {
        return {
          ...table,
          secondRelationships: table.secondRelationships?.filter((relationship) => relationship.id !== deletedRelationshipData.id) || [],
        };
      }
      return table;
    })
  );
}