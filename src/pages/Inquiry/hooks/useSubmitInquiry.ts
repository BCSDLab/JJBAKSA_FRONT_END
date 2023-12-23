import { useMutation } from '@tanstack/react-query';
import submitInquiry from 'api/inquiry/inquire';
import { SubmitInquiryProps } from 'api/inquiry/entity';
import { useNavigate } from 'react-router-dom';

const useSubmitInquiry = () => {
  const navigate = useNavigate();

  const { mutate: submit } = useMutation({
    mutationFn: (inquiryData: SubmitInquiryProps) => submitInquiry(inquiryData),
    onSuccess: () => {
      navigate('/inquiry/all');
      window.location.reload();
    },
  });

  return submit;
};

export default useSubmitInquiry;
