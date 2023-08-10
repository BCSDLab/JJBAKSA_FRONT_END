import TextEditor from 'components/editor/TextEditor';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useReview } from 'store/review';
import { postReview } from 'api/review';
import makeToast from 'utils/ts/makeToast';
import styles from './Post.module.scss';

export default function Post() {
  const { name: shopName } = useParams();
  const navigate = useNavigate();
  const { placeId } = useLocation().state as { placeId: string };
  const review = useReview();
  const submitReview = () => {
    postReview({
      placeId,
      ...review,
    }).then(() => {
      navigate('/');
      makeToast('success', '리뷰가 등록되었습니다.');
    });
  };

  return (
    <div className={styles.post}>
      <TextEditor shop={shopName!} onSubmit={submitReview} />
    </div>
  );
}
