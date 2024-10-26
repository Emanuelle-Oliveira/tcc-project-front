import type { AppProps } from 'next/app';
import {ProjectProvider} from '@/hooks/project/project-context';
import {ThemeProvider} from '@mui/material/styles';
import theme from '@/styles/theme';
import SessionGuard from '@/components/SessionGuard/SessionGuard';
import { Providers } from './api/auth/providers/Providers';
import {CssBaseline} from '@mui/material';
import {TableProvider} from '@/hooks/table/table-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProjectProvider>
      <TableProvider>
        <Providers>
          <SessionGuard>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </SessionGuard>
        </Providers>
      </TableProvider>
    </ProjectProvider>
  );
}
