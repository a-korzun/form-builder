import React, { useState } from 'react';

import Tabs from './components/Tabs';
import DataForm from './components/DataForm';
import FormBuilder from './components/FormBuilder';

import './App.css';

const json = `{
  title: 'My Awesome Form',
  items: [
    {
      label: 'number',
      type: 'number',
      value: 42,
    },
    {
      label: 'text',
      type: 'text',
      value: 'Hello There',
    },
    {
      label: 'textarea',
      type: 'textarea',
      value: 'Lorem ipsum',
    },
    {
      label: 'checkbox',
      type: 'checkbox',
      value: 'bar',
      options: [
        { label: 'Foo', value: 'foo' },
        { label: 'Bar', value: 'bar' },
      ],
    },
    {
      label: 'date',
      type: 'date',
      value: '2007-09-03'
    },
    {
      label: 'radio',
      type: 'radio',
      name: 'FooBar',
      value: 'bar',
      options: [
        { label: 'Foo', value: 'foo' },
        { label: 'Bar', value: 'bar' },
      ],
    },
  ],
  buttons: [
    {
      type: 'button',
      label: 'Cancel',
    },
    {
      type: 'button',
      label: 'Ok',
    },
    {
      type: 'submit',
      label: 'Apply',
    },
  ]
}`;

function App() {
  const [data, setData] = useState<string>(json);

  return (
    <div className="app">
      <Tabs defaultActiveKey="config">
        <Tabs.Tab title="Config" id="config">
          <DataForm initalData={data} onSubmit={setData} />
        </Tabs.Tab>
        <Tabs.Tab title="Result" id="result">
          <FormBuilder data={data} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default App;
