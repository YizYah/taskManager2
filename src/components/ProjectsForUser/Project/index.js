import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

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
`;

let Delete = styled.div`
  display: none;
  position: absolute;
  right: 15px;
  top: 55px;
  cursor: pointer;
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
  height: 180px;
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
    width: 100%;
  }

  @media only screen and (max-width: 320px) {
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

const Round = styled.div`
  width: 23px;
  height: 23px;
  background: #B4EAFB;
  border-radius: 50%;
  margin-right: 20px;
`;

const Check = styled.img`
  position: absolute;
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

const ProjectTeamContainer = styled.div`
  background: linear-gradient(0deg,#2ca7f3 0%,#208ada 100%),#FFFFFF;
  border-radius: 15px;
  display: flex;
  position: absolute;
  padding: 10px 30px;
  left: 12px;
  bottom: 12px;
  width: 86%;

  @media only screen and (max-width: 500px) {
    width: 77%;
  }
  @media only screen and (max-width: 360px) {
    width: 73%;
  }
  @media only screen and (max-width: 320px) {
    width: 70%;
  }
`;

const ProjectTeam = styled.img`
  border-radius: 50%;
  margin-right: -10px;
  width: 32px;
`;

const TeamLength = styled.div`
  border-radius: 50%;
  margin-right: -15px;
  background: #B4EAFB;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #1A85E5;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
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
          <Round />
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

  function onSwipeLeftListener() {
    ProjectContainer = styled.div`
      @media only screen and (max-width: 500px) {
        margin-left: -30px;
      }
    `;

    Edit = styled.div`
      @media only screen and (max-width: 500px) {
        right: -53px;
        display: block;
      }
    `;
    Delete = styled.div`
      @media only screen and (max-width: 500px) {
        right: -53px;
        display: block;
      }
    `;
  }
  function onSwipeRightListener() {
    ProjectContainer = styled.div`
      @media only screen and (max-width: 500px) {
        margin-left: unset;
      }
    `;
  console.log(1)

    Edit = styled.div`
    @media only screen and (max-width: 500px) {
      display: none;
    }
   `;
    Delete = styled.div`
      @media only screen and (max-width: 500px) {
        display: none;
      }
    `;
  }

  if (!selected) {
    return (
      // Please put a trigger if project is done to add opacity to the project container
      // style={{ opacity: showCreateProject || projectDone ? '0.5' : '1' }}
      <ProjectContainer style={{ opacity: showCreateProject || isTasksShow ? '0.5' : '1' }}>
        <ProjectStyleWrapper onClick={() => {onSelect(project.id); showTasks();}}>
          <ProjectDetail>
            <Round />
            {/* please add condition to show the checkmark if project is done 
              and delete the style={{display:'none'}} */}
            <Check style={{display:'none'}} src="/images/check.png" alt=""/>
            <div>
              <ProjectTitle>{projectValue}</ProjectTitle>
              <ProjectDescription>{projectValue}</ProjectDescription>
            </div>
          </ProjectDetail>
          <ProjectTeamContainer>
            {users.slice(0, 3).map((list, index) => (
              <ProjectTeam key={index} src={list.photo} alt=""/>
            ))}
            { users.length > 3 &&
            <TeamLength>+{users.length - 3}</TeamLength>
            }
            <TasksLength>Tasks (2/<TasksTotal>4</TasksTotal>)</TasksLength>
          </ProjectTeamContainer>
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
    );
  }

  return (
    <ProjectStyleWrapper selected={selected}>
      <ProjectDetail>
        <Round />
        {/* please add condition to show the checkmark if project is done 
            and delete the style={{display:'none'}} */}
          <Check style={{display:'none'}} src="/images/check.png" alt=""/>
          <div>
            <ProjectTitle>{projectValue}</ProjectTitle>
            <ProjectDescription>{projectValue}</ProjectDescription>
          </div>
        </ProjectDetail>
        <ProjectTeamContainer>
          {users.slice(0, 3).map((list, index) => (
            <ProjectTeam key={index} src={list.photo} alt=""/>
          ))}
          { users.length > 3 &&
          <TeamLength>+{users.length - 3}</TeamLength>
          }
          <TasksLength>Tasks (2/<TasksTotal>4</TasksTotal>)</TasksLength>
        </ProjectTeamContainer>
      < Tasks menuActive={menuActive} projectId = {project.id} />
    </ProjectStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(Project);
