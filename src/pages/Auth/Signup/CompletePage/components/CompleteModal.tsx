import AuthTitle from 'components/Auth/AuthTitle';
import AuthDetail from 'components/Auth/AuthDetail';
import styles from './CompleteModal.module.scss';

type Props = {
  setFalse:()=>void
};

export default function CompleteModal({ setFalse } : Props) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}>
          <button className={styles.modal__close} type="button">X</button>
        </div>
        <AuthTitle />
        <AuthDetail name="이메일 알맞게 입력하셨나요?" first="가입한 이메일로 링크를 보냈습니다!" second="새로운 링크로 들어와주세요." />
        <button className={styles.modal__button} type="submit" onClick={setFalse}>
          확인
        </button>

      </div>
    </div>
  );
}
