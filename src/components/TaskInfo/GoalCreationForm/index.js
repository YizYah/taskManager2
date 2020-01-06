import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_GOAL_FOR_TASK_INFO_ACTION_ID } from '../../../config';

// change styling here
const Form = styled.div`
  margin: 2em 10px 10px;
  padding: 20px 20px 0;
  position: relative;
  height: 115px;
  border: none;
  background: #EAF4FD;
  box-shadow: 0px 4px 10px #1A85E5;
  border-radius: 10px;
`;

const GoalName = styled.input`
  background: linear-gradient(180deg, #B4EAFB, #B4EAFB), #FFFFFF;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  color: #606060;
  width: 94%;
  padding: 10px 20px;
  border: none;
  margin-bottom: 10px;

  &::placeholder {
    color: #606060;
  }

  &::-webkit-input-placeholder {
    color: #606060;
  }

  &::-moz-placeholder {
    color: #606060;
  }

  &::-ms-placeholder {
    color: #606060;
  }

  @media only screen and (max-width: 500px) {
    width: 84%;
  }
`;

const Button = styled.button`
  background: linear-gradient(180deg, #1C87E6, #1C87E6), #FFFFFF;
  box-shadow: 0px 4px 10px rgba(86, 204, 242, 0.5);
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  border: none;
  position: absolute;
  right: 10px;
  bottom: 20px;
  padding: 10px 35px;
`;

function GoalCreationForm({ parentId, createGoal, refetchQueries }) {
  const [ goalValue, updateGoalValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateGoalValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!goalValue) {
      return;
    }

    updateLoading(true);

    const createGoalResponse = await createGoal({
      variables: {
        actionId: CREATE_GOAL_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: goalValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newGoalData = JSON.parse(createGoalResponse.data.ExecuteAction);

    

    updateGoalValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <GoalName
        id="goal-value"
        type="text"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={goalValue}
        disabled={loading}
        placeholder="Goal Name"
      />
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating Goal...'
            : 'Add'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'createGoal' }),
)(GoalCreationForm);
