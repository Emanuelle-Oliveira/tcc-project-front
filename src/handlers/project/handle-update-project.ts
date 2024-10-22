import {FormikHelpers} from 'formik';
import {Project} from '@/interfaces/Iproject';
import {createProject} from '@/services/project/project-service';
import React from 'react';

export async function handleCreateProject(
  values: { projectName: string; },
  actions: FormikHelpers<{ projectName: string }>,
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
) {
  createProject(values.projectName)
    .then((response) => {
      return response;
    })
    .then((data) => {
      setProjects(prevProjects => [...prevProjects, { ...data.data }]);
    });
  actions.resetForm();
}