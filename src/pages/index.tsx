import Login from '@/components/Login';
import {useSession} from 'next-auth/react';
import ProjectsPage from '@/pages/projects';

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
    return (
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
