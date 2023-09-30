import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import useInquiryList from 'pages/Inquiry/hooks/useInquiryList';
import { InquiryContent } from 'api/inquiry/entity';
import styles from './DataTable.module.scss';

export default function DataTable(): JSX.Element {
  const [dateCursor, setDateCursor] = useState<string | null>(null);
  const [idCursor, setIdCursor] = useState<number>(0);
  const { data: inquiryData, isLoading } = useInquiryList(dateCursor, idCursor, 10);
  const [allData, setAllData] = useState<InquiryContent[]>(
    inquiryData ? [...inquiryData.content] : [],
  );

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  const noDataTitle = '문의 내역이 없습니다.';
  const noAnswerTitle = '아직 답변이 없네요. 조금만 기다려주세요!';

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setExpandedId(expandedId === id ? null : id);
    }
  };

  const loadMoreData = useCallback(() => {
    if (inquiryData && inquiryData.content.length > 0) {
      const b = allData[allData.length - 1] === inquiryData.content[inquiryData.content.length - 1];
      const value = b ? allData : [...allData, ...inquiryData.content];
      setDateCursor(inquiryData.content[inquiryData.content.length - 1].createdAt || null);
      setIdCursor(inquiryData.content[inquiryData.content.length - 1].id || 0);
      setAllData(value);
    }
  }, [inquiryData, allData]);

  useEffect(() => {
    function handleObserver(entities: IntersectionObserverEntry[]) {
      const target = entities[0];
      if (target.isIntersecting && !isLoading) {
        loadMoreData();
      }
    }

    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [loadMoreData, isLoading]);

  return (
    <div className={styles.table}>
      {allData && allData.length === 0 ? (
        <div className={styles.noData}>
          {noDataTitle}
        </div>
      ) : (
        allData && (
          allData.map((item) => (
            <div
              key={item.id}
              className={styles.block}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              onKeyPress={(e) => handleKeyPress(e, item.id)}
              role="button"
              tabIndex={0}
            >
              <div className={`${styles.block__body} ${expandedId === item.id ? styles.expanded : ''}`}>
                <p className={styles.block__title}>
                  {item.title}
                </p>
                <span className={styles.block__info}>
                  {new Date(item.createdAt).toLocaleDateString()}
                  |
                  {item.createdBy}
                </span>
                <span className={styles['block__body-extender']}>
                  <Arrow style={{ transform: expandedId === item.id ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
                </span>

                {expandedId === item.id && (
                  <div className={styles.block__answerBox}>
                    {item.answer ? (
                      <p className={styles['block__answerBox-answer']}>
                        {item.answer}
                      </p>
                    ) : (
                      <p className={styles['block__answerBox-noAnswer']}>
                        {noAnswerTitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )
      )}
      <div ref={loader} />
    </div>
  );
}
