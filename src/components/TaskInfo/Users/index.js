import React from 'react';
import styled from 'styled-components';

import UserCreationForm from '../UserCreationForm';
import User from '../User';

const UsersStyleWrapper = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 500px){
    display: block;
  }
`;

function Users({ users, stepId, refetchQueries }) {
  return (
    <UsersStyleWrapper>
      <UserCreationForm
        parentId={stepId}
        refetchQueries={refetchQueries}
      />

      {users.map(user => (
        <User
          key={user.id}
          user={user}
          parentId={stepId}
          refetchQueries={refetchQueries}
        />
      ))}
    </UsersStyleWrapper>
  );
}

export default Users;
