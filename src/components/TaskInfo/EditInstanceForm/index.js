import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  width: 600px;
  height: 194px;
  position: relative;
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
    width: 86%;
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
    width: 86%;
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
    <Round />
    <InputContainer>
      <TaskName
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Task Name"
      />
      <TaskDescription
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Task Description"
      />
    </InputContainer>
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
