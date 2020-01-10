import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import {
  UPDATE_STEP_FOR_TASK_INFO_ACTION_ID,
  DELETE_STEP_FOR_TASK_INFO_ACTION_ID, TYPE_GOAL_ID, TYPE_USER_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';


import Goals from '../Goals'; 
import Users from '../Users'; 

const Edit = styled.div`
  display: none;
  top: 25px;
  right: 30px;
  position: absolute;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display:none !important;
  }
`;

const Delete = styled.div`
  display: none;
  position: absolute;
  right: -15px;
  top: 25px;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display:none !important;
  }
`;

const StepContainer = styled.div`
  position: relative;
  width: 100%;

  &:hover ${Edit} {
    display: block;
  }

  &:hover ${Delete} {
    display: block;
  }
`;

const StepStyleWrapper = styled.div(({
  selected,
  isDeleteMode,
}) => `
  display: ${selected ? 'block' : 'flex'};
  position: relative;
  margin: 1em 9px;
  padding: 1.5em;
  border: ${selected ? '1px solid aquamarine': '1px solid white'};
  background: linear-gradient(180deg, #56CCF2 0%, #469DEB 100%);
  box-shadow: 0px 4px 10px #B4EAFB;
  border-radius: 15px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  width: 84%;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  cursor: ${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }

  @media only screen and (max-width: 500px) {
    display: ${isDeleteMode ? 'flex' : ''};
    align-items: ${isDeleteMode ? 'baseline' : ''};
  }
`);


function Step({
  step,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  showCreateSteps,
  showGoals,
  isGoalsShow
}) {
  const [stepValue, updateStepValue] = useState(step.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  
  const goalData = step.children && step.children.find(child => child.typeId === TYPE_GOAL_ID);
  const goals = goalData ? goalData.instances : [];
  const userData = step.children && step.children.find(child => child.typeId === TYPE_USER_ID);
  const users = userData ? userData.instances : [];

  function handleStepValueChange(e) {
    updateStepValue(e.target.value);
  }

  async function handleStepValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_STEP_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          value: stepValue,
          instanceId: step.id,
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
      <StepStyleWrapper>
        <EditInstanceForm
          type={'Step'}
          id={step.id}
          label="Step Value:" 
          value={stepValue}
          onChange={handleStepValueChange}
          onSave={handleStepValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </StepStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_STEP_FOR_TASK_INFO_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: step.id,
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
      <StepStyleWrapper 
        selected={selected}
        isDeleting={isDeleting}
      >
        {stepValue}
        <DeleteInstanceMenu
          type={'Step'}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </StepStyleWrapper>
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
      <StepContainer style={{ opacity: showCreateSteps || isGoalsShow ? '0.5' : '1' }}>
        <StepStyleWrapper onClick={() => {onSelect(step.id); showGoals();}}>
          {stepValue}
        </StepStyleWrapper>
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
      </StepContainer>
    </SwipeableListItem>
    );
  }

  return (
    <StepStyleWrapper selected={selected}>
      {stepValue}  
      < Goals
        goals = { goals }
        stepId = {step.id}
        label="Goal?"
        refetchQueries={refetchQueries}
      />
      < Users
        users = { users }
        stepId = {step.id}
        label="User?"
        refetchQueries={refetchQueries}
      />
    </StepStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(Step);
