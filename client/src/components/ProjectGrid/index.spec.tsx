import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectGrid from '.';
import { fetchAllProjectsThunk } from '../../store/project/project.thunks';
import { Group } from '../../types/group.types';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));
jest.mock('../../store/project/project.thunks', () => ({
  fetchAllProjectsThunk: jest.fn(),
}));

describe('ProjectGrid', () => {
  const group: Group = {
    id: 1,
    name: 'Group 1',
    createdAt: Date.toString(),
  };
  const projects = [
    { id: 1, name: 'Project 1', group: { id: 1 } },
    { id: 2, name: 'Project 2', group: { id: 1 } },
    { id: 3, name: 'Project 3', group: { id: 2 } },
  ];

  beforeEach(() => {
    const useAppDispatchModule =
      require('../../hooks/useAppDispatch').useAppDispatch;
    const useAppSelectorhModule =
      require('../../hooks/useAppSelector').useAppSelector;
    useAppDispatchModule.mockReturnValue(jest.fn());
    useAppSelectorhModule.mockImplementation((selector: any) =>
      selector({
        projects: { projects },
      })
    );
  });

  it('renders the group name', () => {
    render(
      <Router>
        <ProjectGrid group={group} />
      </Router>
    );

    const groupName = screen.getByText('Group 1');
    expect(groupName).toBeInTheDocument();
  });

  it('dispatches fetchAllProjectsThunk with the correct groupId', () => {
    render(
      <Router>
        <ProjectGrid group={group} />
      </Router>
    );

    expect(fetchAllProjectsThunk).toHaveBeenCalledWith({ groupId: 1 });
  });

  it('renders ProjectCard components for each project in the group', () => {
    render(
      <Router>
        <ProjectGrid group={group} />
      </Router>
    );

    const project1 = screen.getByText('Project 1');
    const project2 = screen.getByText('Project 2');
    const project3 = screen.queryByText('Project 3');

    expect(project1).toBeInTheDocument();
    expect(project2).toBeInTheDocument();
    expect(project3).not.toBeInTheDocument();
  });

  it('renders the group name and GroupModal component', () => {
    render(
      <Router>
        <ProjectGrid group={group} />
      </Router>
    );

    const groupName = screen.getByText('Group 1');
    const groupModal = screen.getByLabelText('Edit Group');

    expect(groupName).toBeInTheDocument();
    expect(groupModal).toBeInTheDocument();
  });

  it('renders the ProjectModal component', () => {
    render(
      <Router>
        <ProjectGrid group={group} />
      </Router>
    );

    const projectModal = screen.getByLabelText('Create Project');

    expect(projectModal).toBeInTheDocument();
  });
});
