import React from "react";

// Цветовая карта для всех типов
const colorMap = {
  "sentence": "#FDF6E3",
  "modal phrase": "#F7C948",
  "verb phrase": "#E9B949",
  "noun phrase": "#F4A259",
  "prepositional phrase": "#DFAF2B",
  "adjective phrase": "#F6AA64",
  "adverbial phrase": "#E6A141",
  "pronoun": "#6DBF4B",
  "verb": "#3D9970",
  "auxiliary verb": "#4ECDC4",
  "modal verb": "#2ECC71",
  "noun": "#A8D582",
  "adjective": "#B2E672",
  "adverb": "#ACE1AF",
  "preposition": "#8FAF5A",
  "determiner": "#567D46",
  "article": "#567D46",
  "conjunction": "#228B22",
};

const NodeBox = React.forwardRef(({ node, onToggle, expanded }, ref) => {
  const label = node.part_of_speech || node.phraseType || node.type || "unknown";
  const color = colorMap[label.toLowerCase()] || "#cccccc";
  const children = node["linguistic elements"] || [];

  return (
    <div ref={ref} className="flex flex-col items-center relative mx-2 my-4">
      {/* Прямоугольник с меткой */}
      <div
        className="px-2 py-1 rounded-lg text-black text-sm font-semibold cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={onToggle}
      >
        {label}
      </div>

      {/* Подпись с подчёркиваниями по цветам дочерних элементов */}
      {children.length > 0 ? (
        <div className="text-white text-lg font-medium flex flex-wrap justify-center gap-[3px] mt-1">
          {children.map((child, i) => {
            const subLabel = child.part_of_speech || child.phraseType || child.type || "unknown";
            const subColor = colorMap[subLabel.toLowerCase()] || "#888";
            return (
              <span
                key={i}
                style={{
                  borderBottom: `3px solid ${subColor}`,
                  paddingBottom: "2px",
                }}
              >
                {child.content}
              </span>
            );
          })}
        </div>
      ) : (
        <div
          className="text-white text-lg font-medium mt-1"
          style={{
            borderBottom: `3px solid ${color}`,
            paddingBottom: "2px",
          }}
        >
          {node.content}
        </div>
      )}

      {/* Детальная карточка при раскрытии */}
      {expanded && (
        <div className="mt-3 bg-gray-900 text-white border border-gray-600 rounded-lg p-4 w-72 text-sm z-10">
          {node.tense && <div><strong>Tense:</strong> {node.tense}</div>}
          {node.phonetic?.uk && <div><strong>Phonetic:</strong> {node.phonetic.uk}</div>}

          {node.linguistic_notes?.length > 0 && (
            <div className="mt-1">
              <strong>Notes:</strong>
              <ul className="list-disc list-inside">
                {node.linguistic_notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          )}

          {node.translations?.length > 0 && (
            <div className="mt-1">
              <strong>Translations:</strong>
              <ul className="list-disc list-inside">
                {node.translations.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}

          {node.cefr_level && <div><strong>CEFR:</strong> {node.cefr_level}</div>}

          {node.definitions?.length > 0 && (
            <div className="mt-1">
              <strong>Definition:</strong>
              <ul className="list-disc list-inside">
                {node.definitions.map((d, i) => <li key={i}>{d.sense}</li>)}
              </ul>
            </div>
          )}

          {node.examples?.length > 0 && (
            <div className="mt-1">
              <strong>Examples:</strong>
              <ul className="list-disc list-inside">
                {node.examples.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          {node.synonyms?.length > 0 && (
            <div className="mt-1">
              <strong>Synonyms:</strong> {node.synonyms.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default NodeBox;
