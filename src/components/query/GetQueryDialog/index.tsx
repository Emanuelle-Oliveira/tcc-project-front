import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, IconButton,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import {useEffect} from 'react';
import {getQueryByProject} from '@/services/query/query-service';
import {Query} from '@/interfaces/Iquery';
import {useQueryContext} from '@/hooks/query/query-context';
import {useSession} from 'next-auth/react';
import useAxiosAuth from '@/services/auth/hooks/useAxiosAuth';
import Typography from '@mui/material/Typography';
import theme from '@/styles/theme';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface GetQueryDialogProps {
  handleClose: () => void;
  open: boolean;
  projectId: number;
}

export default function GetQueryDialog({ handleClose, open, projectId }: GetQueryDialogProps) {
  const { queries, setQueries } = useQueryContext();
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (session) {
      getQueryByProject(Number(projectId))
        .then((response) => {
          return response;
        })
        .then((data) => {
          const receivedQueries: Query[] = [];
          for (let i = 0; i < data.length; i++) {
            const query: Query = {
              ...data[i],
            };
            receivedQueries.push(query);
          }
          setQueries(receivedQueries);
        });
    }
  }, [status]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md'>
      <DialogTitle align="center">
        <Typography
          fontWeight={700}
          color={theme.palette.primary.main}
        >
          Histórico de Consultas
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ width: '700px', maxHeight: '350px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '10px' }}>
                <Typography
                  fontSize={'14px'}
                  fontWeight={700}
                >
                Nome
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: '10px' }}>
                <Typography
                  fontSize={'14px'}
                  fontWeight={700}
                >
                Consulta
                </Typography>
              </TableCell>
              <TableCell sx={{ padding: '10px' }}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries.map((query) => (
              <TableRow key={query.id}>
                <TableCell sx={{ padding: '10px' }}>
                  <Typography fontSize={'12px'}>
                    {query.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: '10px' }}>
                  <Typography fontSize={'12px'}>
                    {query.query}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: '10px' }}>
                  <IconButton
                    onClick={() => handleCopy(query.query)}
                    size="small"
                    sx={{ marginLeft: '8px' }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}