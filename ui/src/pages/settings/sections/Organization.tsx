import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ColorInput,
  Container,
  Divider,
  FileButton,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';

function FileSelect() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button variant="outline" size="xs" {...props}>
              Replace Logo
            </Button>
          )}
        </FileButton>
      </Group>

      {/* {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )} */}
    </>
  );
}

function settingLabel(label: string, description?: string) {
  return (
    <Stack gap={0} w={300}>
      <Text fz="sm" fw={600}>
        {label}
      </Text>
      {description && (
        <Text fz="xs" c="dimmed">
          {description}
        </Text>
      )}
    </Stack>
  );
}
const Organization = () => {
  return (
    <Box>
      <Stack gap={0} py="sm">
        <Text size="md" fw={600}>
          Appearance
        </Text>
        <Text size="xs" c="dimmed">
          Change how your dashboard looks and feels.
        </Text>
      </Stack>
      <Divider />
      <Stack my="lg">
        <Group gap="lg">
          {settingLabel('Company Logo', 'Update your company logo.')}
          <Group>
            <Avatar
              variant="filled"
              radius="md"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
            <FileSelect />
          </Group>
          <Button size="xs" variant="light" color="red">
            Remove
          </Button>
        </Group>
        <Divider />
        <Group>
          {settingLabel('Brand Color', ' Select or customize your brand color.')}
          <Group>
            <ColorInput format="hex" />
          </Group>
        </Group>
        <Divider />
        <Group gap="lg">
          {settingLabel('Interface Theme', 'Select or customize your UI theme.')}
          <Group>
            <Image
              radius="md"
              h={100}
              w={100}
              fit="contain"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
            <FileSelect />
          </Group>

          <Button variant="light" color="red">
            Remove
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default Organization;
