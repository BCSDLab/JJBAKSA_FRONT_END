import useMediaQuery from 'utils/hooks/useMediaQuery';
import MobileSetting from './Mobile';
import PcSetting from './PC';

export default function Setting() {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? <MobileSetting /> : <PcSetting />}
    </div>
  );
}
