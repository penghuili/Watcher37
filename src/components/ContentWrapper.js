import { PageContent } from 'grommet';
import React from 'react';

function ContentWrapper({ children }) {
  return (
      <PageContent align="start" margin="0 0 3rem">
        {children}
      </PageContent>
  );
}

export default ContentWrapper;
