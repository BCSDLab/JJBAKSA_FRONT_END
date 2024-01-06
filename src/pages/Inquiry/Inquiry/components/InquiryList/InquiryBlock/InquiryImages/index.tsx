import { InquiryImage } from 'api/inquiry/entity';
import cn from 'utils/ts/classNames';

import styles from './InquiryImages.module.scss';

interface InquiryImagesProps {
  inquiryImages: InquiryImage[] | undefined;
}

export default function InquiryImages({ inquiryImages }: InquiryImagesProps) {
  return (
    <div className={cn({
      [styles.container]: true,
      [styles['container--empty']]: !inquiryImages,
    })}
    >
      {inquiryImages && inquiryImages.map((imageData, index) => (
        <div
          key={imageData.imageUrl}
          className={styles.wrapper}
        >
          <img
            className={styles.image}
            src={imageData.imageUrl}
            alt={`문의 이미지 ${index}`}
          />
        </div>
      ))}
    </div>
  );
}
