import React from 'react';
import { Flex, Text } from '@mantine/core';
import { Tag } from './TagSelector';

function RenderTag({ tags, value }: { value: number; tags: Tag[] }) {
  const tag = tags.find((tag) => tag.value === value);
  return (
    <Flex
      bg={tag?.color}
      p={2}
      px={5}
      justify="flex-start"
      align="center"
      style={{
        borderRadius: '2px',
      }}
      w={100}
    >
      {tag?.icon}
      <Text size="xs" fw={600} c="white">
        {tag?.label}
      </Text>
    </Flex>
  );
}

export default RenderTag;
