import { useCallback, useEffect, useRef } from 'react';

const useObserver = (
  callback: () => void,
) => {
  const target = useRef<HTMLDivElement>(null);
  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    },
    [callback],
  );
  useEffect(() => {
    let observer:IntersectionObserver;
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return { target };
};

export default useObserver;
