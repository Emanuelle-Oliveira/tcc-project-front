import { Card, CardContent, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { CSSProperties, useState } from 'react';
import Box from '@mui/material/Box';
import ConfirmationDialog from '../common/ConfirmationDialog';
import {Column} from '@/interfaces/Icolumn';
import {useTableContext} from '@/hooks/table/table-context';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateProjectDialog from '@/components/UpdateProjectDialog';
import UpdateTableDialog from '@/components/UpdateTableDialog';
import handleDeleteTable from '@/handlers/table/handle-delete-table';

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
  overflowY: 'auto',
};

export default function TableCard({ id, tableName, tableAlias, columns, projectId }: TableCardProps) {
  const { tables, setTables } = useTableContext();
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  //const [isEditing, setIsEditing] = useState(false);
  
  return (
    <>
      <Card style={cardStyle} variant='outlined' sx={{ borderRadius: '0px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            {/*{isEditing ? (*/}
            {/*  <UpdateTitle id={id} titleTable={titleTable} setTables={setTables} setIsEditing={setIsEditing} />*/}
            {/*) : (*/}
            <Typography
              sx={{ fontWeight: 600, fontSize: 13, color: '#706e6e', flexGrow: 1 }}
            >
              {tableAlias}
            </Typography>
            {/*)}*/}

            <IconButton
              size='small'
              onClick={() => {
                handleOpenDialog(setOpenUpdate);
              }}
              sx={{ alignSelf: 'self-start', marginRight: '5px' }}
            >
              <ModeEditIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                handleOpenDialog(setOpenDelete);
              }}
              sx={{ alignSelf: 'self-start', marginRight: '5px' }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Box>
              
          {/*{items?.map((item) => (*/}
          {/*  <ItemCard*/}
          {/*    key={item.id}*/}
          {/*    id={item.id}*/}
          {/*    titleItem={item.titleItem}*/}
          {/*    description={item.description}*/}
          {/*    startDate={item.startDate}*/}
          {/*    finalDate={item.finalDate}*/}
          {/*    order={item.order}*/}
          {/*    tableId={item.tableId}*/}
          {/*  />*/}
          {/*))}*/}
          {/*<AddItem*/}
          {/*  id={id}*/}
          {/*  order={order}*/}
          {/*/>*/}
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
    </>
  );
}