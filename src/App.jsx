import React from 'react';
import LinguisticNode from './components/LinguisticNode';
import data from './data/sample.json';

export default function App() {
  const root = Object.values(data)[0];

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-10">
        Linguistic Visualizer
      </h1>
      <div className="flex justify-center">
        <LinguisticNode node={root} />
      </div>
    </div>
  );
}
