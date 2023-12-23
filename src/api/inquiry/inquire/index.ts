import { SubmitInquiryProps } from '../entity';
import inquiryApi from '../inquiryApiClient';

const submitInquiry = async (inquiryData: SubmitInquiryProps) => {
  try {
    const formData = new FormData();

    formData.append('title', inquiryData.title);
    formData.append('content', inquiryData.content);
    formData.append('isSecret', String(inquiryData.isSecret));

    if (inquiryData.inquiryImages) {
      inquiryData.inquiryImages.forEach((image) => {
        formData.append('inquiryImages', image);
      });
    }

    const response = await inquiryApi.post('/inquiry', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export default submitInquiry;
