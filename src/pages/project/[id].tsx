'use client';
import React, { useEffect } from 'react';
import {useRouter} from 'next/router';
import { useTableContext } from '@/hooks/table/table-context';
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/services/auth/hooks/useAxiosAuth';
import { getTableByProject } from '@/services/table/table-service';
import { Table } from '@/interfaces/Itable';

export default function ProjectPage() {
  const router = useRouter();
  const { tables, setTables } = useTableContext();
  const { data: session, status } = useSession();
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
      <p>
        Project: {projectId}
      </p>

      {tables.map((table) => (
        <p key={table.id}>
          {table.name}
        </p>
      ))}
    </>
  );
}