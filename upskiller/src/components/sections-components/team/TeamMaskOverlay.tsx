import React from 'react';

interface TeamMask {
  id: string;
  name: string;
  polygonPoints: string;
}

interface TeamMaskOverlayProps {
  masks: TeamMask[];
  hoveredMember: string | null;
  onMouseEnter: (memberId: string) => void;
  onMouseLeave: () => void;
}

const TeamMaskOverlay: React.FC<TeamMaskOverlayProps> = ({ 
  masks, 
  hoveredMember, 
  onMouseEnter, 
  onMouseLeave 
}) => (
  <div className="absolute inset-0 pointer-events-none z-10">
    <svg
      className="w-full h-full pointer-events-none"
      viewBox="0 0 1408 736"
    >
      {masks.map((mask) => (
        <g key={mask.id}>
          {/* Clickable polygon area */}
          <polygon
            points={mask.polygonPoints}
            fill="transparent"
            stroke="none"
            className="pointer-events-auto cursor-pointer"
            onMouseEnter={() => onMouseEnter(mask.id)}
            onMouseLeave={onMouseLeave}
          />
          
          {/* Visual indicator on hover */}
          {hoveredMember === mask.id && (
            <polygon
              points={mask.polygonPoints}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="2"
              className="pointer-events-none team-mask-highlight"
            />
          )}
        </g>
      ))}
    </svg>
  </div>
);

export default TeamMaskOverlay;