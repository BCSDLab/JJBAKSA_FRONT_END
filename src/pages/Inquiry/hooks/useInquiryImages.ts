import { InquiryImage, SubmitInquiry } from 'api/inquiry/entity';

export default function useInquiryImages(
  inquiry: SubmitInquiry,
  setInquiry: React.Dispatch<React.SetStateAction<SubmitInquiry>>,
) {
  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) return;

    const url = URL.createObjectURL(files[0]);
    const data: InquiryImage = {
      imageUrl: url,
      originalName: url,
      path: url,
    };

    if (inquiry.inquiryImages.length < 3) {
      setInquiry((prev) => ({
        ...prev,
        inquiryImages: [...prev.inquiryImages, data],
      }));
    }

    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const removeImage = (index: number) => {
    setInquiry((prev) => ({
      ...prev,
      inquiryImages: prev.inquiryImages.filter((_, i) => i !== index),
    }));
  };

  return {
    inquiryImages: inquiry.inquiryImages,
    addImage,
    removeImage,
  };
}
