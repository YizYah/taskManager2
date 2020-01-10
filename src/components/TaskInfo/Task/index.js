import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import {
  UPDATE_TASK_FOR_TASK_INFO_ACTION_ID,
  DELETE_TASK_FOR_TASK_INFO_ACTION_ID, TYPE_COMPLETED_ID, TYPE_STEP_ID,
} from '../../../config';

import EditInstanceForm from '../EditInstanceForm';
import DeleteInstanceMenu from '../DeleteInstanceMenu';


import Completed from '../Completed'; 
import Steps from '../Steps'; 

const Edit = styled.div`
  display: none;
  top: 10px;
  right: 8px;
  position: absolute;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display:none !important;
  }
`;

const Delete = styled.div`
  display: none;
  position: absolute;
  right: 8px;
  top: 55px;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display:none !important;
  }
`;

const TaskContainer = styled.div`
  position: relative;
  width: 100%;

  &:hover ${Edit} {
    display: block;
  }

  &:hover ${Delete} {
    display: block;
  }
`;

const TaskStyleWrapper = styled.div(({
  isEditMode,
  selected,
  isDeleteMode,
}) => `
  display: ${selected ? 'block' : 'flex'};
  align-items: center;
  text-align: left;
  position: relative;
  margin: 10px;
  margin-left: ${selected || isEditMode || isDeleteMode ? '-35px' : '12px'};
  padding: 10px 15px;
  cursor: ${selected ? 'auto' : 'pointer'};
  background: #FFFFFF;
  box-shadow: 0px 4px 10px #8CC2F1;
  border-radius: 15px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #606060;
  height: ${selected || isEditMode ? 'auto' : '110px'};
  width: 86%;
  padding-top: ${isEditMode ? '20px' : '0'};

  &:hover {
    border: 1px solid aquamarine;
  }

  @media only screen and (max-width: 500px) {
    width: 86%;
    margin-left: ${selected ? '0' : ''};
    margin-left: ${isEditMode | isDeleteMode ? '-3px' : ''};
    padding-bottom: ${isDeleteMode ? '0' : ''};
    align-items:  ${isDeleteMode ? 'baseline' : 'center'};
  }
  @media only screen and (max-width: 320px) {
    margin-left: 5%;
    width: 83%;
  }
`);

const TaskCont = styled.div`
  display: flex;
  padding: 20px 0;
`;

const Round = styled.div`
  width: 23px;
  height: 23px;
  background: #B4EAFB;
  border-radius: 50%;
  margin: 0 10px;
`;

const Check = styled.img`
  position: absolute;
  left: 25px;
`;

const TaskTitle = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;
  color: #606060;
`;

const TaskDescription = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #A6A6A6;
`;

function Task({
  task,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  showCreateTasks,
  showSteps,
  isStepsShow
}) {
  const [taskValue, updateTaskValue] = useState(task.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  
  const completedData = task.children && task.children.find(child => child.typeId === TYPE_COMPLETED_ID);
            const completed = completedData ? completedData.instances[0] : [];
  const stepData = task.children && task.children.find(child => child.typeId === TYPE_STEP_ID);
  const steps = stepData ? stepData.instances : [];

  function handleTaskValueChange(e) {
    updateTaskValue(e.target.value);
  }

  async function handleTaskValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_TASK_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          value: taskValue,
          instanceId: task.id,
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
      <TaskStyleWrapper isEditMode={isEditMode}>
        <EditInstanceForm
          id={task.id}
          label="Task Value:" 
          value={taskValue}
          onChange={handleTaskValueChange}
          onSave={handleTaskValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </TaskStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_TASK_FOR_TASK_INFO_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: task.id,
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
      <TaskStyleWrapper 
        selected={selected}
        isDeleteMode={isDeleteMode}
      >
        {taskValue}
        <DeleteInstanceMenu
          type="Task"
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </TaskStyleWrapper>
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
      <TaskContainer  style={{ opacity: showCreateTasks || isStepsShow ? '0.5' : '1' }}>
        <TaskStyleWrapper style={{ 
          background : completed.value === "true" ? 'rgba(255, 253, 246, 0.68)' : '#FFFFFF',
          textDecoration: completed.value === "true" ? 'line-through' : 'none' }} 
          onClick={() => {onSelect(task.id, 'Steps'); showSteps();}}>
          <Round />
          { completed.value === "true" &&
          <Check src="/images/check.png" alt=""/>
          }
          <div>
            <TaskTitle>{taskValue}</TaskTitle>
            <TaskDescription>{taskValue}</TaskDescription>
          </div>
        </TaskStyleWrapper>
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
      </TaskContainer>
      </SwipeableListItem>
    );
  }

  return (
    <TaskStyleWrapper selected={selected}>
      <TaskCont>
        <Completed
          completed = { completed }
          taskId = {task.id}
          refetchQueries={refetchQueries}
        />
        <div>
          <TaskTitle>{taskValue}</TaskTitle>
          <TaskDescription>{taskValue}</TaskDescription>
        </div>
      </TaskCont>
      < Steps
              steps = { steps }
              taskId = {task.id}
              label="Step?"
              refetchQueries={refetchQueries}
      />
    </TaskStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(Task);
