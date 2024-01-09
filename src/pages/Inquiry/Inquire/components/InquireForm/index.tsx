import {
  useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { InquiryImage, SubmitInquiry } from 'api/inquiry/entity';
import { ReactComponent as DeleteIcon } from 'assets/svg/inquiry/image-delete.svg';
import { ReactComponent as UploadIcon } from 'assets/svg/inquiry/image-upload.svg';
import ToggleButton from 'components/common/ToggleButton';
import useSubmitInquiry from 'pages/Inquiry/hooks/useSubmitInquiry';
import RequiredLabel from 'pages/Inquiry/Inquire/components/InquireForm/RequiredLabel';
import cn from 'utils/ts/classNames';
import makeToast from 'utils/ts/makeToast';

import styles from './InquireForm.module.scss';

const MAX_LENGTH = 500;

export default function InquireForm(): JSX.Element {
  const submit = useSubmitInquiry();
  const location = useLocation();

  const [inquiry, setInquiry] = useState<SubmitInquiry>({
    title: '',
    content: '',
    inquiryImages: [],
    isSecret: false,
  });

  const isAttached = inquiry.inquiryImages.length > 0;
  const isSubmissionReady = !!(inquiry.title.trim() && inquiry.content.trim());

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      const data: InquiryImage = {
        imageUrl: url,
        originalName: url, // 적당한 값
        path: url, // 적당한 값
      };

      if (inquiry.inquiryImages.length < 3) {
        setInquiry((prev) => (
          prev.inquiryImages
            ? { ...prev, inquiryImages: [...prev.inquiryImages, data] }
            : { ...prev, inquiryImages: [data] }
        ));
      }
    }
  };

  const handleDeleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.name, 10);
    setInquiry((prev) => ({
      ...prev,
      inquiryImages: prev.inquiryImages ? prev.inquiryImages.filter((_, i) => i !== index) : [],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmissionReady) {
      sessionStorage.removeItem('inquiryForm');
      submit(inquiry);
    } else {
      makeToast('error', '필수 항목을 기입해주세요.');
    }
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem('inquiryForm');
    if (savedData) {
      setInquiry(JSON.parse(savedData));
    }
  }, [location]);

  useEffect(() => {
    const debouncedSave = setTimeout(() => {
      sessionStorage.setItem('inquiryForm', JSON.stringify(inquiry));
    }, 1000);

    return () => clearTimeout(debouncedSave);
  }, [inquiry]);

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
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
            value={inquiry.title}
            onChange={(e) => setInquiry((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div className={styles.contents}>
          <RequiredLabel text="문의 내용" />
          <div className={styles.contents__length}>
            {`${inquiry.content.length}/${MAX_LENGTH}`}
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
            value={inquiry.content}
            onChange={(e) => setInquiry((prev) => ({ ...prev, content: e.target.value }))}
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
              {inquiry.inquiryImages.map((imageData, index) => (
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
                    onClick={handleDeleteImage}
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
            active={inquiry.isSecret}
            toggle={() => setInquiry((prev) => ({ ...prev, isSecret: !prev.isSecret }))}
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
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
