import React, { useState, useRef, useEffect } from 'react';

// Цветовая схема
const partOfSpeechColors = {
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
  'Conjunction': '#228B22',
  'Modal Phrase': '#F7C948',
  'Verb Phrase': '#E9B949',
  'Noun Phrase': '#F4A259',
  'Prepositional Phrase': '#DFAF2B',
  'Adjective Phrase': '#F6AA64',
  'Adverbial Phrase': '#E6A141'
};

const NodeBox = ({ node }) => {
  const [showDetails, setShowDetails] = useState(false);
  const ref = useRef(null);

  const color = partOfSpeechColors[node.part_of_speech || node.phraseType || node.type] || '#ccc';

  return (
    <div ref={ref} className="flex flex-col items-center relative mx-2 my-4">
      <div
        className="px-2 py-1 rounded-lg text-white text-sm font-semibold"
        style={{ backgroundColor: color }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {node.part_of_speech || node.phraseType || node.type}
      </div>
      <div className="mt-1 text-white font-medium">{node.content}</div>

      {showDetails && (
        <>
          <div className="w-0.5 h-6 bg-gray-500 my-2" />
          <div className="bg-gray-900 text-white border border-gray-600 rounded-lg p-4 w-72 text-sm">
            {node.tense && <div><strong>Tense:</strong> {node.tense}</div>}
            {node.phonetic?.uk && <div><strong>Phonetic:</strong> {node.phonetic.uk}</div>}
            {node.linguistic_notes && (
              <div className="mt-1">
                <strong>Notes:</strong>
                <ul className="list-disc list-inside">
                  {node.linguistic_notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
            {node.translations && (
              <div className="mt-1">
                <strong>Translations:</strong>
                <ul className="list-disc list-inside">
                  {node.translations.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {node.cefr_level && <div><strong>CEFR:</strong> {node.cefr_level}</div>}
            {node.definitions?.length > 0 && (
              <div className="mt-1">
                <strong>Definition:</strong>
                <ul className="list-disc list-inside">
                  {node.definitions.map((d, i) => (
                    <li key={i}>{d.sense}</li>
                  ))}
                </ul>
              </div>
            )}
            {node.examples?.length > 0 && (
              <div className="mt-1">
                <strong>Examples:</strong>
                <ul className="list-disc list-inside">
                  {node.examples.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {node.synonyms?.length > 0 && (
              <div className="mt-1">
                <strong>Synonyms:</strong> {node.synonyms.join(', ')}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

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
          y2: to.top - svgRect.top
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
      stroke="#888"
      strokeWidth="1.5"
    />
  );
};

const LinguisticNode = ({ node }) => {
  const thisRef = useRef(null);
  const childRefs = (node["linguistic elements"] || []).map(() => React.createRef());

  return (
    <div className="flex flex-col items-center relative">
      <NodeBox node={node} ref={thisRef} />
      <div className="flex justify-center">
        {(node["linguistic elements"] || []).map((child, i) => (
          <div key={i} className="flex justify-center">
            <LinguisticNode node={child} />
          </div>
        ))}
      </div>
      <svg id="svg-root" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {(node["linguistic elements"] || []).map((_, i) => (
          <SVGLine
            key={i}
            fromRef={thisRef}
            toRef={childRefs[i]}
          />
        ))}
      </svg>
    </div>
  );
};

export default LinguisticNode;
