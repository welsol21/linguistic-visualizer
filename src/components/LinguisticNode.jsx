// src/components/LinguisticNode.jsx
import React, { useState, useRef, useEffect } from 'react';
import NodeBox from './NodeBox';

const SVGLine = ({ fromRef, toRef }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const update = () => {
      if (fromRef.current && toRef.current) {
        const from = fromRef.current.getBoundingClientRect();
        const to = toRef.current.getBoundingClientRect();
        const svgRect = document.getElementById('svg-root')?.getBoundingClientRect() || { left: 0, top: 0 };

        setCoords({
          x1: from.left + from.width / 2 - svgRect.left,
          y1: from.bottom - svgRect.top,
          x2: to.left + to.width / 2 - svgRect.left,
          y2: to.top - svgRect.top,
        });
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [fromRef, toRef]);

  if (!coords) return null;

  return (
    <line
      x1={coords.x1}
      y1={coords.y1}
      x2={coords.x2}
      y2={coords.y2}
      stroke="#999"
      strokeWidth="1.5"
    />
  );
};

const LinguisticNode = ({ node }) => {
  const thisRef = useRef(null);
  const childRefs = (node["linguistic elements"] || []).map(() => React.createRef());
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center relative z-10">
      <NodeBox node={node} ref={thisRef} onToggle={() => setExpanded((prev) => !prev)} expanded={expanded} />

      <svg id="svg-root" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {(node["linguistic elements"] || []).map((_, i) => (
          <SVGLine key={i} fromRef={thisRef} toRef={childRefs[i]} />
        ))}
      </svg>

      <div className="flex justify-center flex-wrap">
        {(node["linguistic elements"] || []).map((child, i) => (
          <div key={i} className="flex justify-center">
            <LinguisticNode node={child} ref={childRefs[i]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinguisticNode;
