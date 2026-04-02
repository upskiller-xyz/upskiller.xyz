import React from 'react';
import { MemberDetailType, MEMBER_DETAIL_LABELS } from '../../constants/member-details.enums';

interface MemberDetailItemProps {
  detailType: MemberDetailType;
  value: string;
}

const renderValue = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="primary-link">
          {match[1]}
        </a>
      );
    }
    return part;
  });
};

const MemberDetailItem: React.FC<MemberDetailItemProps> = ({ detailType, value }) => {
  const label = MEMBER_DETAIL_LABELS[detailType];

  return (
    <div>
      <span className="font-bold">{label}</span>{" "}
      <span className="font-light">{renderValue(value)}</span>
    </div>
  );
};

export default MemberDetailItem;