import { useState, useEffect } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import useSubmitInquiry from 'pages/Inquiry/hooks/useSubmitInquiry';
import cn from 'utils/ts/classNames';
import makeToast from 'utils/ts/makeToast';
import { ReactComponent as UploadIcon } from 'assets/svg/inquiry/image-upload.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/inquiry/image-delete.svg';
import ToggleButton from 'components/common/ToggleButton';
import { InquiryImage } from 'api/inquiry/entity';
import RequiredLabel from './RequiredLabel';
import styles from './InquireForm.module.scss';

export default function InquireForm(): JSX.Element {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const MAX_LENGTH = 500;
  const [inquiryImages, setInquiryImages] = useState<InquiryImage[]>([]);
  const [isSecret, , , toggle, setValue] = useBooleanState(false);
  const isAttached = inquiryImages.length > 0;

  const inquiryData = {
    title,
    content,
    inquiryImages,
    isSecret,
  };
  const submit = useSubmitInquiry();
  const isSubmissionReady = !!(inquiryData.title.trim() && inquiryData.content.trim());

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      const data: InquiryImage = {
        imageUrl: url,
        originalName: url, // 어떤 값을 넣어야 할까?
        path: url, // 어떤 값을 넣어야 할까?
      };

      console.log(data);
      console.log(data.imageUrl);
      if (inquiryImages.length < 3) {
        setInquiryImages((prevImages) => [...prevImages, data]);
      }
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.name, 10);
    setInquiryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleSave = () => {
      const currentData = {
        title, content, inquiryImages, isSecret,
      };
      sessionStorage.setItem('inquiryForm', JSON.stringify(currentData));
    };

    const debouncedSave = setTimeout(handleSave, 1000);

    return () => clearTimeout(debouncedSave);
  }, [title, content, inquiryImages, isSecret]);

  useEffect(() => {
    const savedData = sessionStorage.getItem('inquiryForm');
    if (savedData) {
      const {
        title: savedTitle,
        content: savedContent,
        inquiryImages: savedInquiryImages,
        isSecret: savedIsSecret,
      } = JSON.parse(savedData);

      setTitle(savedTitle || '');
      setContent(savedContent || '');
      setInquiryImages(Array.isArray(savedInquiryImages) ? savedInquiryImages : []);
      setValue(savedIsSecret);
    }
  }, [setValue]);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isSubmissionReady) {
      makeToast('error', '필수 항목을 기입해주세요.');
      return;
    }

    sessionStorage.removeItem('inquiryForm');
    console.log(inquiryData);
    submit(inquiryData);
    // 이미지 저장 방법
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.title}>
          <RequiredLabel text="제목" />
          <input
            className={styles.title__input}
            name="inquiryTitle"
            type="text"
            required
            id="inquiryTitle"
            maxLength={50}
            placeholder="제목을 작성해주세요."
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className={styles.contents}>
          <RequiredLabel text="문의 내용" />
          <div className={styles.contents__length}>
            {`${content.length}/${MAX_LENGTH}`}
          </div>
        </div>
        <div className={styles.contents__inputs}>
          <textarea
            className={styles.contents__textarea}
            name="inquiryContent"
            required
            id="inquiryContent"
            rows={10}
            maxLength={500}
            placeholder="문의 내용을 작성해주세요."
            value={content}
            onChange={handleContentChange}
          />
          <div className={cn({
            [styles.contents__attach]: true,
            [styles['contents__attach--attached']]: isAttached,
          })}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={styles['contents__upload-button']}
              htmlFor="upload"
            >
              <UploadIcon />
            </label>
            <input
              className={styles.contents__input}
              id="upload"
              type="file"
              accept="image/*"
              aria-label="이미지 업로드"
              onChange={handleUpload}
            />
            <div className={styles.contents__images}>
              {inquiryImages.map((imageData, index) => (
                <div className={styles['contents__image-box']} key={imageData.imageUrl}>
                  <img
                    className={styles.contents__image}
                    src={imageData.imageUrl}
                    alt={`문의 이미지${index}`}
                  />
                  <button
                    className={styles['contents__delete-button']}
                    type="button"
                    aria-label="delete"
                    name={`${index}`}
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
            {isAttached ? null : (
              <span className={styles.contents__description}>최대 3장 첨부 가능</span>
            )}
          </div>
        </div>

        <div className={styles.secret}>
          <span className={styles.secret__label}>
            비밀글 설정
          </span>
          <ToggleButton
            className={styles['secret__toggle-button']}
            active={isSecret}
            toggle={toggle}
          />
        </div>
        <div className={styles.secret__description}>
          비밀글을 나의 문의 내역에서만 볼 수 있어요.
        </div>

        <div className={styles.submit}>
          <button
            className={cn({
              [styles.submit__button]: true,
              [styles['submit__button--active']]: isSubmissionReady,
            })}
            type="submit"
            onClick={handleSubmit}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
