import {useProjectContext} from '@/hooks/project/project-context';
import {Button, Dialog, DialogActions, DialogContent, TextField} from '@mui/material';
import {Formik} from 'formik';
import Box from '@mui/material/Box';
import {handleCreateProject} from '@/handlers/project/handle-create-project';

interface CreateProjectDialogProps {
  handleClose: () => void;
  open: boolean;
}

type Error = {
  projectName?: string;
};

export default function CreateProjectDialog({ handleClose, open }: CreateProjectDialogProps) {
  const { projects, setProjects } = useProjectContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <Formik
        initialValues={{
          projectName: ''
        }}
        validate={(values) => {
          const errors: Error = {};
          if (!values.projectName) {
            errors.projectName = 'Nome obrigatório';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          await handleCreateProject(values, actions, setProjects);
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
                    label='Nome do Projeto'
                    variant='outlined'
                    size='small'
                    value={values.projectName}
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