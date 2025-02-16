import { useEffect } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import moment from 'moment';
import { ActionIcon, Button, Drawer, Group, Space, Table, Text, Title } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useGetProjectsQuery } from '@/app/services/project.service';
import { priorityOptions, statusOptions } from '@/config/options';
import { projectActions } from '@/features/auth/project.slice';
import RenderTag from '@/shared/components/form/RenderTag';
import ProjectForm from './Components/CreateProject';

const ProjectTable = ({ open, opened }: { open: () => void; opened: boolean }) => {
  const { isLoading, data, refetch, isError } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!opened) {
      refetch();
    }
  }, [opened]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Failed to load projects</Text>;
  }

  function openProjectForm(project: any) {
    dispatch(
      projectActions.selectProject({
        ...project,
        start_date: project.start_date ? new Date(project.start_date) : '',
        end_date: project.end_date ? new Date(project.end_date) : '',
      })
    );
    open();
  }

  const rows = data.map((project: any) => (
    <Table.Tr key={project?.project_id}>
      <Table.Td>{project?.name}</Table.Td>
      <Table.Td>
        <RenderTag value={project?.priority} tags={priorityOptions} />
      </Table.Td>
      <Table.Td>
        <RenderTag value={project?.status} tags={statusOptions} />
      </Table.Td>
      <Table.Td>{moment(project?.start_date).format('DD MMM YYYY')}</Table.Td>
      <Table.Td>{moment(project?.end_date).format('DD MMM YYYY')}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="filled" aria-label="Settings" color="red.5">
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => openProjectForm(project)}
            variant="filled"
            aria-label="Settings"
          >
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Project Name</Table.Th>
            <Table.Th>Priority</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Start Date</Table.Th>
            <Table.Th>Due Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

const ProjectPage = () => {
  const { selectedProject } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  function handleOpen() {
    dispatch(
      projectActions.selectProject({
        name: '',
        description: '',
        tags: [],
        is_important: false,
        is_urgent: false,

        priority: 1,
        status: 1,
      })
    );
    open();
  }
  return (
    <div>
      <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0], timezone: 'UTC' }}>
        <Group align="center" justify="space-between">
          <Title order={2}>Projects</Title>
          <Button onClick={handleOpen}>Create Project</Button>
        </Group>
        <Space h="md" />
        <Drawer
          offset={8}
          radius="md"
          opened={opened}
          position="right"
          size="lg"
          onClose={close}
          title={<Title order={2}>{selectedProject?.project_id ? 'Edit' : 'Create'} Project</Title>}
        >
          <ProjectForm formData={selectedProject} close={close} />
        </Drawer>
        <ProjectTable opened={opened} open={open} />
      </DatesProvider>
    </div>
  );
};

export default ProjectPage;
