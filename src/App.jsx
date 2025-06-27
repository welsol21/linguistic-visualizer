import React from 'react';
import LinguisticNode from './components/LinguisticBlock';
import data from './data/sample.json';

function App() {
  const root = Object.values(data)[0]; // первый Sentence
  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-yellow-400 text-3xl font-bold text-center mb-6">Linguistic Visualizer</h1>
      <LinguisticNode node={root} />
    </div>
  );
}

export default App;
