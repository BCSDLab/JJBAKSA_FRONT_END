import SuggestionItem from 'pages/Search/components/SuggestionItem';
import ToggleButton from 'pages/Search/components/ToggleButton';
import useFetchAutocomplete from 'pages/SearchDetails/hooks/useFetchAutocomplete';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './Suggestions.module.scss';

interface Props {
  className: string,
  text: string,
}

export default function Suggestions({ className, text }: Props) {
  const { isMobile } = useMediaQuery();
  const [isActive, , , toggle] = useBooleanState(false);

  const { shop } = useFetchAutocomplete(text ?? '');
  const safeAuto = shop ? shop.data.filter((e) => e.includes(e)) : [];

  return (
    <div className={className}>
      <div className={styles.container}>
        <div className={styles.autocomplete}>
          {!isMobile && (
            <div className={styles.autocomplete__box}>
              <ToggleButton
                className={styles['autocomplete__toggle-button']}
                isActive={isActive}
                onClick={toggle}
              />
              <div className={cn({
                [styles.autocomplete__title]: true,
                [styles['autocomplete__title--active']]: isActive,
              })}
              >
                자동 완성
              </div>
            </div>
          )}
        </div>
        <ul className={styles.suggestions}>
          {text.length > 0 && safeAuto.map((item) => (
            <li className={styles.suggestions__item}>
              <SuggestionItem item={item} key={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
