import {Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, TextField} from '@mui/material';
import {Formik} from 'formik';
import Box from '@mui/material/Box';
import {useTableContext} from '@/hooks/table/table-context';
import Typography from '@mui/material/Typography';
import theme from '@/styles/theme';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from 'react';
import {handleCreateQuery} from '@/handlers/query/handle-create-query';
import {SelectedTable} from '@/interfaces/Iselectedtable';

interface CreateQueryDialogProps {
  handleClose: () => void;
  open: boolean;
}

type Error = {
  name?: string;
  dbType?: string;
};

export default function CreateQueryDialog({ handleClose, open }: CreateQueryDialogProps) {
  const { tables, setTables } = useTableContext();
  const [selectedTables, setSelectedTables] = useState<SelectedTable[]>([{ tableId: null, columns: [] }]);

  useEffect(() => {
    if (open) {
      setSelectedTables([{ tableId: null, columns: [] }]);
    }
  }, [open]);

  const handleAddTable = () => {
    setSelectedTables([...selectedTables, { tableId: null, columns: [] }]);
  };

  const handleTableChange = (index: number, value: number) => {
    const newSelectedTables = [...selectedTables];
    newSelectedTables[index].tableId = value;
    newSelectedTables[index].columns = [];
    setSelectedTables(newSelectedTables);
  };

  const handleColumnChange = (index: number, columnId: number) => {
    const newSelectedTables = [...selectedTables];
    if (!newSelectedTables[index].columns.includes(columnId)) {
      newSelectedTables[index].columns = [...newSelectedTables[index].columns, columnId];
    }
    setSelectedTables(newSelectedTables);
  };

  const handleSave = () => {
    const filteredTables = selectedTables
      .filter(table => table.tableId !== null)
      .map(table => ({
        tableId: table.tableId,
        columns: table.columns.filter(columnId => columnId !== null)
      }));
    setSelectedTables(filteredTables);
    handleClose();
  };

  const handleRemove = (index: number) => {
    const newSelectedTables = [...selectedTables];
    newSelectedTables.splice(index, 1);
    setSelectedTables(newSelectedTables);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          name: '',
          dbType: 'SqlServer',
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.name) {
            errors.name = 'Nome obrigatório';
          }
          if (!values.dbType) {
            errors.dbType = 'Tipo de BD obrigatório';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          handleSave();
          await handleCreateQuery(values, actions, selectedTables);
          handleClose();
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent sx={{width: '585px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <TextField
                      label="Nome da Query"
                      value={values.name}
                      onChange={(event) => setFieldValue('name', event.target.value)}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                      InputProps={{
                        sx: { fontSize: '12px' }
                      }}
                      InputLabelProps={{
                        sx: { backgroundColor: 'white', paddingX: '5px' }
                      }}
                    />

                    <TextField
                      select
                      label="Tipo do BD"
                      value={values.dbType}
                      onChange={(event) => setFieldValue('dbType', event.target.value)}
                      error={touched.dbType && !!errors.dbType}
                      helperText={touched.dbType && errors.dbType}
                      sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                      InputProps={{ sx: { fontSize: '12px' } }}
                      InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                      disabled
                    >
                      <MenuItem key={1} value={'SqlServer'} sx={{fontSize: '12px'}}>
                        Sql Server
                      </MenuItem>
                    </TextField>
                  </Box>

                  <Typography variant="h6" sx={{ marginTop: '10px', marginBottom: '10px', fontSize: '14px', fontWeight: 700, alignSelf: 'center' }}>
                    Campos Retornados na Consulta
                  </Typography>

                  {selectedTables.map((table, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                      <TextField
                        select
                        label="Tabela"
                        value={table.tableId || ''}
                        onChange={(event) => handleTableChange(index, Number(event.target.value))}
                        sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                        InputProps={{
                          sx: { fontSize: '12px' }
                        }}
                        InputLabelProps={{
                          shrink: true,
                          sx: { backgroundColor: 'white', paddingX: '5px' }
                        }}
                      >
                        {tables.map((tableOption) => (
                          <MenuItem key={tableOption.id} value={tableOption.id} sx={{fontSize: '12px'}}>
                            {tableOption.alias}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        select
                        label="Campo"
                        onChange={(event) => handleColumnChange(index, Number(event.target.value))}
                        sx={{ width: '245px', marginBottom: '10px', marginTop: '10px' }}
                        InputProps={{ sx: { fontSize: '12px' } }}
                        InputLabelProps={{ shrink: true, sx: { backgroundColor: 'white', paddingX: '5px' }}}
                      >
                        {table.tableId &&
                          tables.find(t => t.id === table.tableId)?.xcolumns?.map((column) => (
                            <MenuItem key={column.id} value={column.id} sx={{fontSize: '12px'}}>
                              {column.alias}
                            </MenuItem>
                          ))}
                        {table.tableId && 
                          <MenuItem key={0} value={0} sx={{fontSize: '12px'}}>
                          Todos
                          </MenuItem>
                        }
                      </TextField>

                      {index > 0 && (
                        <IconButton
                          onClick={() => handleRemove(index)}
                          size="small"
                          aria-label="Remover Campo"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  ))}

                  <Button
                    onClick={handleAddTable}
                    sx={{
                      marginTop: '10px',
                      alignSelf: 'center',
                      fontSize: '12px',
                      bgcolor: theme.palette.secondary.main,
                      color: theme.palette.primary.dark,
                    }}
                  >
                    Adicionar Novo Campo
                  </Button>
                </Box>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Gerar Query
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
}