import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

const Container = styled.div`
  margin: 1em;
  padding: 1em;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;
  color: #606060;

  @media only screen and (max-width: 500px) {
    padding:unset;
  }
`;

const ButtonDelete = styled.button`
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
  right: 20px;
  padding: 10px 25px;
  bottom: 20px;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor || '#1A85E5'};
  }
`;

const ButtonCancel = styled.button`
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
  right: 125px;
  padding: 10px 20px;
  bottom: 20px;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor || '#1A85E5'};
  }
`;

function DeleteInstanceMenu({
  onDelete,
  onCancel,
  disabled,
  type
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
