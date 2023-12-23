import submitInquiry from 'api/inquiry/inquire';
import { useMutation } from '@tanstack/react-query';
import { SubmitInquiryProps } from 'api/inquiry/entity';

const useSubmitInquiry = () => {
  const { mutate: submit } = useMutation({
    mutationFn: (inquiryData: SubmitInquiryProps) => submitInquiry(inquiryData),
  });

  return submit;
};

export default useSubmitInquiry;
