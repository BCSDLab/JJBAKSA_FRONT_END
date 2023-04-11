import AuthTitle from 'components/Auth/AuthTitle';
import AuthDetail from 'components/Auth/AuthDetail';
import styles from '../Complete.module.scss';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CompleteModal({ setModalOpen }:Props) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}>
          <button className={styles.modal__close} type="button" onClick={closeModal}>X</button>
        </div>
        <AuthTitle />
        <AuthDetail name="이메일 알맞게 입력하셨나요?" first="가입한 이메일로 링크를 보냈습니다!" second="새로운 링크로 들어와주세요." />
        <button className={styles.modal__button} type="submit" onClick={closeModal}>
          확인
        </button>

      </div>
    </div>
  );
}
