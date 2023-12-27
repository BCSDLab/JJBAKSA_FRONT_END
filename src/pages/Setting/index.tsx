import MobileSetting from 'pages/Setting/Mobile/index';
import PcSetting from 'pages/Setting/PC/index';
import useMediaQuery from 'utils/hooks/useMediaQuery';

export default function Setting() {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? <MobileSetting /> : <PcSetting />}
    </div>
  );
}
