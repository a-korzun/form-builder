import React, { useState, Children, useEffect, isValidElement } from 'react';

import Tab, { TabProps } from './Tab';

import './style.css';

interface Props {
  defaultActiveKey: string;
  onTabChange?: (id: string) => void;
}

type TabComponent = React.ReactElement<TabProps>;

const Tabs: React.FC<Props> & { Tab: typeof Tab } = ({ defaultActiveKey, onTabChange, children }) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultActiveKey);
  const [tabs, setTabs] = useState<TabProps[]>([])
  const [panes, setPanes] = useState<TabComponent[]>([])

  useEffect(() => {
    const childTabs = Children
      .toArray(children)
      .filter(el => isValidElement(el) && el.type === Tab) as TabComponent[];

    setTabs(childTabs.map(({ props }) => ({ title: props.title, id: props.id })));
    setPanes(childTabs);
    setActiveTabId(defaultActiveKey);
  }, [children, defaultActiveKey]);

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    onTabChange && onTabChange(id);
  }

  return (
    <div className="tabs">
      <ul className="tabs__list">
        { tabs.map(({ id, title }) => (
          <li key={id}>
            <button
              onClick={() => handleTabChange(id)}
              className={`tabs__button ${id === activeTabId ? '_active' : ''}`}
            >{title}</button>
          </li>
        ))}
      </ul>
      <div className="tabs__pane" data-testid="pane">
        {panes.find(pane => pane.props.id === activeTabId)}
      </div>
    </div>
  );
}

Tabs.Tab = Tab;

export default Tabs;