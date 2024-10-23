import {Project} from '@/interfaces/Iproject';
import {  updateProject } from '@/services/project/project-service';
import React from 'react';
import { FormikHelpers } from 'formik';

export async function handleUpdateProject(
  id: number,
  projectName: string,
  actions: FormikHelpers<{
    projectName: string
  }>,
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
) {
  await updateProject(id, projectName)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setProjects((prevProjects) => prevProjects.map(project => {
        if (project.id === id) {
          return { ...project, name: data.data.name };
        }
        return project;
      }));
    });
  actions.resetForm();
}