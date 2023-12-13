/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import useInquiryList from 'pages/Inquiry/Inquiry/hooks/useInquiryList';
import InquiryBlock from 'pages/Inquiry/Inquiry/components/InquiryList/components/InquiryBlock';
import { InquiryContent } from 'api/inquiry/entity';
import styles from './InquiryList.module.scss';

export default function InquiryList({
  className,
  typePath,
}: {
  className?: string;
  typePath: string;
}): JSX.Element {
  const [dateCursor, setDateCursor] = useState<string | null>(null);
  const [idCursor, setIdCursor] = useState<number>(0);
  const [allData, setAllData] = useState<InquiryContent[]>([]);
  const { data: inquiryData, isLoading } = useInquiryList({
    queryType: typePath, dateCursor, idCursor, size: 10,
  });

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => { // all, my, search params 바뀔 때 allData 초기화
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
    function handleObserver(entities: IntersectionObserverEntry[]) {
      const target = entities[0];
      if (target.isIntersecting && !isLoading) {
        loadMoreData();
      }
    }

    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [loadMoreData, isLoading]);

  return (
    <div className={className}>
      <div className={styles.list}>
        {allData && allData.length === 0 ? (
          <p className={styles['list--no-data']}>
            문의 내역이 없습니다.
          </p>
        ) : (
          allData.map((item) => (
            <InquiryBlock
              key={item.id}
              content={item}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            />
          ))
        )}
        <div ref={loader} className={styles.table__floor} />
      </div>
    </div>
  );
}
