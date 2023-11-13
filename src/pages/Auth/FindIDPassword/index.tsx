import useMediaQuery from 'utils/hooks/useMediaQuery';
import FindIdPasswordMobile from 'pages/Auth/FindIdPassword/mobile';
import FindIdPasswordPC from 'pages/Auth/FindIdPassword/PC';
import { FindProp } from 'pages/Auth/FindIdPassword/entity';

export default function FindIdPassword({ type }: FindProp) {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? <FindIdPasswordMobile type={type} /> : <FindIdPasswordPC type={type} />}
    </div>
  );
}
