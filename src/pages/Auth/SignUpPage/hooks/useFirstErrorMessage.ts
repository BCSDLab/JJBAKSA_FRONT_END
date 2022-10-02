import { useFormContext } from 'react-hook-form';
import { SignUpFormData } from '../signUpPage/entity';

export default function useFirstErrorMessage() {
  const { formState: { errors } } = useFormContext<SignUpFormData>();

  const errorList = Object.values(errors);

  return errorList[0]?.message;
}
