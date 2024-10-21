import React from 'react';

import ProjectsPage from '@/app/projects/page';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import Login from '@/components/Login';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
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
