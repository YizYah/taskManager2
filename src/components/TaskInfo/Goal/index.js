import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import {
  UPDATE_GOAL_FOR_TASK_INFO_ACTION_ID,
  DELETE_GOAL_FOR_TASK_INFO_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../EditGoalForm';
import DeleteInstanceMenu from '../DeleteInstanceMenu';



// add styling here
const GoalStyleWrapper = styled.div(({
  selected,
  isEditMode,
  isDeleteMode
}) => `
  position: relative;
  margin: 1em 10px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: #EAF4FD;
  box-shadow: 0px 4px 10px #1A85E5;
  height: ${isDeleteMode || isEditMode ? 'auto' : '50px'};
  border-radius: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #606060;
  cursor: ${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }

  @media only screen and (max-width: 500px) {
    align-items: ${isDeleteMode ? 'end' : 'center'};
    padding-top: ${isDeleteMode ? '15px' : '0'};
  }
`);

const Edit = styled.div`
  top: 6px;
  right: 50px;
  position: absolute;
  cursor: pointer;
`;

const Delete = styled.div`
  position: absolute;
  right: 5px;
  top: 6px;
  cursor: pointer;
`;


function Goal({
  goal,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [goalValue, updateGoalValue] = useState(goal.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  

  if (!selected) {
    return (
      <GoalStyleWrapper onClick={() => onSelect(goal.id)}>
        {goalValue}
      </GoalStyleWrapper>
    );
  }

  function handleGoalValueChange(e) {
    updateGoalValue(e.target.value);
  }

  async function handleGoalValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_GOAL_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          value: goalValue,
          instanceId: goal.id,
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
      <GoalStyleWrapper isEditMode={isEditMode} >
        <EditInstanceForm
          id={goal.id}
          label="Goal Value:" 
          value={goalValue}
          onChange={handleGoalValueChange}
          onSave={handleGoalValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </GoalStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_GOAL_FOR_TASK_INFO_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: goal.id,
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
      <GoalStyleWrapper 
        selected={selected}
        isDeleting={isDeleting}
        isDeleteMode={isDeleteMode}
      >
        {goalValue}
        <DeleteInstanceMenu
          type="Goal"
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </GoalStyleWrapper>
    );
  }

  return (
    <GoalStyleWrapper selected={selected}>
      {goalValue}
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
    </GoalStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'updateInstance' }),
  graphql(EXECUTE_ACTION, { name: 'deleteInstance' })
)(Goal);
