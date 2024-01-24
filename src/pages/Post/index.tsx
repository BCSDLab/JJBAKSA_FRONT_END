import { useNavigate, useParams } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { postReview } from 'api/review';
import { fetchShop } from 'api/shop';
import LoadingSpinner from 'components/common/LoadingSpinner';
import TextEditor from 'components/editor/TextEditor';
import { useReview } from 'store/review';
import makeToast from 'utils/ts/makeToast';

import styles from './Post.module.scss';

export default function Post() {
  const { name: placeId } = useParams();
  const { data } = useQuery({
    queryKey: ['shopDetail', placeId],
    queryFn: () => fetchShop(placeId as string),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const review = useReview();
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

  if (data) {
    return (
      <div className={styles.post}>
        <TextEditor shop={data?.data.name!} onSubmit={submitReview} />
      </div>
    );
  }
  return (
    <div className={styles.loading}>
      <LoadingSpinner size={200} />
    </div>
  );
}
