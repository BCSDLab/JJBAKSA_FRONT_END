import styles from './TextEditor.module.scss';

function TextEditor(): JSX.Element {
  return (
    <div className={styles.template}>
      <div className={styles.editor__title}>
        <button type="button" className={styles.before__button}>{'<'}</button>
        <div className={styles.editor__shopname}>여기에 가게명</div>
        <div className={styles.starcontainer}>starContainer</div>
      </div>
      <div className={styles.editor__main}>에디터가 들어갈 공간</div>
      <div className={styles.editor__tools}>
        <div>
          <button type="button" className={styles.picture__button}>사진</button>
          <button type="button" className={styles.texttool__button}>T</button>
        </div>
        <button type="button" className={styles.save__button}>저장</button>
      </div>
    </div>
  );
}

export default TextEditor;
