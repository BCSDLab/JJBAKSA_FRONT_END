import { useEffect, useRef, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 576px)';

export default function useMediaQuery() {
  const [matches, setMatches] = useState(() => window.matchMedia(MOBILE_MEDIA_QUERY).matches);
  const matchMediaRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    const matchMedia = window.matchMedia(MOBILE_MEDIA_QUERY);
    matchMediaRef.current = matchMedia;
    function handleChange() {
      setMatches(window.matchMedia(MOBILE_MEDIA_QUERY).matches);
    }
    handleChange();
    matchMediaRef?.current.addEventListener('change', handleChange);

    return () => {
      matchMediaRef.current?.removeEventListener('change', handleChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isMobile: matches };
}
