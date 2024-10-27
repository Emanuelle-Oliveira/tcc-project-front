import {useTableContext} from '@/hooks/table/table-context';
import {Button, Dialog, DialogActions, DialogContent, TextField} from '@mui/material';
import {Formik} from 'formik';
import Box from '@mui/material/Box';
import {handleCreateTable} from '@/handlers/table/handle-create-table';

interface CreateTableDialogProps {
  handleClose: () => void;
  open: boolean;
  projectId: number;
}

type Error = {
  tableName?: string;
  tableAlias?: string;
};

export default function CreateTableDialog({ handleClose, open, projectId }: CreateTableDialogProps) {
  const { tables, setTables } = useTableContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          tableName: '',
          tableAlias: '',
          projectId: projectId
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.tableName) {
            errors.tableName = 'Nome obrigatório';
          }
          if (!values.tableAlias) {
            errors.tableName = 'Apelido obrigatório';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          await handleCreateTable(values, actions, setTables);
          handleClose();
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}
                    label='Nome do Tabela'
                    variant='outlined'
                    size='small'
                    value={values.tableName}
                    onChange={(value) => {
                      setFieldValue('tableName', value.target.value);
                    }}
                    error={touched.tableName && !!errors.tableName}
                    helperText={touched.tableName && errors.tableName}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}
                    label='Apelido da Tabela'
                    variant='outlined'
                    size='small'
                    value={values.tableAlias}
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