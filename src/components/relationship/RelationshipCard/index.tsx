import { Card, CardContent, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTableContext} from '@/hooks/table/table-context';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import {RelatedKeys} from '@/interfaces/Irelatedkeys';
import handleDeleteRelationship from '@/handlers/relationship/handle-delete-relationship';
import UpdateRelationshipDialog from '@/components/relationship/UpdateRelationshipDialog';

interface RelationshipCardProps {
  id: number;
  firstTableId: number;
  secondTableId: number;
  firstTableCardinality: string;
  secondTableCardinality: string;
  relatedKeys: RelatedKeys[];
  tableId: number;
}

export default function RelationshipCard({
  id,
  firstTableId,
  secondTableId,
  firstTableCardinality,
  secondTableCardinality,
  relatedKeys,
  tableId
}: RelationshipCardProps) {
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { tables, setTables } = useTableContext();

  const relatedTableName = React.useMemo(() => {
    const relatedTable = tables.find(
      (table) =>
        (table.id === firstTableId || table.id === secondTableId) && table.id !== tableId
    );
    return relatedTable ? relatedTable.alias : 'Tabela não encontrada';
  }, [tables, firstTableId, secondTableId, tableId]);

  const firstTableName = React.useMemo(() => {
    const firstTable = tables.find(
      (table) => (table.id === firstTableId)
    );
    return firstTable ? firstTable.alias : 'Primeira tabela não encontrada';
  }, [tables, firstTableId]);

  const secondTableName = React.useMemo(() => {
    const secondTable = tables.find(
      (table) => (table.id === secondTableId)
    );
    return secondTable ? secondTable.alias : 'Segunda tabela não encontrada';
  }, [tables, secondTableId]);

  return (
    <>
      <Card variant='outlined' sx={{ borderRadius: '0px', height: '43px', width: '100%' }}>
        <CardContent sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '10px',
              flexGrow: 1,
              maxWidth: '180px',
              lineHeight: '1',
            }}>
            {relatedTableName}
          </Typography>
          <IconButton
            size='small'
            onClick={() => {
              handleOpenDialog(setOpenUpdate);
            }}
          >
            <ModeEditIcon sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              handleOpenDialog(setOpenDelete);
            }}
          >
            <DeleteIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </CardContent>
      </Card>

      <UpdateRelationshipDialog
        handleClose={() => {
          handleCloseDialog(setOpenUpdate);
        }}
        open={openUpdate}
        id={id}
        firstTableId={firstTableId}
        secondTableId={secondTableId}
        firstTableCardinality={firstTableCardinality}
        secondTableCardinality={secondTableCardinality}
        relatedKeys={relatedKeys}
        tableId={tableId}
      />
      
      <ConfirmationDialog
        handleDelete={async () => {
          await handleDeleteRelationship(id, setTables);
        }}
        handleClose={() => {
          handleCloseDialog(setOpenDelete);
        }}
        open={openDelete}
        message='Tem certeza que deseja deletar esse relacionamento?'
        title={`${firstTableName} - ${secondTableName}`}
      />
    </>
  );
}