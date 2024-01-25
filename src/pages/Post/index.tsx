import { useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { postReview } from 'api/review';
import TextEditor from 'components/editor/TextEditor';
import useShop from 'pages/Post/hooks/useShop';
import { useReview } from 'store/review';
import makeToast from 'utils/ts/makeToast';

import styles from './Post.module.scss';

export default function Post() {
  const { placeId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const review = useReview();

  const { shopName } = useShop(placeId as string);

  const submitReview = () => {
    postReview({
      placeId: placeId as string,
      ...review,
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['reviewedShops'] });
      navigate('/');
      makeToast('success', '리뷰가 등록되었습니다.');
    }).catch(() => {
      makeToast('error', '에러가 발생했습니다.');
    });
  };

  return (
    <div className={styles.post}>
      <TextEditor shop={shopName || '가게 이름을 불러올 수 없습니다.'} onSubmit={submitReview} />
    </div>
  );
}
