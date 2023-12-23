/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import useInquiryList from 'pages/Inquiry/hooks/useInquiryList';
import InquiryBlock from 'pages/Inquiry/Inquiry/components/InquiryList/components/InquiryBlock';
import { InquiryContent } from 'api/inquiry/entity';
import cn from 'utils/ts/classNames';
import styles from './InquiryList.module.scss';

interface InquiryListProps {
  className: string;
  typePath: string;
}

export default function InquiryList({
  className,
  typePath,
}: InquiryListProps): JSX.Element {
  const [dateCursor, setDateCursor] = useState<string | null>(null);
  const [idCursor, setIdCursor] = useState<number>(0);
  const [allData, setAllData] = useState<InquiryContent[]>([]);
  const { data: inquiryData, isLoading } = useInquiryList({
    queryType: typePath, dateCursor, idCursor, size: 10,
  });

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loader = useRef<HTMLDivElement | null>(null);
  const [isGradientVisible, setIsGradientVisible] = useState(false);
  const gradient = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setAllData([]);
    setDateCursor(null);
    setIdCursor(0);
  }, [typePath]);

  const loadMoreData = useCallback(() => {
    if (inquiryData && inquiryData.content.length > 0) {
      setDateCursor(inquiryData.content[inquiryData.content.length - 1].createdAt || null);
      setIdCursor(inquiryData.content[inquiryData.content.length - 1].id || 0);
      const alreadyExist = allData.slice(-1) === inquiryData.content.slice(-1);
      setAllData(alreadyExist ? allData : [...allData, ...inquiryData.content]);
    }
  }, [inquiryData]);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !isLoading) {
        loadMoreData();
      }
    };

    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [loadMoreData, isLoading]);

  const handleGradientObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setIsGradientVisible(false);
    } else {
      setIsGradientVisible(true);
    }
  };

  useEffect(() => {
    const gradientObserver = new IntersectionObserver(handleGradientObserver, { threshold: 1.0 });
    if (gradient.current) {
      gradientObserver.observe(gradient.current);
    }

    return () => {
      if (gradient.current) {
        gradientObserver.unobserve(gradient.current);
      }
    };
  }, [isLoading]);

  return (
    <div className={cn({
      [styles.container]: true,
      [className]: !!className,
    })}
    >
      {isGradientVisible ? <div className={styles.list__gradient} /> : null}
      <div className={styles.list}>
        {allData && allData.length === 0 ? (
          <p className={styles['list--no-data']}>
            문의 내역이 없습니다.
          </p>
        ) : (
          <>
            <div ref={gradient} />
            {allData.map((item) => (
              <InquiryBlock
                key={item.id}
                content={item}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
              />
            ))}
          </>
        )}
        <div ref={loader} className={styles.table__floor} />
      </div>
    </div>
  );
}
