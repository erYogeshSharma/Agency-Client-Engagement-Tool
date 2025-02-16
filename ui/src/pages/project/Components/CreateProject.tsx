import { useEffect } from 'react';
import {
  Button,
  Divider,
  Flex,
  Input,
  Space,
  Stack,
  Tabs,
  TagsInput,
  Text,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/app/services/project.service';
import { priorityOptions, statusOptions } from '@/config/options';
import TagSelector from '@/shared/components/form/TagSelector';
import TextEditor from '@/shared/components/form/TextEditor';

const ProjectForm = ({ formData, close }: { formData: any; close: () => void }) => {
  const [createProject, createProjectData] = useCreateProjectMutation();
  const [updateProject, updateProjectData] = useUpdateProjectMutation();
  const isSuccess = createProjectData.isSuccess || updateProjectData.isSuccess;
  const isLoading = createProjectData.isLoading || updateProjectData.isLoading;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      ...JSON.parse(JSON.stringify(formData)),
      start_date: formData.start_date ? new Date(formData.start_date) : '',
      end_date: formData.end_date ? new Date(formData.end_date) : '',
    },
  });

  function handleCreateProject(e: any) {
    e.preventDefault();

    form.onSubmit((values) => {
      if (formData.project_id) {
        updateProject(values);
      } else {
        createProject(values);
      }
    })();
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      close();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleCreateProject}>
      <Stack h="calc(100vh - 100px)">
        <Stack gap={0} flex={1}>
          <Input
            key={form.key('name')}
            {...form.getInputProps('name')}
            variant="unstyled"
            size="xl"
            radius="xs"
            placeholder="Project Name"
            style={{
              fontWeight: 600,
            }}
          />
          <Flex align="center" gap="xs">
            <Text size="sm" c="dimmed">
              Priority:
            </Text>
            <TagSelector
              tags={priorityOptions}
              value={form.getValues().priority}
              onChange={(value) => form.setFieldValue('priority', value.value)}
            />
          </Flex>
          <Space h="xs" />
          <Divider />
          <Space h="xs" />
          <Stack gap={10}>
            <Flex align="start">
              <Flex w={100}>
                <Text size="sm" c="dimmed">
                  Tags
                </Text>
              </Flex>
              <TagsInput
                key={form.key('tags')}
                {...form.getInputProps('tags')}
                flex={1}
                variant="unstyled"
                placeholder="Pick tag from list"
                data={['React', 'Angular', 'Svelte']}
              />
            </Flex>
            <Flex align="center">
              <Flex w={100}>
                <Text size="sm" c="dimmed">
                  Start Date
                </Text>
              </Flex>
              <DateInput
                key={form.key('start_date')}
                {...form.getInputProps('start_date')}
                variant="unstyled"
                size="md"
                placeholder="Date input"
              />
            </Flex>
            <Flex align="center">
              <Flex w={100}>
                <Text size="sm" c="dimmed">
                  End Date
                </Text>
              </Flex>
              <DateInput
                key={form.key('end_date')}
                {...form.getInputProps('end_date')}
                variant="unstyled"
                size="md"
                placeholder="Date input"
              />
            </Flex>
            <Flex align="center">
              <Flex w={100}>
                <Text size="sm" c="dimmed">
                  Status
                </Text>
              </Flex>
              <TagSelector
                tags={statusOptions}
                value={form.getValues().status}
                onChange={(value) => form.setFieldValue('status', value.value)}
              />
            </Flex>
          </Stack>
          <Space h="sm" />
          <Tabs orientation="horizontal">
            <Tabs.List>
              <Tabs.Tab value="Description">
                <Title order={4} fw={600} size="md">
                  Description
                </Title>
              </Tabs.Tab>
              <Tabs.Tab value="Comments">
                <Title order={4} fw={600} size="md">
                  Comment
                </Title>
              </Tabs.Tab>
              <Tabs.Tab value="Activity">
                <Title order={4} fw={600} size="md">
                  Activity
                </Title>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Stack>
            <TextEditor
              value={form.getValues().description}
              onChange={(value) => form.setFieldValue('description', value)}
            />
          </Stack>
        </Stack>
        <Stack>
          <Divider />
          <Flex align="center" justify="space-between">
            <Text>.</Text>
            <Button loaderProps={{ type: 'dots' }} loading={isLoading} type="submit">
              Save
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </form>
  );
};

export default ProjectForm;
