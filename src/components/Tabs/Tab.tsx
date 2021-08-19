import React from 'react';

export interface TabProps {
  title: string;
  id: string;
}

const Tab: React.FC<TabProps> = ({ title, id, children }) => {
  return (
    <div id={id} title={title}>
      { children }
    </div>
  )
}

export default Tab;
