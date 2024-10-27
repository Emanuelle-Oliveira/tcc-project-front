import {useTableContext} from '@/hooks/table/table-context';
import {Button, Dialog, DialogActions, DialogContent, TextField} from '@mui/material';
import {Formik} from 'formik';
import Box from '@mui/material/Box';
import {handleCreateColumn} from '@/handlers/column/handle-create-column';

interface CreateColumnDialogProps {
  handleClose: () => void;
  open: boolean;
  tableId: number;
}

type Error = {
  name?: string;
  alias?: string;
  dataType?: string;
};

export default function CreateColumnDialog({ handleClose, open, tableId }: CreateColumnDialogProps) {
  const { tables, setTables } = useTableContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          name: '',
          alias: '',
          dataType: '',
          isForeignKey: false,
          isPrimaryKey: false,
          xtableId: tableId
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.name) {
            errors.name = 'Nome obrigatório';
          }
          if (!values.alias) {
            errors.alias = 'Apelido obrigatório';
          }
          if (!values.dataType) {
            errors.dataType = 'Tipo de dado obrigatório';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          await handleCreateColumn(values, actions, tables, setTables);
          handleClose();
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <TextField
                      sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                      label='Nome da Coluna'
                      variant='outlined'
                      size='small'
                      value={values.name}
                      onChange={(value) => {
                        setFieldValue('name', value.target.value);
                      }}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                      label='Apelido da Coluna'
                      variant='outlined'
                      size='small'
                      value={values.alias}
                      onChange={(value) => {
                        setFieldValue('alias', value.target.value);
                      }}
                      error={touched.alias && !!errors.alias}
                      helperText={touched.alias && errors.alias}
                    />
                  </Box>
                  <Box sx={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                    <TextField
                      select
                      label="Tipo do Dado"
                      value={values.dataType}
                      onChange={(value) => setFieldValue('dataType', value.target.value)}
                      sx={{ width: '500px' }}
                      error={touched.dataType && !!errors.dataType}
                      helperText={touched.dataType && errors.dataType}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="" disabled></option>
                      <option value="String">String</option>
                      <option value="Number">Number</option>
                      <option value="Date">Date</option>
                      <option value="DateTime">DateTime</option>
                      <option value="Boolean">Boolean</option>
                    </TextField>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '70px' }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={values.isForeignKey}
                        onChange={(e) => setFieldValue('isForeignKey', e.target.checked)}
                      />
                      Chave Estrangeira
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={values.isPrimaryKey}
                        onChange={(e) => setFieldValue('isPrimaryKey', e.target.checked)}
                      />
                      Chave Primária
                    </label>
                  </Box>
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