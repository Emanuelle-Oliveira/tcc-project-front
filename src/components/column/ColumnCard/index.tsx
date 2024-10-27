import { Card, CardContent, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTableContext} from '@/hooks/table/table-context';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import handleDeleteColumn from '@/handlers/column/handle-delete-column';
import UpdateColumnDialog from '../UpdateColumnDialog';

interface ColumnCardProps {
  id: number;
  name: string;
  alias: string;
  isForeignKey: boolean;
  isPrimaryKey: boolean;
  dataType: string;
  tableId: number;
}

export default function ColumnCard({
  id,
  name,
  alias,
  isForeignKey,
  isPrimaryKey,
  dataType,
  tableId
}: ColumnCardProps) {
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { tables, setTables } = useTableContext();

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
            {alias}
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

      <UpdateColumnDialog
        handleClose={() => {
          handleCloseDialog(setOpenUpdate);
        }}
        open={openUpdate}
        id={id}
        name={name}
        alias={alias}
        isForeignKey={isForeignKey}
        isPrimaryKey={isPrimaryKey}
        dataType={dataType}
        tableId={tableId}
      />
      
      <ConfirmationDialog
        handleDelete={async () => {
          await handleDeleteColumn(id, setTables);
        }}
        handleClose={() => {
          handleCloseDialog(setOpenDelete);
        }}
        open={openDelete}
        message='Tem certeza que deseja deletar essa coluna?'
        title={alias}
      />
    </>
  );
}