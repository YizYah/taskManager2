import React, { useState } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import Select from 'react-select';

import { flattenData } from '../../../flattenData';

import { SOURCE_ALL_USERS_ID } from '../../../config';
import { ALL_USERS_RELATIONSHIPS, SOURCE_ALL_USERS_QUERY } from '../../source-props/allUsers';
import '../../../index.css';

const UserSelectStyleWrapper = styled.div`
  position: relative;
  display: flex;
  width: 232px;
  margin: 10px;
  @media only screen and (max-width: 500px) { 
    width: 92%;
  }
  @media only screen and (max-width: 360px) { 
    width: 71%;
  }
`;

const Button = styled.button`
  background: #B4EAFB;
  border: 1px solid #B4EAFB;
  box-sizing: border-box;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  color: #479EEC;
  position: absolute;
  right: 0px;
  padding: 11px 25px;
`;

function UserSelect({ id, onSubmit, disabled }) {
  const [selected, updateSelected] = useState();

  const handleChange = option => updateSelected(option);

  const handleSubmit = async () => {
    if (!selected || !selected.value || !selected.label ) {
      return;
    }

    await onSubmit(selected.value);

    updateSelected(null);
  }

  const parameters = {};

  return (
    <Unit
      id={SOURCE_ALL_USERS_ID}
      typeRelationships={ALL_USERS_RELATIONSHIPS}
      query={SOURCE_ALL_USERS_QUERY}
      parameters={parameters}
    >
      {({loading, error, data, refetchQueries}) => {
        if (loading) return 'Loading...';

        if (error) {
          console.error(error);
          return `Error: ${error.graphQLErrors}`
        };

        const users = data.unitData.map(el => flattenData(el));

        const options = users.map(user => ({
          value: user.id,
          label: user.value,
        }));

        return (
          <UserSelectStyleWrapper>
            <Select 
              style={{
                border: '1px solid #B4EAFB',
                boxSizing: 'border-box',
                borderRadius: '20px'}}
              inputId={id}
              isClearable={true}
              value={selected}
              onChange={handleChange}
              options={options}
              isDisabled={disabled}
              placeholder={<span>Enter username</span>}
            />
            <Button
              onClick={handleSubmit}
              disabled={disabled
                || !selected
                || !selected.value}
            >
              Add User
            </Button>
          </UserSelectStyleWrapper>
        );
      }}
    </Unit>
  );
}

export default UserSelect;
