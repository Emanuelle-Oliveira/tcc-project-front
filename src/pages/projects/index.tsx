import Box from '@mui/material/Box';
import theme from '@/styles/theme';
import Navbar from '../../components/common/NavBar';
import React, {useEffect} from 'react';
import Typography from '@mui/material/Typography';
import {Container, IconButton} from '@mui/material';
import {useProjectContext} from '@/hooks/project/project-context';
import {Project} from '@/interfaces/Iproject';
import {getAllProject} from '@/services/project/project-service';
import {Grid} from '@mui/system';
import ProjectCard from '@/components/project/ProjectCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import CreateProjectDialog from '@/components/project/CreateProjectDialog';
import {useSession} from 'next-auth/react';
import useAxiosAuth from '@/services/auth/hooks/useAxiosAuth';

export default function ProjectsPage() {
  const { projects, setProjects } = useProjectContext();
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (session) {
      getAllProject()
        .then((response) => {
          return response;
        })
        .then((data) => {
          const receivedProjects: Project[] = [];
          for (let i = 0; i < data.length; i++) {
            const project: Project = {
              ...data[i],
            };
            receivedProjects.push(project);
          }
          setProjects(receivedProjects);
        });
    }
  }, [status]);

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: theme.palette.primary.light }} marginLeft={20} marginRight={20}>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '10vh',
            p: 3
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              flexGrow: 1,
              textAlign: 'center'
            }}
          >
          Meus Projetos
          </Typography>

          <IconButton
            sx={{
              color: theme.palette.primary.main,
              marginLeft: 'auto'
            }}
            onClick={() => {
              handleOpenDialog(setOpenCreate);
            }}
          >
            <AddCircleIcon fontSize='large' sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Container>

        <Grid container spacing={2} justifyContent="flex-start">
          {projects.map((project) => (
            <Grid key={project.id} size={{ md: 3 }}>
              <ProjectCard
                id ={project.id}
                name={project.name}
                userId={project.userId}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <CreateProjectDialog
        handleClose={() => {
          handleCloseDialog(setOpenCreate);
        }}
        open={openCreate}
      />
    </>
  );
}
