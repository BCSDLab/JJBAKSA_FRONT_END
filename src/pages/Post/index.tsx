import TextEditor from 'components/editor/TextEditor';
import { useSearchParams } from 'react-router-dom';
import styles from './Post.module.scss';

export default function Post() {
  const [searchParams] = useSearchParams();
  // 쿼리가 shop인 값을 가져오는 함수
  const getShopname = () => {
    const shop = searchParams.get('shop');
    return shop;
  };
  return (
    <div className={styles.post}>
      <TextEditor shop="asda" getShopname={getShopname} />
    </div>
  );
}
