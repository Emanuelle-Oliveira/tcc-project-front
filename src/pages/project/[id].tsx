import React, { useEffect } from 'react';
import {useRouter} from 'next/router';
import { useTableContext } from '@/hooks/table/table-context';
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/services/auth/hooks/useAxiosAuth';
import { getTableByProject } from '@/services/table/table-service';
import { Table } from '@/interfaces/Itable';
import Navbar from '@/components/NavBar';
import {useProjectContext} from '@/hooks/project/project-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import theme from '@/styles/theme';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import CreateProjectDialog from '@/components/CreateProjectDialog';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import CreateTableDialog from '@/components/CreateTableDialog';

export default function ProjectPage() {
  const router = useRouter();
  const { tables, setTables } = useTableContext();
  const { data: session, status } = useSession();
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const axiosAuth = useAxiosAuth();
  const projectId = router.query.id;

  useEffect(() => {
    if (session) {
      getTableByProject(Number(projectId))
        .then((response) => {
          return response;
        })
        .then((data) => {
          const receivedTables: Table[] = [];
          for (let i = 0; i < data.length; i++) {
            const table: Table = {
              ...data[i],
            };
            receivedTables.push(table);
          }
          setTables(receivedTables);
        });
    }
  }, [status]);

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' } }>
        <Box sx={{ flex: 1, marginRight: 2, padding: 2 }}>
          {tables.map((table) => (
            <div key={table.id}>
              <h4>{table.name} - {table.alias}</h4>
              {table.xcolumns?.map((column) => (
                <p key={column.id}>
                  {column.name}: {column.alias}
                </p>
              ))}
            </div>
          ))}
        </Box>

        <Box
          sx={{
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            bgcolor: 'background.paper',
            gap: 2
          }}
        >
          <Typography variant="h6" align={"left"} sx={{ mb: 2, fontWeight: 700}}>
            Projeto: {projectId}
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              '&:hover': {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.dark,
            }}}
            onClick={() => {
              handleOpenDialog(setOpenCreate);
            }}
          >
            Adicionar Tabela
          </Button>

          <Button
            variant="contained"
            sx={{
              width: '100%',
              '&:hover': {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
              }}}
          >
            Gerar Query
          </Button>
        </Box>
      </Box>

      <CreateTableDialog
        handleClose={() => {
          handleCloseDialog(setOpenCreate);
        }}
        open={openCreate}
        projectId={Number(projectId)}
      />
    </>
  );
}