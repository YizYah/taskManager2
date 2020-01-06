import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql } from '@apollo/react-hoc';
import { EXECUTE_ACTION } from '@nostack/no-stack';

import {UPDATE_COMPLETED_FOR_TASK_INFO_ACTION_ID} from '../../../config';

// add styling here
const CompletedStyleWrapper = styled.span`
  position: relative;
`;

const Round = styled.div`
  width: 23px;
  height: 23px;
  background: #B4EAFB;
  border-radius: 50%;
  margin: 10px;
  cursor: pointer;
`;

const Check = styled.img`
  position: absolute;
  left: 10px;
  top: 10px;
  pointer-events: none;
`;

function Completed({ completed, label, updateInstance, refetchQueries, disabled = false }) {
  const [ completedValue, updateCompletedValue ] = useState(completed.value);

  async function handleCompletedValueChange() {
    const value = completedValue === 'true' ? 'false' : 'true';
    updateCompletedValue(value);

    await updateInstance({
      variables: {
        actionId: UPDATE_COMPLETED_FOR_TASK_INFO_ACTION_ID,
        executionParameters: JSON.stringify({
          value,
          instanceId: completed.id,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });
  }

  return (
    <CompletedStyleWrapper>
      <Round
        id={completed.id} 
        onClick={handleCompletedValueChange}
      />
      { completedValue === "true" &&
        <Check src="/images/check.png" alt=""/>
      }
    </CompletedStyleWrapper>
  );
}

export default graphql(EXECUTE_ACTION, { name: 'updateInstance' })(Completed);
