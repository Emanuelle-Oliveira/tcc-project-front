import React, { useEffect } from 'react';
import {useRouter} from 'next/router';
import { useTableContext } from '@/hooks/table/table-context';
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/services/auth/hooks/useAxiosAuth';
import { getTableByProject } from '@/services/table/table-service';
import { Table } from '@/interfaces/Itable';
import Navbar from '../../components/common/NavBar';
import {useProjectContext} from '@/hooks/project/project-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import theme from '@/styles/theme';
import handleOpenDialog from '@/handlers/dialog/handle-open-dialog';
import CreateProjectDialog from '@/components/project/CreateProjectDialog';
import handleCloseDialog from '@/handlers/dialog/handle-close-dialog';
import CreateTableDialog from '../../components/table/CreateTableDialog';
import {Grid} from '@mui/system';
import TableCard from '../../components/table/TableCard';
import CreateRelationshipDialog from '@/components/relationship/CreateRelationshipDialog';
import CreateQueryDialog from '@/components/query/CreateQueryDialog';

export default function ProjectPage() {
  const router = useRouter();
  const { tables, setTables } = useTableContext();
  const { data: session, status } = useSession();
  const [openCreateTable, setOpenCreateTable] = React.useState<boolean>(false);
  const [openCreateRelationship, setOpenCreateRelationship] = React.useState<boolean>(false);
  const [openCreateQuery, setOpenCreateQuery] = React.useState<boolean>(false);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '90vh' } }>
        <Box sx={{ flex: 1, padding: 2, overflowX: 'auto', height: '90vh'}}>
          <Grid container spacing={2} style={{ flexWrap: 'nowrap' }}>
            {tables.map((table) => (
              <Grid key={table.id} style={{ display: 'inline-flex', minWidth: '250px', maxWidth: '250px', alignSelf: 'flex-start', backgroundColor: theme.palette.background.paper }}>
                <TableCard
                  id={table.id}
                  tableName={table.name}
                  tableAlias={table.alias}
                  columns={table.xcolumns}
                  firstRelationships={table.firstRelationships}
                  secondRelationships={table.secondRelationships}
                  projectId={Number(projectId)}
                  />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px',
            bgcolor: 'background.paper',
            gap: 2,
            height: '90vh'
          }}
        >
          <Typography variant="h6" align={"left"} sx={{ mb: 2, fontWeight: 700}}>
            Projeto: {projectId}
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              fontSize: '12px',
              '&:hover': {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.dark,
            }}}
            onClick={() => {
              handleOpenDialog(setOpenCreateTable);
            }}
          >
            Adicionar Tabela
          </Button>

          <Button
            variant="contained"
            sx={{
              width: '100%',
              fontSize: '12px',
              '&:hover': {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
              }}}
            onClick={() => {
              handleOpenDialog(setOpenCreateRelationship);
            }}
          >
            Adicionar Relacionamento
          </Button>

          <Button
            variant="contained"
            sx={{
              width: '100%',
              fontSize: '12px',
              '&:hover': {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
              }}}
            onClick={() => {
              handleOpenDialog(setOpenCreateQuery);
            }}
          >
            Gerar Query
          </Button>

          <Button
            variant="contained"
            sx={{
              width: '100%',
              fontSize: '12px',
              '&:hover': {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
              }}}
          >
            Histórico de Queries
          </Button>
        </Box>
      </Box>

      <CreateTableDialog
        handleClose={() => {
          handleCloseDialog(setOpenCreateTable);
        }}
        open={openCreateTable}
        projectId={Number(projectId)}
      />

      <CreateRelationshipDialog
        handleClose={() => {
          handleCloseDialog(setOpenCreateRelationship);
        }}
        open={openCreateRelationship}
        projectId={Number(projectId)}
      />

      <CreateQueryDialog
        handleClose={() => {
          handleCloseDialog(setOpenCreateQuery);
        }}
        open={openCreateQuery}
      />
    </>
  );
}