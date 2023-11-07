import styles from './SectionHeader.module.scss';

interface Props {
  title: string;
  description: string;
  button?: {
    name: string;
    handler: React.ReactEventHandler<HTMLButtonElement>;
  };
}

function SectionHeader({ title, description, button }: Props) {
  return (
    <div className={styles['section-header']}>
      <div>
        <h2>{title}</h2>
        <div>{description}</div>
      </div>
      {button && (
        <button type="button" onClick={button.handler}>
          {button.name}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
