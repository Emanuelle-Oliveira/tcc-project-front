import {Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, TextField} from '@mui/material';
import {Formik} from 'formik';
import Box from '@mui/material/Box';
import {useTableContext} from '@/hooks/table/table-context';
import Typography from '@mui/material/Typography';
import theme from '@/styles/theme';
import DeleteIcon from '@mui/icons-material/Delete';
import {handleCreateRelationship} from '@/handlers/relationship/handle-create-relationship';

interface CreateRelationshipDialogProps {
  handleClose: () => void;
  open: boolean;
  projectId: number;
}

type Error = {
  firstTableId?: string;
  secondTableId?: string;
  firstTableCardinality?: string;
  secondTableCardinality?: string;
};

export default function CreateRelationshipDialog({ handleClose, open }: CreateRelationshipDialogProps) {
  const { tables, setTables } = useTableContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          firstTableId: null,
          secondTableId: null,
          firstTableCardinality: '',
          secondTableCardinality: '',
          relatedKeys: [{ firstColumnId: null, secondColumnId: null }]
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.firstTableId) {
            errors.firstTableId = '1ª tabela obrigatória';
          }
          if (!values.secondTableId) {
            errors.secondTableId = '2ª tabela obrigatória';
          }
          if (!values.firstTableCardinality) {
            errors.firstTableCardinality = 'Cardinalidade da 1ª tabela obrigatória';
          }
          if (!values.secondTableCardinality) {
            errors.secondTableCardinality = 'Cardinalidade da 2ª tabela obrigatória';
          }
          if (!values.firstTableCardinality) {
            errors.firstTableCardinality = 'Cardinalidade da 1ª tabela obrigatória';
          }
          if (!values.secondTableCardinality) {
            errors.secondTableCardinality = 'Cardinalidade da 2ª tabela obrigatória';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          await handleCreateRelationship(values, actions);
          handleClose();
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          const firstTableColumns = tables.find((table) => table.id === values.firstTableId)?.xcolumns?.filter(
            (column) => column.isPrimaryKey || column.isForeignKey
          ) || [];
          const secondTableColumns = tables.find((table) => table.id === values.secondTableId)?.xcolumns?.filter(
            (column) => column.isPrimaryKey || column.isForeignKey
          ) || [];

          const handleAddKeyPair = () => {
            setFieldValue('relatedKeys', [...values.relatedKeys, { firstColumnId: null, secondColumnId: null }]);
          };

          const handleRemoveKeyPair = (index: number) => {
            const updatedKeys = values.relatedKeys.filter((_, i) => i !== index);
            setFieldValue('relatedKeys', updatedKeys);
          };

          return (
            <>
              <DialogContent sx={{width: '585px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <TextField
                      select
                      label="1ª Tabela"
                      value={values.firstTableId}
                      onChange={(event) => setFieldValue('firstTableId', event.target.value)}
                      error={touched.firstTableId && !!errors.firstTableId}
                      helperText={touched.firstTableId && errors.firstTableId}
                      sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                      InputProps={{
                        sx: { fontSize: '12px' }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        sx: { backgroundColor: 'white', paddingX: '5px' }
                      }}
                    >
                      {tables.map((table) => (
                        <MenuItem key={table.id} value={table.id} sx={{fontSize: '12px'}}>
                          {table.alias}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="2ª Tabela"
                      value={values.secondTableId}
                      onChange={(event) => setFieldValue('secondTableId', event.target.value)}
                      error={touched.secondTableId && !!errors.secondTableId}
                      helperText={touched.secondTableId && errors.secondTableId}
                      sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                      InputProps={{ sx: { fontSize: '12px' } }}
                      InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                    >
                      {tables.map((table) => (
                        <MenuItem key={table.id} value={table.id} sx={{fontSize: '12px'}}>
                          {table.alias}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <TextField
                      select
                      label="Cardinalidade da 1ª Tabela"
                      value={values.firstTableCardinality}
                      onChange={(event) => setFieldValue('firstTableCardinality', event.target.value)}
                      error={touched.firstTableCardinality && !!errors.firstTableCardinality}
                      helperText={touched.firstTableCardinality && errors.firstTableCardinality}
                      sx={{ width: '245px', marginTop: '10px' }}
                      InputProps={{ sx: { fontSize: '12px' } }}
                      InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                    >
                      {['C01', 'C11', 'C1N', 'C0N'].map((option) => (
                        <MenuItem key={option} value={option} sx={{fontSize: '12px'}}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="Cardinalidade da 2ª Tabela"
                      value={values.secondTableCardinality}
                      onChange={(event) => setFieldValue('secondTableCardinality', event.target.value)}
                      error={touched.secondTableCardinality && !!errors.secondTableCardinality}
                      helperText={touched.secondTableCardinality && errors.secondTableCardinality}
                      sx={{ width: '245px', marginTop: '10px' }}
                      InputProps={{ sx: { fontSize: '12px' } }}
                      InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                    >
                      {['C01', 'C11', 'C1N', 'C0N'].map((option) => (
                        <MenuItem key={option} value={option} sx={{fontSize: '12px'}}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  {values.firstTableId && values.secondTableId && (
                    <>
                      <Typography variant="h6" sx={{ marginTop: '20px', fontSize: '14px', fontWeight: 700, alignSelf: 'center' }}>
                        Chaves Relacionadas
                      </Typography>
                      {values.relatedKeys.map((keyPair, index) => {
                        const selectedFirstTableKeys: number[] = values.relatedKeys
                          .map((pair) => pair.firstColumnId)
                          .filter((id) => id !== keyPair.firstColumnId);

                        const selectedSecondTableKeys : number[] = values.relatedKeys
                          .map((pair) => pair.secondColumnId)
                          .filter((id) => id !== keyPair.secondColumnId);

                        const availableFirstTableColumns = firstTableColumns.filter(
                          (column) => !selectedFirstTableKeys.includes(column.id)
                        );

                        const availableSecondTableColumns = secondTableColumns.filter(
                          (column) => !selectedSecondTableKeys.includes(column.id)
                        );

                        return (
                          <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                            <TextField
                              select
                              label="Chave da 1ª Tabela"
                              value={keyPair.firstColumnId || ''}
                              onChange={(event) => setFieldValue(`relatedKeys[${index}].firstColumnId`, event.target.value)}
                              sx={{ width: '245px', marginBottom: '10px' }}
                              InputProps={{ sx: { fontSize: '12px' } }}
                              InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                            >
                              {availableFirstTableColumns.map((column) => (
                                <MenuItem key={column.id} value={column.id} sx={{ fontSize: '12px' }}>
                                  {column.alias}
                                </MenuItem>
                              ))}
                            </TextField>

                            <TextField
                              select
                              label="Chave da 2ª Tabela"
                              value={keyPair.secondColumnId || ''}
                              onChange={(event) => setFieldValue(`relatedKeys[${index}].secondColumnId`, event.target.value)}
                              sx={{ width: '245px', marginBottom: '10px' }}
                              InputProps={{ sx: { fontSize: '12px' } }}
                              InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                            >
                              {availableSecondTableColumns.map((column) => (
                                <MenuItem key={column.id} value={column.id} sx={{ fontSize: '12px' }}>
                                  {column.alias}
                                </MenuItem>
                              ))}
                            </TextField>

                            {index > 0 && (
                              <IconButton onClick={() => handleRemoveKeyPair(index)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        );
                      })}
                      <Button
                        onClick={handleAddKeyPair}
                        sx={{
                          marginTop: '10px',
                          alignSelf: 'center',
                          fontSize: '12px',
                          bgcolor: theme.palette.secondary.main,
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Adicionar Novas Chaves
                      </Button>
                    </>
                  )}
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