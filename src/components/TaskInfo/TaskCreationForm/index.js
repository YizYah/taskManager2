import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_TASK_FOR_TASK_INFO_ACTION_ID, CREATE_COMPLETED_FOR_TASK_INFO_ACTION_ID, TYPE_COMPLETED_ID } from '../../../config';

// change styling here
const Form = styled.div`
  z-index:2;
  margin: 2em 10px 1em;
  padding: 25px 20px 0 30px;
  border: none;
  border-radius: 5px;
  display: flex;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px #8CC2F1;
  border-radius: 15px;
  width: 610px;
  height: 194px;

  @media only screen and (max-width: 500px) {
    margin-left: -13%;
    width: 96%;
  }
  @media only screen and (max-width: 320px) {
    margin-left: -7%;
    width: 82%;
  }
  
`;

const Round = styled.div`
  width: 23px;
  height: 23px;
  background: #B4EAFB;
  border-radius: 50%;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  width: 85%;
  padding-left: 15px;
`;

const TaskName = styled.input`
  background: linear-gradient(180deg, #EAF4FD, #EAF4FD), #FFFFFF;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  color: #606060;
  width: 100%;
  padding: 10px 20px;
  border: none;
  margin-bottom: 10px;

  &::placeholder {
    color: #BABDC0;
  }

  &::-webkit-input-placeholder {
    color: #BABDC0;
  }

  &::-moz-placeholder {
    color: #BABDC0;
  }

  &::-ms-placeholder {
    color: #BABDC0;
  }

  @media only screen and (max-width: 500px) {
    width: 88%;
  }
`;

const TaskDescription = styled.textarea`
  background: linear-gradient(180deg, #EAF4FD, #EAF4FD), #FFFFFF;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  color: #606060;
  width: 100%;
  height: 56px;
  padding: 10px 20px;
  border: none;
  margin-bottom: 10px;

  &::placeholder {
    color: #BABDC0;
  }

  &::-webkit-input-placeholder {
    color: #BABDC0;
  }

  &::-moz-placeholder {
    color: #BABDC0;
  }

  &::-ms-placeholder {
    color: #BABDC0;
  }

  @media only screen and (max-width: 500px) {
    width: 88%;
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
  bottom: 17px;
  padding: 10px 35px;
`;

function TaskCreationForm({ projectId, createTask, createCompleted, refetchQueries }) {
  const [ taskValue, updateTaskValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateTaskValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!taskValue) {
      return;
    }

    updateLoading(true);

    const createTaskResponse = await createTask({
      variables: {
        actionId: CREATE_TASK_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: projectId,
          value: taskValue,
        }),
        unrestricted: false,
      },
    });

    const newTaskData = JSON.parse(createTaskResponse.data.ExecuteAction);

        await createCompleted({
      variables: {
        actionId: CREATE_COMPLETED_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: newTaskData.instanceId,
          value: 'false',
        }),
        unrestricted: false,
      },
      refetchQueries,
    });


    updateTaskValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <Round/>
      <InputContainer>
        <TaskName
          id="task-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={taskValue}
          disabled={loading}
          placeholder="Task Name"
        />
        <TaskDescription
          id="task-desc"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={taskValue}
          disabled={loading}
          placeholder="Task Description"
        />
        <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
          {
            loading
            ? 'Creating Task...'
            : 'Add'
          }
        </Button>
      </InputContainer>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'createTask' }),
  graphql(EXECUTE_ACTION, { name: 'createCompleted' }),
)(TaskCreationForm);
