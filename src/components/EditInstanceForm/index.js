import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 88%;
  height: 160px
`;

const Name = styled.input`
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
    width: 89%;
  }

  @media only screen and (max-width: 320px) {
    width: 82%;
  }
`;

const Description = styled.textarea`
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
    width: 89%;
  }

  @media only screen and (max-width: 320px) {
    width: 82%;
  }
`;

const ButtonEdit = styled.button`
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
  padding: 10px 25px;
  bottom: 15px;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor || '#1A85E5'};
  }
`;

const Round = styled.div`
  width: 23px;
  height: 23px;
  background: #B4EAFB;
  border-radius: 50%;
  margin-right: 20px;
`;

function EditInstanceForm({
  type,
  id,
  value,
  onChange,
  onSave,
  onCancel,
  disabled,
}) {
  return (
    <>          
    <Round />
    <InputContainer>
      <Name
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={type + " Name"}
      />
      <Description
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={type + " Description"}
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
    </>
  );
}

export default EditInstanceForm;
