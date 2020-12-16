import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';


// Reference https://www.rockyourcode.com/test-redirect-with-jest-react-router-and-react-testing-library/
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

// re-export everything
export * from '@testing-library/react';
// override render method and add
// Router wrapper for routes
export { renderWithRouter };