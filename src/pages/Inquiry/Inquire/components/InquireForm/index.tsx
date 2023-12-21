import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import { ReactComponent as UploadIcon } from 'assets/svg/inquiry/image-upload.svg';
import ToggleButton from 'components/common/ToggleButton';
import RequiredLabel from './components/RequiredLabel';
import styles from './InquireForm.module.scss';

export default function InquireForm(): JSX.Element {
  const [content, setContent] = useState('');
  const maxLength = 500;
  const [isSecret, , , toggle] = useBooleanState(false);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
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
          />
        </div>

        <div className={styles.contents}>
          <RequiredLabel text="문의 내용" />
          <div className={styles.contents__length}>
            {`${content.length}/${maxLength}`}
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
          <div className={styles.contents__attach}>
            <UploadIcon />
            <input
              className={styles['contents__upload-button']}
              type="file"
              accept="image/*"
              aria-label="이미지 업로드"
            />
            <div className={styles.contents__images}>a</div>
            <span className={styles.contents__description}>최대 3장 첨부 가능</span>
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
            className={styles.submit__button}
            type="submit"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
