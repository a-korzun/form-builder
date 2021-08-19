import React from 'react';

import Tabs from './components/Tabs';

import './App.css';

function App() {
  return (
    <div className="app">
      <Tabs defaultActiveKey="config">
        <Tabs.Tab title="Config" id="config">Config</Tabs.Tab>
        <Tabs.Tab title="Result" id="result">Result</Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default App;
