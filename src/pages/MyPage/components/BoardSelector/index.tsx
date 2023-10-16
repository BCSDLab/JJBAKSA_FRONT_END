import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './BoardSelector.module.scss';

type SelectorProps = {
  setBoard: (type:string)=>void,
  board: string
};

export default function BoardSelector({ setBoard, board }:SelectorProps) {
  const { isMobile } = useMediaQuery();
  return (
    <>
      <div className={styles.selector}>
        <button type="button" className={board === 'MYPOST' ? styles['selector__option--selected'] : styles.selector__option} onClick={() => setBoard('MYPOST')}>{isMobile ? '리뷰' : '내가 쓴 글'}</button>
        <button type="button" className={board === 'BOOKMARK' ? styles['selector__option--selected'] : styles.selector__option} onClick={() => setBoard('BOOKMARK')}>북마크</button>
      </div>
      <div className={styles.underline} />
    </>
  );
}
