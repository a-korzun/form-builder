import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Tabs from '.';

describe('Tabs', () => {
  test('Tabs switching', () => {
    const { getByTestId, getByText } = render(
      <Tabs defaultActiveKey="config">
        <Tabs.Tab title="Config" id="config">
          First render of config
        </Tabs.Tab>
        <Tabs.Tab title="Result" id="result">
          There should be result
        </Tabs.Tab>
      </Tabs>
    );

    expect(getByTestId('pane').textContent).toBe('First render of config');

    fireEvent.click(getByText('Result'));

    expect(getByTestId('pane').textContent).toBe('There should be result');
  });
});