import React from 'react';
import InquiryImages from 'pages/Inquiry/Inquiry/components/InquiryList/InquiryBlock/InquiryImages';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import { InquiryContent } from 'api/inquiry/entity';
import cn from 'utils/ts/classNames';
import Answer from './Answer';
import styles from './InquiryBlock.module.scss';

interface InquiryBlockProps {
  content: InquiryContent,
  expandedId: number | null,
  setExpandedId: (id: number | null) => void,
}

export default function InquiryBlock({
  content: inquiry,
  expandedId,
  setExpandedId,
}: InquiryBlockProps): JSX.Element {
  const isExpanded = expandedId === inquiry.id;

  function toggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }

  function handleKeyPress(e: React.KeyboardEvent, id: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleExpand(id);
    }
  }

  return (
    <button
      className={cn({
        [styles.block]: true,
        [styles['block--expanded']]: isExpanded,
      })}
      type="button"
      onClick={() => toggleExpand(inquiry.id)}
      onKeyDown={(e) => handleKeyPress(e, inquiry.id)}
    >
      <p className={styles.block__title}>
        {inquiry.title}
      </p>
      <p
        className={cn({
          [styles.block__content]: true,
          [styles['block__content--visible']]: isExpanded,
        })}
      >
        {inquiry.content}
      </p>

      <p className={styles.block__info}>
        {new Date(inquiry.createdAt).toLocaleDateString()}
        |
        {inquiry.createdBy}
      </p>

      <Arrow
        className={cn({
          [styles.block__expander]: true,
          [styles['block__expander--expanded']]: isExpanded,
        })}
      />

      {isExpanded && (
        <>
          <InquiryImages inquiryImages={inquiry.inquiryImages} />
          <Answer text={inquiry.answer} />
        </>
      )}
    </button>
  );
}
