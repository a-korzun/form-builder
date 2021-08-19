import React, { useState, ChangeEvent, FormEvent } from 'react';

import './style.css';

interface Props {
  initalData: string;
  onSubmit: (data: string) => void;
}

function DataForm({ initalData, onSubmit }: Props) {
  const [data, setData] = useState<string>(initalData);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  }

  const handleFormSublit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit(data);
  }

  return (
    <form onSubmit={handleFormSublit} className="data-form">
      <textarea
        className="data-from__input"
        value={data}
        onChange={handleInputChange}
      />
      <button type="submit">Apply</button>
    </form>
  );
}

export default DataForm;
