import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  width: 496px;
  padding: 20px 20px 0;
  position: relative;
  height: 115px;

  @media only screen and (max-width: 500px) {
    width: 100%;
  }
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

const ButtonEdit = styled.button`
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
  padding: 10px 35px;
  bottom: 15px;
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
  right: 115px;
  padding: 10px 25px;
  bottom: 15px;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor || '#1A85E5'};
  }
`;

function EditInstanceForm({
  id,
  value,
  onChange,
  onSave,
  onCancel,
  disabled,
}) {
  return (
    <Form>
      <GoalName
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Goal Name"
      />
      <ButtonEdit
        type="button"
        hoverColor="#00FF00"
        onClick={onSave}
        disabled={disabled}
      >
        Edit
      </ButtonEdit>
      <ButtonCancel
        type="button"
        hoverColor="#FF0000"
        onClick={onCancel}
        disabled={disabled}
      >
        Cancel
      </ButtonCancel>
    </Form>
  );
}

export default EditInstanceForm;
