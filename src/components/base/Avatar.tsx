import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface AvatarProps {
  status: boolean;
}

function Avatar({ status }: AvatarProps) {
  return (
    <svg width="40" height="32" className="mask" aria-hidden="true">
      <defs>
        <mask id="svg-mask-status" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
          <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
        </mask>
      </defs>
      <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)">
        <FaUserCircle size="32" />
      </foreignObject>
      <rect width="10" height="10" x="22" y="22" fill={status ? '#2bff00' : '#dc143c'} mask={`url(#svg-mask-status)`} />
    </svg>
  );
}

export default React.memo(Avatar);
