import * as React from 'react';
import { Button, PageSection, Title } from '@patternfly/react-core';
import { logoutUser } from '@app/features/auth/authSlice';
import { useAppDispatch } from '@app/store';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  
  const logout = () => {
    dispatch(logoutUser());  
  }

  return (<PageSection >     
    <Title headingLevel="h1" size="lg">Dashboard Page Title!</Title>
    <Button onClick={logout}>Logout</Button>
  </PageSection>);
}

export { Dashboard };
