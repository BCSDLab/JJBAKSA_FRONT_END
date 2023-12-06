import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import { Link } from 'react-router-dom';
import { ReactComponent as UploadIcon } from 'assets/svg/inquiry/image-upload.svg';
import ToggleButton from 'components/common/ToggleButton';
import Explain from './components/Explain';
import styles from './Inquire.module.scss';

export default function Inquire(): JSX.Element {
  const [content, setContent] = useState('');
  const maxLength = 500;
  const [isSecret, , , toggle] = useBooleanState(false);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles['inner-container']}>
        <div className={styles.menu}>
          <Link to="/inquiry/all" className={styles.menu__link}>
            <div className={styles['menu__title-text']}>
              문의하기
            </div>
          </Link>

          <Explain className={styles.menu__explain} />
        </div>

        <div className={styles['content-box']}>
          <form className={styles.form}>
            <div className={styles.form__title}>
              <div className={styles['form__label-group']}>
                <div className={styles.form__label}>
                  제목
                </div>
                <div className={styles['form__required-indicator']}>
                  <span className={styles.form__circle} />
                </div>
              </div>
              <input
                className={styles['form__title-input']}
                name="inquiryTitle"
                type="text"
                required
                id="inquiryTitle"
                maxLength={50}
                placeholder="제목을 작성해주세요."
              />
            </div>

            <div className={styles['form__content-header']}>
              <div className={styles['form__label-group']}>
                <div className={styles.form__label}>
                  문의 내용
                </div>
                <div className={styles['form__required-indicator']}>
                  <span className={styles.form__circle} />
                </div>
              </div>
              <div className={styles['form__content-length']}>
                {`${content.length}/${maxLength}`}
              </div>
            </div>
            <div className={styles['form__content-box']}>
              <textarea
                className={styles.form__content}
                name="inquiryContent"
                required
                id="inquiryContent"
                rows={10}
                maxLength={500}
                placeholder="문의 내용을 작성해주세요."
                value={content}
                onChange={handleContentChange}
              />
              <div className={styles.form__upload}>
                <UploadIcon />
                <input
                  className={styles['form__image-input']}
                  type="file"
                  accept="image/*"
                  aria-label="이미지 업로드"
                />
                <span className={styles['form__upload-description']}>최대 3장 첨부 가능</span>
              </div>
            </div>

            <div className={styles.form__secret}>
              <span className={styles.form__label}>
                비밀글 설정
              </span>
              <ToggleButton
                className={styles['form__toggle-button']}
                firstState={isSecret}
                toggleExternalState={toggle}
              />
            </div>
            <div className={styles['form__privacy-note']}>
              비밀글을 나의 문의 내역에서만 볼 수 있어요.
            </div>

            <div className={styles['form__submit-container']}>
              <button type="submit" className={styles.form__submit}>
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
