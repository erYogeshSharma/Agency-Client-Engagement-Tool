import React from 'react';
import { Title } from '@mantine/core';

const PageTitle = ({ children }: { children: string }) => {
  return <Title order={2}>{children}</Title>;
};

export default PageTitle;
