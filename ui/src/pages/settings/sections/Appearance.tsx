import React, { useState } from 'react';
import { IconCircleFilled } from '@tabler/icons-react';
import {
  Avatar,
  Box,
  Button,
  ColorInput,
  Divider,
  FileButton,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';

function FileSelect() {
  const [file, setFile] = useState<File | null>(null);
  const theme = useMantineTheme();
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

function SettingWithLabel({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Group gap="lg">
      {settingLabel(label, description)}
      {children}
    </Group>
  );
}
const Appearance = () => {
  const [form, setForm] = useState();
  const theme = useMantineTheme();

  function renderSelectColor() {
    return (
      <Group gap={5}>
        {['orange', 'green', 'indigo', 'grape', 'violet'].map((color) => (
          <IconCircleFilled
            onClick={() => setForm({ ...form, brandColor: color })}
            size={30}
            color={theme.colors[color][5]}
            style={{
              cursor: 'pointer',
              borderRadius: '50%',
              border: form?.brandColor === color ? `2px solid ${theme.colors[color][5]}` : 'none',
            }}
          />
        ))}
      </Group>
    );
  }
  return (
    <Box>
      <Group justify="space-between" align="center">
        <Stack gap={0} py="sm">
          <Text size="md" fw={600}>
            Appearance
          </Text>
          <Text size="xs" c="dimmed">
            Change how your dashboard looks and feels.
          </Text>
        </Stack>
        <Button variant="filled" size="sm">
          Save
        </Button>
      </Group>
      <Divider />
      <Stack my="lg">
        <SettingWithLabel label="Company Logo" description="Update your company logo.">
          <Group>
            <Group>
              <Avatar
                variant="filled"
                radius="md"
                size={80}
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
              />
              <FileSelect />
            </Group>
            <Button size="xs" variant="light" color="red">
              Remove
            </Button>
          </Group>
        </SettingWithLabel>
        <Divider />
        <SettingWithLabel label="Brand Color" description="Select or customize your brand color.">
          <Group>
            {renderSelectColor()}
            <ColorInput format="hex" />
          </Group>
        </SettingWithLabel>
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

export default Appearance;
