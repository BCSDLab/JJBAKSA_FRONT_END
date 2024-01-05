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
  const loader = useRef<HTMLDivElement | null>(null);
  const [isLoaderObserved, setIsLoaderObserved] = useState(false);

  const [isGradientVisible, setIsGradientVisible] = useState(false);
  const gradient = useRef<HTMLDivElement | null>(null);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setAllContents([]);
    setInquiryProps((prev) => ({
      ...prev,
      dateCursor: null,
      idCursor: 0,
    }));
  }, [queryType]);

  useEffect(() => {
    refetch();
    if (data && data.content) {
      const newContents = data.content.filter((contentItem) =>
        !allContents.some((existingItem) => existingItem.id === contentItem.id));
      if (newContents.length > 0) {
        setAllContents((prevContents) => [...prevContents, ...newContents]);
      }
    }
  }, [data, inquiryProps]);

  const loadMore = () => {
    const lastContent = allContents[allContents.length - 1];
    const nextDataCursor = lastContent?.createdAt;
    const nextIdCursor = lastContent?.id;

    setInquiryProps((prev) => ({
      ...prev,
      dateCursor: nextDataCursor,
      idCursor: nextIdCursor,
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoaderObserved) {
        setIsLoaderObserved(true);
        loadMore();
      } else if (!target.isIntersecting && isLoaderObserved) {
        setIsLoaderObserved(false);
      }
    }, { threshold: 0.5 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  });

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
            {allContents.map((content) => (
              <div key={content.id}>
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
        <div ref={loader} className={styles['list__loader-observer']} />
      </div>
    </div>
  );
}
