import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import useInquiryList from 'pages/Inquiry/Inquiry/hooks/useInquiryList';
import { InquiryContent } from 'api/inquiry/entity';
import styles from './DataTable.module.scss';

function ClampText({ text }: { text: string }): JSX.Element {
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > textRef.current.offsetHeight;
      setIsClamped(isOverflowing);
    }
  }, [text]);

  return (
    <div className={styles.block__title} ref={textRef}>
      {text}
      {isClamped && '...'}
    </div>
  );
}

export default function DataTable({ typePath }: { typePath: string }): JSX.Element {
  const [dateCursor, setDateCursor] = useState<string | null>(null);
  const [idCursor, setIdCursor] = useState<number>(0);
  const [allData, setAllData] = useState<InquiryContent[]>([]);
  const { data: inquiryData, isLoading, refetchInquiryData } = useInquiryList({
    typePath, dateCursor, idCursor, size: 10,
  });

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loader = useRef<HTMLDivElement | null>(null);

  /* eslint-disable */
  useEffect(() => { // all, my, search params 바뀔 때 allData 초기화
    setAllData([]);
    setDateCursor(null);
    setIdCursor(0);
    refetchInquiryData();
  }, [typePath]);
  /* eslint-enable */

  function toggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleExpand(id);
    }
  };

  const loadMoreData = useCallback(() => {
    if (inquiryData && inquiryData.content.length > 0) {
      setDateCursor(inquiryData.content[inquiryData.content.length - 1].createdAt || null);
      setIdCursor(inquiryData.content[inquiryData.content.length - 1].id || 0);
      refetchInquiryData();
      const b = allData[allData.length - 1] === inquiryData.content[inquiryData.content.length - 1];
      const value = b ? allData : [...allData, ...inquiryData.content];
      setAllData(value);
    }
  }, [refetchInquiryData, inquiryData, allData]);

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
    <div className={styles.table}>
      {allData && allData.length === 0 ? (
        <div className={styles['no-data']}>
          문의 내역이 없습니다.
        </div>
      ) : (
        allData && (
          allData.map((item) => (
            <div
              key={item.id}
              className={styles.block}
              onClick={() => toggleExpand(item.id)}
              onKeyPress={(e) => handleKeyPress(e, item.id)}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.block__body} ${expandedId === item.id ? styles.expanded : ''}`}>
                <p className={styles.block__title}>
                  <ClampText text={item.title} />
                </p>
                <span className={styles.block__info}>
                  {new Date(item.createdAt).toLocaleDateString()}
                  |
                  {item.createdBy}
                </span>
                <span className={styles['block__body--expander']}>
                  <Arrow style={{ transform: expandedId === item.id ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
                </span>

                {expandedId === item.id && (
                  <div className={styles.block__answerBox}>
                    {item.answer ? (
                      <p className={styles['block__answer-box--answer']}>
                        {item.answer}
                      </p>
                    ) : (
                      <p className={styles['block__answer-box--no-answer']}>
                        아직 답변이 없네요. 조금만 기다려주세요!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )
      )}
      <div ref={loader} className={styles.table__floor} />
    </div>
  );
}
