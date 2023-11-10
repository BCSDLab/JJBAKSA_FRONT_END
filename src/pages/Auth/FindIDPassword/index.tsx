import useMediaQuery from 'utils/hooks/useMediaQuery';
import FindIdPasswordMobile from './mobile';
import FindIdPasswordPC from './PC';
import { FindProp } from './entity';

export default function FindIDPassword({ type }: FindProp) {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? <FindIdPasswordMobile type={type} /> : <FindIdPasswordPC type={type} />}
    </div>
  );
}
