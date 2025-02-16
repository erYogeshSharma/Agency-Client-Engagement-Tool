import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

type Project = {
  project_id: string;
  name: string;
  priority: number;
  status: number;
  start_date: string;
  end_date: string;
};
type ProjectState = {
  projects: Project[];
  selectedProject: Project | null;
};

const slice = createSlice({
  name: 'project',
  initialState: { projects: [], selectedProject: null } as ProjectState,
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
});

export default slice.reducer;
export const projectActions = slice.actions;
export const selectProjects = (state: RootState) => state.project.projects;
