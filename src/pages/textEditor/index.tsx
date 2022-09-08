import styles from './TextEditor.module.scss';

function TextEditor(): JSX.Element {
  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <button type="button" className={styles.header__button}>{'<'}</button>
        <div className={styles.header__shopname}>여기에 가게명</div>
        <div className={styles['header__star-container']}>starContainer</div>
      </div>
      <div className={styles.editor}>에디터가 들어갈 공간</div>
      <div className={styles.item}>
        <div>
          <button type="button" className={styles.item__button}>사진</button>
          <button type="button" className={styles.item__button}>T</button>
        </div>
        <button type="button" className={styles.save__button}>저장</button>
      </div>
    </div>
  );
}

export default TextEditor;
