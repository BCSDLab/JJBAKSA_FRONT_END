import useMediaQuery from 'utils/hooks/useMediaQuery';
import FindIdPasswordMobile from 'pages/Auth/temp/hook/mobile';
import FindIdPasswordPC from 'pages/Auth/temp/hook/PC';
import { FindProp } from 'pages/Auth/temp/hook/entity';

export default function FindIdPassword({ type }: FindProp) {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? <FindIdPasswordMobile type={type} /> : <FindIdPasswordPC type={type} />}
    </div>
  );
}
