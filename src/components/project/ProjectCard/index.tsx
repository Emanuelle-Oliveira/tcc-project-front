import {Card, CardContent, IconButton} from '@mui/material';
import Typography from '@mui/material/Typography';
import theme from '@/styles/theme';
import Link from 'next/link';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import React from 'react';
import {useProjectContext} from '@/hooks/project/project-context';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import UpdateProjectDialog from '../UpdateProjectDialog';
import handleDeleteProject from '@/handlers/project/handle-delete-project';

interface ProjectCardProps {
  id: number;
  name: string;
  userId: number;
}

export default function ProjectCard({ id, name, userId } : ProjectCardProps) {
  const { projects, setProjects } = useProjectContext();
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);

  return (
    <>
      <Link href={`/project/${id}`} passHref  style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: 250,
            height: 150,
            boxShadow: 3,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.dark,
                mb: 2
              }}
              align={'center'}
            >
              {name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                size='small'
                onClick={(event) => {
                  event.preventDefault();
                  handleOpenDialog(setOpenUpdate);
                }}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.secondary.main,
                  },
                  mr: 1
                }}
              >
                <ModeEditIcon
                  fontSize='small'
                  sx={{
                    color: theme.palette.primary.light,
                    '&:hover': {
                      color: theme.palette.secondary.dark,
                    },
                  }}
                />
              </IconButton>
              <IconButton
                size='small'
                onClick={(event) => {
                  event.preventDefault();
                  handleOpenDialog(setOpenDelete);
                }}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.secondary.main,
                  },
                }}
              >
                <DeleteIcon 
                  fontSize='small' 
                  sx={{ 
                    color: theme.palette.primary.light, 
                    '&:hover': {
                      color: theme.palette.secondary.dark,
                    },
                  }}
                />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Link>

      <UpdateProjectDialog
        handleClose={() => {
          handleCloseDialog(setOpenUpdate);
        }}
        open={openUpdate}
        id={id}
        projectName={name}
      />

      <ConfirmationDialog
        handleDelete={async () => {
          await handleDeleteProject(id, setProjects);
        }}
        handleClose={() => {
          handleCloseDialog(setOpenDelete);
        }}
        open={openDelete}
        message='Tem certeza que deseja deletar esse projeto?'
        title={name}
      />
    </>
  );
}