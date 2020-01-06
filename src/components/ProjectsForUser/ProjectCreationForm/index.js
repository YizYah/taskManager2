import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE_ACTION } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_PROJECT_FOR_PROJECTS_FOR_USER_ACTION_ID } from '../../../config';

// change styling here
const Form = styled.div`
  padding: 30px 30px 0;
  margin-top: 20px;
  border: none;
  height: 180px;
  background: linear-gradient(180deg, #56CCF2 0%, #1A85E5 100%), #FFFFFF;
  box-shadow: 0px 4px 10px #8CC2F1;
  border-radius: 15px;
  display: flex;
  position: relative;
  width: 600px;

  @media only screen and (max-width: 500px) {
    width: 74%;
    margin: 0 auto;
    margin-top: -25px;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 360px) {
    width: 71%;
  }
`;

const Round = styled.div`
  width: 23px;
  height: 23px;
  background: #B4EAFB;
  border-radius: 50%;
  margin-top: 4px;
`;

const InputContainer = styled.div`
  width: 89%;
  padding-left: 15px;
`;

const ProjectName = styled.input`
  background: linear-gradient(180deg, #56CCF2, #56CCF2), #FFFFFF;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 16px;
  color: #FFFFFF;
  width: 100%;
  padding: 10px 20px;
  border: none;
  margin-bottom: 10px;

  &::placeholder {
    color: #FFFFFF;
  }

  &::-webkit-input-placeholder {
    color: #FFFFFF;
  }

  &::-moz-placeholder {
    color: #FFFFFF;
  }

  &::-ms-placeholder {
    color: #FFFFFF;
  }

  @media only screen and (max-width: 500px) {
    width: 92%;
  }
`;

const ProjectDescription = styled.textarea`
  background: linear-gradient(180deg, #56CCF2, #56CCF2), #FFFFFF;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  height: 45px;
  line-height: 16px;
  color: #FFFFFF;
  width: 100%;
  padding: 10px 20px;
  border: none;
  margin-bottom: 10px;

  &::placeholder {
    color: #FFFFFF;
  }

  &::-webkit-input-placeholder {
    color: #FFFFFF;
  }

  &::-moz-placeholder {
    color: #FFFFFF;
  }

  &::-ms-placeholder {
    color: #FFFFFF;
  }

  @media only screen and (max-width: 500px) {
    width: 92%;
  }
`;

const Button = styled.button`
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF;
  box-shadow: 0px 4px 10px rgba(86, 204, 242, 0.5);
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #1A85E5;
  border: none;
  position: absolute;
  right: 10px;
  padding: 10px 35px;
`;

function ProjectCreationForm({ userId, createProject, refetchQueries }) {
  const [ projectValue, updateProjectValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateProjectValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!projectValue) {
      return;
    }

    updateLoading(true);

    const createProjectResponse = await createProject({
      variables: {
        actionId: CREATE_PROJECT_FOR_PROJECTS_FOR_USER_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: projectValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newProjectData = JSON.parse(createProjectResponse.data.ExecuteAction);

    

    updateProjectValue('');
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
        <ProjectName
          id="project-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={projectValue}
          disabled={loading}
          placeholder="Project Name"
        />
        <ProjectDescription
          id="project-desc"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={projectValue}
          disabled={loading}
          placeholder="Project Description"
        />
        <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
          {
            loading
              ? 'Creating Project...'
              : 'Add'
          }
        </Button>
      </InputContainer>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE_ACTION, { name: 'createProject' }),
)(ProjectCreationForm);
