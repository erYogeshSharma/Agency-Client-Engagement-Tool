import React from 'react';
import { Title } from '@mantine/core';

const PageTitle = ({ children }: { children: string }) => {
  return (
    <Title order={3} fw={600}>
      {children}
    </Title>
  );
};

export default PageTitle;
