import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SubmitInquiry } from 'api/inquiry/entity';
import submitInquiry from 'api/inquiry/inquire';

const useSubmitInquiry = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: submit } = useMutation({
    mutationFn: (inquiryData: SubmitInquiry) => submitInquiry(inquiryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inquiry'],
      });

      navigate('/inquiry/all');
    },
  });

  return submit;
};

export default useSubmitInquiry;
