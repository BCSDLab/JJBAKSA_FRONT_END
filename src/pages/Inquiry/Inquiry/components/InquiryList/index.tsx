/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import useGetInquiry from 'pages/Inquiry/hooks/useGetInquiry';
import InquiryBlock from 'pages/Inquiry/Inquiry/components/InquiryList/InquiryBlock';
import { InquiryContent, InquiryProps } from 'api/inquiry/entity';
import cn from 'utils/ts/classNames';
import styles from './InquiryList.module.scss';

const RENDER_SIZE = 10;

interface InquiryListProps {
  className: string;
  queryType: string;
}

export default function InquiryList({
  className,
  queryType,
}: InquiryListProps) {
  const [inquiryProps, setInquiryProps] = useState<InquiryProps>({
    queryType,
    dateCursor: null,
    idCursor: 0,
    size: RENDER_SIZE,
  });
  const { data, refetch } = useGetInquiry(inquiryProps);
  const [allContents, setAllContents] = useState<InquiryContent[] | []>([]);
  const [maxRendering, setMaxRendering] = useState<number>(0);
  const loader = useRef<HTMLDivElement | null>(null);

  const [isGradientVisible, setIsGradientVisible] = useState(false);
  const gradient = useRef<HTMLDivElement | null>(null);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setAllContents([]);
    setMaxRendering(0);
    refetch();
  }, [queryType]);

  useEffect(() => {
    if (data && maxRendering === 0) {
      setMaxRendering(data.totalElements);
      setAllContents(data.content);
    }
  }, [data]);

  const loadMore = () => {
    const lastContent = allContents[allContents.length - 1];
    const nextDataCursor = lastContent.createdAt;
    const nextIdCursor = lastContent.id;
    setInquiryProps((prev) => ({
      ...prev,
      dateCursor: nextDataCursor,
      idCursor: nextIdCursor,
    }));
    if (data && data.content) {
      const newData = data.content.filter((contentItem) =>
        !allContents.some((existingItem) => existingItem.id === contentItem.id));
      setAllContents((prevContents) => [...prevContents, ...newData]);
    }
  };

  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && allContents.length < maxRendering) {
        loadMore();
      }
    }, { threshold: 1.0 });

    observer.observe(loader.current);
  }, [allContents, loadMore, maxRendering]);

  useEffect(() => {
    if (!gradient.current) return;

    const gradientObserver = new IntersectionObserver((entries) => {
      const target = entries[0];
      setIsGradientVisible(!target.isIntersecting);
    }, { threshold: 1.0 });

    gradientObserver.observe(gradient.current);
  }, []);

  return (
    <div className={cn({
      [styles.container]: true,
      [className]: !!className,
    })}
    >
      {isGradientVisible ? <div className={styles.list__gradient} /> : null}
      <div className={styles.list}>
        <div ref={gradient} />
        {allContents.length !== 0 ? (
          <>
            {allContents.map((content, index) => (
              <div key={`${content.id}${content.createdAt}${content.title}`}>
                {index === allContents.length - 1 ? (
                  <div ref={loader} className={styles.list__floor} />
                ) : null}
                <InquiryBlock
                  content={content}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                />
              </div>
            ))}
          </>
        ) : (
          <p className={styles['list--no-data']}>
            문의 내역이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
