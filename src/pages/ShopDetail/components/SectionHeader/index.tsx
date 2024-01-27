import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './SectionHeader.module.scss';

interface Props {
  title: string;
  description: string;
  button?: {
    content: string;
    onClick: React.ReactEventHandler<HTMLButtonElement>;
  };
}

function SectionHeader({ title, description, button }: Props) {
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles['section-header']}>
      <div>
        <h2 className={styles['section-header__title']}>{title}</h2>
        <div className={styles['section-header__description']}>{description}</div>
      </div>
      {!isMobile && button && (
        <button className={styles['section-header__button']} type="button" onClick={button.onClick}>
          {button.content}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
