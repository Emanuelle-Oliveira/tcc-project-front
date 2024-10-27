import {Button, Card, CardContent, IconButton, Typography} from '@mui/material';
import * as React from 'react';
import { CSSProperties, useState } from 'react';
import Box from '@mui/material/Box';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import {Column} from '@/interfaces/Icolumn';
import {useTableContext} from '@/hooks/table/table-context';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateTableDialog from '../UpdateTableDialog';
import handleDeleteTable from '@/handlers/table/handle-delete-table';
import ColumnCard from '../../column/ColumnCard';
import theme from '@/styles/theme';
import CreateColumnDialog from '../../column/CreateColumnDialog';

interface TableCardProps {
  id: number;
  tableName: string;
  tableAlias: string;
  columns?: Column[] | null;
  projectId: number
}

const cardStyle: CSSProperties = {
  width: '100%',
  maxHeight: 'calc(96vh - 96px)',
  overflowY: 'auto'
};

const cardContentStyle: CSSProperties = {
  padding: 0
};

export default function TableCard({ id, tableName, tableAlias, columns, projectId }: TableCardProps) {
  const { tables, setTables } = useTableContext();
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);

  return (
    <>
      <Card style={cardStyle} variant='outlined'>
        <CardContent style={cardContentStyle}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '15px',
              padding: '10px',
              bgcolor: theme.palette.primary.main
            }}>
            <Typography
              sx={{ fontWeight: 600, fontSize: 13, flexGrow: 1, color: theme.palette.primary.light }}
            >
              {tableAlias}
            </Typography>

            <IconButton
              size='small'
              onClick={() => {
                handleOpenDialog(setOpenUpdate);
              }}
              sx={{ alignSelf: 'self-start', marginRight: '5px', color: theme.palette.primary.light }}
            >
              <ModeEditIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                handleOpenDialog(setOpenDelete);
              }}
              sx={{ alignSelf: 'self-start', marginRight: '0px', color: theme.palette.primary.light  }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Box>

          {columns?.map((column) => (
            <ColumnCard
              key={column.id}
              id={column.id}
              name={column.name}
              alias={column.alias}
              isForeignKey={column.isForeignKey}
              isPrimaryKey={column.isPrimaryKey}
              dataType={column.dataType}
              tableId={column.xtableId}
            />
          ))}

          <Button
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.dark,
              width: '100%',
              borderRadius: '0px',
              fontSize: 10,
            }}
            onClick={() => {
              handleOpenDialog(setOpenCreate);
            }}
          >
            Adicionar Coluna
          </Button>
        </CardContent>
      </Card>

      <UpdateTableDialog
        handleClose={() => {
          handleCloseDialog(setOpenUpdate);
        }}
        open={openUpdate}
        id={id}
        tableName={tableName}
        tableAlias={tableAlias}
        projectId={Number(projectId)}
      />

      <ConfirmationDialog
        handleDelete={async () => {
          await handleDeleteTable(id, setTables);
        }}
        handleClose={() => {
          handleCloseDialog(setOpenDelete);
        }}
        open={openDelete}
        message='Tem certeza que deseja deletar essa tabela e suas colunas?'
        title={tableAlias}
      />

      <CreateColumnDialog
        handleClose={() => {
          handleCloseDialog(setOpenCreate);
        }}
        open={openCreate}
        tableId={id}
      />
    </>
  );
}