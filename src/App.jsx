// src/App.jsx
import React from 'react';
import './index.css';
import Block from './components/LinguisticBlock';
import jsonData from './data/sample.json';

export default function App() {
  const rootSentenceKey = Object.keys(jsonData)[0];
  const rootNode = jsonData[rootSentenceKey];

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">Linguistic Visualizer</h1>
      <div className="flex justify-center">
        <Block node={rootNode} />
      </div>
    </div>
  );
}
