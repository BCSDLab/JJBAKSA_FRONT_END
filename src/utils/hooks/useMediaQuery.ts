import { useEffect, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 576px)';

const useMediaQuery = () => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isMobile: window.matchMedia(MOBILE_MEDIA_QUERY).matches,
  });

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
      setState({ windowWidth: currentWindowWidth, isMobile });
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [state.windowWidth]);

  return state.isMobile;
};

export default useMediaQuery;
