import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTableContext } from '@/hooks/table/table-context';
import {handleUpdateTable} from '@/handlers/table/handle-update-table';

interface UpdateTableProps {
  handleClose: () => void;
  open: boolean;
  id: number,
  tableName: string,
  tableAlias: string,
  projectId: number
}

type Error = {
  tableName?: string;
  tableAlias?: string;
};

export default function UpdateTableDialog ({ handleClose, open, id, tableName, tableAlias, projectId }: UpdateTableProps) {
  const { tables, setTables } = useTableContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          id: id,
          tableName: tableName,
          tableAlias: tableAlias,
          projectId: projectId
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.tableName) {
            errors.tableName = 'Nome é obrigatório';
          }
          if (!values.tableAlias) {
            errors.tableName = 'Apelido obrigatório';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          await handleUpdateTable(values, actions, setTables);
          handleClose();
        }}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    value={values.tableName}
                    label='Atualizar nome da tabela'
                    size='small'
                    variant='outlined'
                    sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}
                    onChange={(value) => {
                      setFieldValue('tableName', value.target.value);
                    }}
                    error={touched.tableName && !!errors.tableName}
                    helperText={touched.tableName && errors.tableName}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    value={values.tableAlias}
                    label='Atualizar apelido da tabela'
                    size='small'
                    variant='outlined'
                    sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}
                    onChange={(value) => {
                      setFieldValue('tableAlias', value.target.value);
                    }}
                    error={touched.tableAlias && !!errors.tableAlias}
                    helperText={touched.tableAlias && errors.tableAlias}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Salvar
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
}