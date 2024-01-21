import { useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { postReview } from 'api/review';
import TextEditor from 'components/editor/TextEditor';
import { useReview } from 'store/review';
import makeToast from 'utils/ts/makeToast';

import styles from './Post.module.scss';

export default function Post() {
  const { name: shopName } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const review = useReview();
  const submitReview = () => {
    postReview({
      placeId: shopName as string,
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
      <TextEditor shop={shopName!} onSubmit={submitReview} />
    </div>
  );
}
