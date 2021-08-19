import React, { useState } from 'react';

import Tabs from './components/Tabs';
import DataForm from './components/DataForm';

import './App.css';

function App() {
  const [data, setData] = useState<string>('');

  return (
    <div className="app">
      <Tabs defaultActiveKey="config">
        <Tabs.Tab title="Config" id="config">
          <DataForm initalData={data} onSubmit={setData} />
        </Tabs.Tab>
        <Tabs.Tab title="Result" id="result">Result</Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default App;
