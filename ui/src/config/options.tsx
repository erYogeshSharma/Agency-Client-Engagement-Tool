import { IconFlag } from '@tabler/icons-react';
import { Tag } from '@/shared/components/form/TagSelector';

export const priorityOptions: Tag[] = [
  {
    value: 1,
    label: 'Important',
    color: 'red.4',
    icon: <IconFlag size={20} color="white" />,
  },
  {
    value: 2,
    label: 'Urgent',
    color: 'indigo.6',
    icon: <IconFlag size={20} color="white" />,
  },
  {
    value: 3,
    label: 'Normal',
    color: 'teal.6',
    icon: <IconFlag size={20} color="white" />,
  },
];

export const statusOptions: Tag[] = [
  {
    value: 1,
    label: 'To Do',
    color: 'gray.6',
    icon: <IconFlag size={20} color="white" />,
  },
  {
    value: 2,
    label: 'Planning',
    color: 'blue.6',
    icon: <IconFlag size={20} color="white" />,
  },
  {
    value: 3,
    label: 'In Progress',
    color: 'orange.6',
    icon: <IconFlag size={20} color="white" />,
  },
  {
    value: 4,
    label: 'Done',
    color: 'green.4',
    icon: <IconFlag size={20} color="white" />,
  },
];
