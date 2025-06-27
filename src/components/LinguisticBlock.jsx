import React, { useState } from 'react';

const nodeColorMap = {
  'Sentence': '#FDF6E3',
  'Modal Phrase': '#F7C948',
  'Verb Phrase': '#E9B949',
  'Noun Phrase': '#F4A259',
  'Prepositional Phrase': '#DFAF2B',
  'Adjective Phrase': '#F6AA64',
  'Adverbial Phrase': '#E6A141',
  'Pronoun': '#6DBF4B',
  'Verb': '#3D9970',
  'Auxiliary Verb': '#4ECDC4',
  'Modal Verb': '#2ECC71',
  'Noun': '#A8D582',
  'Adjective': '#B2E672',
  'Adverb': '#ACE1AF',
  'Preposition': '#8FAF5A',
  'Determiner': '#567D46',
  'Article': '#567D46',
  'Conjunction': '#228B22'
};

const NodeCard = ({ node }) => {
  const [expanded, setExpanded] = useState(false);
  const color = nodeColorMap[node.part_of_speech || node.phraseType || node.type] || '#999';

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="rounded-lg shadow-md px-3 py-2 text-white text-xs text-center cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="font-semibold">{node.part_of_speech || node.phraseType || node.type}</div>
        <div className="text-sm">{node.content}</div>
      </div>

      {expanded && (
        <div className="absolute left-full top-0 ml-4 w-64 bg-neutral-800 text-white text-xs border border-gray-600 rounded-lg p-2 z-10">
          <div><span className="font-bold">Tense:</span> {node.tense}</div>
          <div><span className="font-bold">Phonetic:</span> {node.phonetic?.uk || '—'}</div>
          <div><span className="font-bold">Translation:</span>
            <ul className="list-disc list-inside">
              {(node.translations || []).map((tr, i) => <li key={i}>{tr}</li>)}
            </ul>
          </div>
          <div><span className="font-bold">Notes:</span>
            <ul className="list-disc list-inside">
              {(node.linguistic_notes || []).map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const renderEdges = (parentRef, childRefs) => {
  return childRefs.map((childRef, idx) => (
    <line
      key={idx}
      x1={parentRef.x + parentRef.width / 2}
      y1={parentRef.y + parentRef.height}
      x2={childRef.x + childRef.width / 2}
      y2={childRef.y}
      stroke="#aaa"
      strokeWidth="1.5"
    />
  ));
};

const GraphTree = ({ node }) => {
  const [childVisible, setChildVisible] = useState(true);
  const children = node["linguistic elements"] || [];

  return (
    <div className="flex flex-col items-center">
      <NodeCard node={node} />

      {children.length > 0 && (
        <>
          <button
            onClick={() => setChildVisible(!childVisible)}
            className="text-white text-xs my-1"
          >
            {childVisible ? 'Hide Children' : 'Show Children'}
          </button>

          {childVisible && (
            <div className="mt-2 flex justify-center gap-4 flex-wrap">
              {children.map((child, i) => (
                <GraphTree key={i} node={child} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GraphTree;
