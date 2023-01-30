import { PageContent } from 'grommet';
import React from 'react';

function ContentWrapper({ children }) {
  return (
      <PageContent align="start" as="main" pad="small" margin="0 0 3rem" responsive={false}>
        {children}
      </PageContent>
  );
}

export default ContentWrapper;
