import { useFormContext } from 'react-hook-form';

import { SignUpFormData } from '../SignupPage/entity';

const useFirstErrorMessage = () => {
  const { formState: { errors } } = useFormContext<SignUpFormData>();

  const errorList = Object.values(errors);

  return errorList.length ? errorList[0].message : undefined;
};

export default useFirstErrorMessage;
