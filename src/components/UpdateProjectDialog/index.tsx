import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as React from 'react';
import { handleUpdateProject } from '@/handlers/project/handle-update-project';
import Box from '@mui/material/Box';
import { useProjectContext } from '@/hooks/project/project-context';

interface UpdateProjectProps {
  handleClose: () => void;
  open: boolean;
  id: number,
  projectName: string,
}

type Error = {
  projectName?: string;
};

export default function UpdateProjectDialog ({ handleClose, open, id, projectName }: UpdateProjectProps) {
  const { projects, setProjects } = useProjectContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{ projectName: projectName }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.projectName) {
            errors.projectName = 'Nome é obrigatório';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          await handleUpdateProject(id, values.projectName, actions, setProjects);
          handleClose();
        }}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <TextField
                    value={values.projectName}
                    label='Atualizar nome do projeto'
                    size='small'
                    variant='outlined'
                    sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}
                    onChange={(value) => {
                      setFieldValue('projectName', value.target.value);
                    }}
                    error={touched.projectName && !!errors.projectName}
                    helperText={touched.projectName && errors.projectName}
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