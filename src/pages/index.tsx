import Login from '@/components/Login';
import Typography from '@mui/material/Typography';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {useSession} from 'next-auth/react';
import ProjectsPage from '@/pages/projects';

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      // <Typography sx={{color: '#303034'}}>
      //   TESTE
      // </Typography>
      <ProjectsPage/>
    );
  } else {
    return (
      <div>
        <Login/>
      </div>
    );
  }
}
