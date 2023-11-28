import useBooleanState from 'utils/hooks/useBooleanState';
import { Link } from 'react-router-dom';
import ToggleButton from 'components/common/ToggleButton';
import Explain from './components/Explain';
import styles from './Inquire.module.scss';

export default function Inquiry(): JSX.Element {
  const [a, , , toggle] = useBooleanState(false);

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
            <label htmlFor="inquiryTitle">
              <div className={styles.form__label}>
                제목
              </div>
              <input
                className={styles.form__title}
                name="inquiryTitle"
                type="text"
                required
                id="inquiryTitle"
                placeholder="제목을 작성해주세요."
              />
            </label>

            <label htmlFor="inquiryContent">
              <div className={styles.form__label}>
                문의 내용
              </div>
              <textarea
                className={styles.form__content}
                name="inquiryContent"
                required
                id="inquiryContent"
                rows={10}
                maxLength={500}
                placeholder="문의 내용을 작성해주세요."
              />
            </label>

            <div>
              <span className={styles.form__label}>
                비밀글 설정
              </span>
              <ToggleButton
                className={styles['form__toggle-button']}
                firstState={a}
                toggleFn={toggle}
              />
              <div>
                {a ? 'ㅁㅁ' : 'ㄹㄹㄹ'}비밀글을 나의 문의 내역에서만 볼 수 있어요.
              </div>
            </div>

            <div className={styles['form__submit-box']}>
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
