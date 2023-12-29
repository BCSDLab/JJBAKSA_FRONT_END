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
  content,
  expandedId,
  setExpandedId,
}: InquiryBlockProps): JSX.Element {
  const isExpanded = expandedId === content.id;

  function toggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }

  function handleKeyPress(e: React.KeyboardEvent, id: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleExpand(id);
    }
  }
  // console.log(content);
  // console.log(content.content);
  // 쩝박 백엔드 여쭤봐서 content.content 제대로 서버에서 주는 지 확인
  // 이미지 렌더링 css 작업

  // 비밀글 표시
  // 자신의 비밀글 + 비밀 아닌 글만 렌더링

  return (
    <button
      className={cn({
        [styles.block]: true,
        [styles['block--expanded']]: isExpanded,
      })}
      type="button"
      onClick={() => toggleExpand(content.id)}
      onKeyDown={(e) => handleKeyPress(e, content.id)}
    >
      <p className={styles.block__title}>
        {content.title}
      </p>
      <p
        className={cn({
          [styles.block__content]: true,
          [styles['block__content--visible']]: isExpanded,
        })}
      >
        {content.content}
      </p>

      <p className={styles.block__info}>
        {new Date(content.createdAt).toLocaleDateString()}
        |
        {content.createdBy}
      </p>

      <Arrow
        className={cn({
          [styles.block__expander]: true,
          [styles['block__expander--expanded']]: isExpanded,
        })}
      />

      {isExpanded && (
        <>
          <InquiryImages inquiryImages={content.inquiryImages} />
          <Answer text={content.answer} />
        </>
      )}
    </button>
  );
}
