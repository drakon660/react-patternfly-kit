import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { DownloadSampleCsvFile } from './DownloadSampleCsvFile';

const GeneralSettings: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">
      General Settings Page Title     </Title>
    <DownloadSampleCsvFile/>
  </PageSection>
);

export { GeneralSettings };
