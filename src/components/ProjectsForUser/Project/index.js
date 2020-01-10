import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import {
  UPDATE_PROJECT_FOR_PROJECTS_FOR_USER_ACTION_ID,
  DELETE_PROJECT_FOR_PROJECTS_FOR_USER_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';


import Tasks from '../../TaskInfo/Tasks'; 

let Edit = styled.div`
  display: none;
  top: 10px;
  right: 15px;
  position: absolute;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display:none !important;
  }
`;

let Delete = styled.div`
  display: none;
  position: absolute;
  right: 15px;
  top: 55px;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display:none !important;
  }
`;

const ProjectStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  position: relative;
  margin: 20px 0;
  padding: 30px 30px 0;
  background-color: ${isDeleting && 'tomato'};
  cursor: ${selected ? 'auto' : 'pointer'};
  width: 600px;
  height: 100px;
  background: linear-gradient(180deg, #56CCF2 0%, #1A85E5 100%), #FFFFFF;
  box-shadow: 0px 4px 10px #8CC2F1;
  border-radius: 15px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 16px;
  color: #FFFFFF;

  @media only screen and (max-width: 500px) {
    width: ${selected ? '84%' : '100%'};
  }

  @media only screen and (max-width: 320px) {
    width: ${selected ? '80%' : '100%'};
  }

  @media only screen and (max-width: 320px) {
    width: ${selected ? '93%' : '100%'};
    padding: 10px;
  }
`);


let ProjectContainer = styled.div`
  position: relative;
  width: 730px;
  background: #EAF4FD;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 75px;
  color: #1A85E5;
  display: flex;
  align-items: center;

  &:hover ${Edit} {
    display: block;
  }

  &:hover ${Delete} {
    display: block;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    background: none;
  }
`;

const ProjectDetail = styled.div`
  display: flex;
  text-align: left;
`;

const ProjectTitle = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 27px;
  color: #FFFDF6;
`;

const ProjectDescription = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 16px;
  color: #B4EAFB;
`;

const TasksLength = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #B4EAFB;
  position: absolute;
  right: 20px;
  padding: 10px;
`;

const TasksTotal = styled.span`
  font-size: 12px;
`;

function Project({
  project,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  showCreateProject,
  users,
  showTasks,
  isTasksShow,
  menuActive
}) {
  const [projectValue, updateProjectValue] = useState(project.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  function handleProjectValueChange(e) {
    updateProjectValue(e.target.value);
  }

  async function handleProjectValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_PROJECT_FOR_PROJECTS_FOR_USER_ACTION_ID,
        executionParameters: JSON.stringify({
          value: projectValue,
          instanceId: project.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <ProjectStyleWrapper>
        <ProjectDetail>
          <EditInstanceForm
            type={'Project'}
            id={project.id}
            value={projectValue}
            onChange={handleProjectValueChange}
            onSave={handleProjectValueSave}
            onCancel={handleCancelEdit}
            disabled={isSaving}
          />
        </ProjectDetail>
      </ProjectStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_PROJECT_FOR_PROJECTS_FOR_USER_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: project.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  if (isDeleteMode) {
    return (
      <ProjectStyleWrapper 
        selected={selected}
        isDeleting={isDeleting}
      >
        <ProjectDetail>
          <div>
            <ProjectTitle>{projectValue}</ProjectTitle>
            <ProjectDescription>{projectValue}</ProjectDescription>
            <DeleteInstanceMenu
              type={'Project'}
              onDelete={handleDelete}
              onCancel={handleCancelDelete}
              disabled={isDeleting}
            />
          </div>
        </ProjectDetail>
      </ProjectStyleWrapper>
    );
  }

  
  if (!selected) {
    return (
      <SwipeableListItem
        blockSwipe={window.innerWidth > 500 ? true : false}
        swipeLeft={{
          content:<img src="/images/edit.png" alt=""/>,
          action: () => updateIsEditMode(true)
        }}
        swipeRight={{
          content:  <img src="/images/delete.png" alt=""/>,
          action: () => updateIsDeleteMode(true)
        }}
      > 
      <ProjectContainer style={{ opacity: showCreateProject || isTasksShow ? '0.5' : '1' }}>
        <ProjectStyleWrapper onClick={() => {onSelect(project.id); showTasks();}}>
          <ProjectDetail>
            <div>
              <ProjectTitle>{projectValue}</ProjectTitle>
              <ProjectDescription>{projectValue}</ProjectDescription>
            </div>
          </ProjectDetail>
          <TasksLength>Tasks (2/<TasksTotal>4</TasksTotal>)</TasksLength>
        </ProjectStyleWrapper>
        <Edit onClick={() => updateIsEditMode(true)}>
           <img src="/images/edit.png"
            alt=""
          />
        </Edit>
        <Delete onClick={() => updateIsDeleteMode(true)}>
          <img src="/images/delete.png"
          alt=""
        />
        </Delete>
      </ProjectContainer>
      </SwipeableListItem>
    );
  }

  return (
    <ProjectStyleWrapper selected={selected}>
      <ProjectDetail>
          <div>
            <ProjectTitle>{projectValue}</ProjectTitle>
            <ProjectDescription>{projectValue}</ProjectDescription>
          </div>
        </ProjectDetail>
        <TasksLength>Tasks (2/<TasksTotal>4</TasksTotal>)</TasksLength>
      < Tasks menuActive={menuActive} projectId = {project.id} />
    </ProjectStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(Project);
