import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  margin: 1em;
  padding: 1em;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFFDF6;

  @media only screen and (max-width: 500px) {
    margin-top: 0;
    padding-bottom: 30px;
  }
`;

const ButtonDelete = styled.button`
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
  padding: 10px 25px;
  bottom: 15px;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor || '#1A85E5'};
  }
`;

const ButtonCancel = styled.button`
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
  right: 115px;
  padding: 10px 20px;
  bottom: 15px;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor || '#1A85E5'};
  }
`;

function DeleteInstanceMenu({
  type,
  onDelete,
  onCancel,
  disabled,
}) {
  return (
    <Container>
      Delete this {type}?
      <ButtonDelete
        type="button"
        hoverColor="#00FF00"
        onClick={onDelete}
        disabled={disabled}
      >
        Delete
      </ButtonDelete>
      <ButtonCancel
        type="button"
        hoverColor="#FF0000"
        onClick={onCancel}
        disabled={disabled}
      >
        Cancel
      </ButtonCancel>
    </Container>
  )
}

export default DeleteInstanceMenu;
