import React from 'react';
import {deleteProject} from '@/services/project/project-service';
import {Project} from '@/interfaces/Iproject';

export default async function handleDeleteProject(id: number, setProjects: React.Dispatch<React.SetStateAction<Project[]>>) {
  await deleteProject(id)
    .then((response) => {
      return response;
    }).then((data) => {
      setProjects((prevProjects) => {
        return prevProjects
          .filter((project) => project.id !== data.data.id);
      });
    });
}