import {FormikHelpers} from 'formik';
import {CreateRelationshipDto} from '@/interfaces/Irelationship';
import {createRelationship} from '@/services/relationship/relationship-service';

export async function handleCreateRelationship(
  values: CreateRelationshipDto,
  actions: FormikHelpers<CreateRelationshipDto>,
) {
  createRelationship(values)
    .then((response) => {
      return response;
    });
  actions.resetForm();
}