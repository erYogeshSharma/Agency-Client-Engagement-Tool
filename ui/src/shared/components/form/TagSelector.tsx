import React, { JSX } from 'react';
import { Menu } from '@mantine/core';
import RenderTag from './RenderTag';

export type Tag = {
  value: number;
  color: string;
  label: string;
  icon: JSX.Element;
};
const TagSelector = ({
  value,
  onChange,
  tags,
}: {
  tags: Tag[];
  value: number;
  onChange: (value: Tag) => void;
}) => {
  return (
    <Menu>
      <Menu.Target>
        <div>
          <RenderTag tags={tags} value={value} />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        {tags.map((tag) => (
          <Menu.Item key={tag.value} onClick={() => onChange(tag)} p={0} py={4}>
            <RenderTag tags={tags} value={tag.value} />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TagSelector;
