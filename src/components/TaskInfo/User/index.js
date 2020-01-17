import React, {useState} from 'react';
import styled from 'styled-components';
import {EXECUTE_ACTION} from '@nostack/no-stack';
import {graphql} from '@apollo/react-hoc';

import {DELETE_USER_FOR_TASK_INFO_ACTION_ID} from '../../../config';

// add styling here
const UserStyleWrapper = styled.div`
  position: relative;

  @media only screen and (max-width: 500px){
    margin:10px;
  }
`;

const UserComponent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 24px;
  width: 80px;
  height: 40px;
  background: #B4EAFB;
  border-radius: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #479EEC;
  margin-right: 10px;
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

const Delete = styled.img`
  position: absolute;
  right: 15px;
  cursor: pointer;
  width: 12px;
`;

const Usr = styled.img`
  border-radius: 50%;
  margin: 0 5px;
  width: 32px;
`;

function User({user, parentId, updateInstance, deleteInstance, refetchQueries}) {
  const [ isDeleteMode, updateIsDeleteMode ] = useState(false);
  const [ isDeleting, updateIsDeleting ] = useState(false);

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_USER_FOR_TASK_INFO_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            childInstanceId: user.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

    {/*<UserStyleWrapper isDeleting={isDeleting}>*/}
    {/*  {user.value}*/}
    {/*  {isDeleteMode ? (*/}
    {/*      <DeleteMenu>*/}
    {/*        Delete?*/}
    {/*        <Button*/}
    {/*          type="button"*/}
    {/*          hoverColor="#00FF00"*/}
    {/*          onClick={handleDelete}*/}
    {/*          disabled={isDeleting}*/}
    {/*        >*/}
    {/*          &#10003;*/}
    {/*        </Button>*/}
    {/*        <Button*/}
    {/*          type="button"*/}
    {/*          hoverColor="#FF0000"*/}
    {/*          onClick={() => updateIsDeleteMode(false)}*/}
    {/*          disabled={isDeleting}*/}
    {/*        >*/}
    {/*          &#10005;*/}
    {/*        </Button>*/}
    {/*      </DeleteMenu>*/}
    {/*    ) :*/}
    {/*    (*/}
    {/*      <Button*/}
    {/*        type="button"*/}
    {/*        onClick={() => updateIsDeleteMode(true)}*/}
    {/*      >*/}
    {/*        &#128465;*/}
    {/*      </Button>*/}
    {/*    )*/}
    {/*  }*/}
    {/*</UserStyleWrapper>*/}
  return (
    <UserStyleWrapper isDeleting={isDeleting}>
      <UserComponent>
        {user.value}
        <Delete
        src="/images/delete-user.png"
        onClick={handleDelete}
        alt=""
      />
      </UserComponent>
    </UserStyleWrapper>
  );
}

export default graphql(EXECUTE_ACTION, { name: 'deleteInstance' })(User);
