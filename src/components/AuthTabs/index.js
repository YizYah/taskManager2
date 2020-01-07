import React, { useState } from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #EAF4FD;
  overflow: auto;
`;

const AuthContainer = styled.div`
  position: relative;
  width: 434px;
  left: 0px;
  top: 0px;
  background: #FFFFFF;
  border-radius: 0px 20px 0px;
  box-shadow: 5px 0px 10px rgba(140, 194, 241, 0.3);

  @media only screen and (max-width: 500px) {
    width: 100%;
    background: #1A85E5;
    border-radius: unset;
    box-shadow: none;
  }
`;

const Logo = styled.div`
  height: 20%;
  padding: 70px 40px;
  padding-bottom: 0;

  @media only screen and (max-width: 500px) {
    background: linear-gradient(180deg, #56CCF2 0%, #1A85E5 100%);
    padding: 100px 0;
    margin: 0 auto;
  }
`;

const LogoDesktop = styled.img`
  display: block;

  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const LogoMobile = styled.img`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
    margin: 0 auto;
  }
`;

const FormContainer = styled.div`
  padding: 0 40px;
  background: white;

  @media only screen and (max-width: 500px) {
    padding: 40px;
    border-radius: 20px;
    height: 50%;
  }
`;

const Title = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 39px;
  color: #1A85E5;
  margin-bottom: 20px;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  border-radius: 2px;
  background-color: #eee;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const CheckBoxContainer = styled.div`
  margin: 10px 0;
  position: relative;
  
  &:hover input ~  ${Checkmark} {
    background-color: #ccc;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ ${Checkmark} {
      background-color: #2196F3;

      &:after {
        display: block; 
      }
    }
  }
`;

const CheckboxTitle = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #656764;
  padding: 0 25px;
`;

const Checkbox = styled.input`
  width: 25px;
`;

const AuthButton = styled.button(({ selected }) => `
  background: linear-gradient(180deg, #56CCF2 0%, #1A85E5 100%);
  border-radius: 25px;
  width: 100%;
  cursor: ${selected ? 'initial' : 'pointer'};
  color: white;
  padding: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: 15px 0;
  border: none;
  cursor: pointer;

`);

const SMAuthContainer = styled.div`
  display: flex;
`;

const FBAuthButton = styled.button(({ selected }) => `
  background: linear-gradient(180deg, #56CCF2 0%, #1A85E5 100%);
  border-radius: 25px;
  color: white;
  width: 50%;
  cursor: ${selected ? 'initial' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    font-size: 1.5vw;
  }
  @media only screen and (max-width: 500px) {
    font-size: 3vw;
  }
}
`);

const FBIcon = styled.img`
  padding-left: 10px;
`;

const GoogleAuthButton = styled.button(({ selected }) => `
  background: linear-gradient(180deg, #FD7655 0%, #F33D48 100%);
  border-radius: 25px;
  color: white;
  width: 50%;
  cursor: ${selected ? 'initial' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  padding: 10px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    font-size: 1.5vw;
  }
  @media only screen and (max-width: 500px) {
    font-size: 3vw;
  }
}
`);

const GoogleIcon = styled.img`
  padding-left: 10px;
`;

const SelectAuthContainer = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #656764;
  padding: 20px 0;
`;

const ChangeAuthButton = styled.button(({ selected }) => `
  font-size: 1.25em;
  background-color: #ffffff;
  opacity: ${selected ? 1.0 : 0.5};
  border: none;
  padding: 5px;
  cursor: ${selected ? 'initial' : 'pointer'};
  transition: opacity 0.5s ease;
  color: #1A85E5;
  font-size: inherit;
  font-weight: 600;
  padding: 0 3px;
  opacity: 1;

  &:hover {
    opacity: 1.0;
    text-decoration: underline;
  }
`);

const SideBGDesktop = styled.div`
  background: #EAF4FD;
  width: 79%;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 75px;
  color: #1A85E5;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const SideBGText = styled.div`
  width: 315px;
  padding-left: 100px;
`;

const SideBGImg = styled.img`
  position: absolute !important;
  right: 0;
  bottom: 0;
  width: 340px;
`;

const AuthTabs = ({ menuTitles, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <LoginWrapper>
      <AuthContainer>
        <Logo>
          <LogoDesktop src="/images/logo-desktop.png" alt="" />
          <LogoMobile src="/images/logo-mobile.png" alt=""/>
        </Logo>
        <FormContainer>
          <Title>{selectedTab === 0 ? menuTitles[0].title : menuTitles[1].title }</Title> 
          {React.Children.map(children, (child, index) => {
            if (index !== selectedTab) {
              return null;
            }
            console.log(child)
            return (
              <div>{child}</div>
            );
          })}
          <CheckBoxContainer>
            <CheckboxTitle>
              {selectedTab === 0 ? 'Remember me' : 'You agree to our Terms of use and Privacy Policy by signing up'}
              <Checkbox type="checkbox" name={selectedTab === 0 ? 'remember' : 'agreement'} />
              <Checkmark />
            </CheckboxTitle>
          </CheckBoxContainer>
          <SMAuthContainer>
            <FBAuthButton>{selectedTab === 0 ? 'Login with' : 'Sign up with'}
              <FBIcon src="/images/facebook-icon.svg" alt=""/>
            </FBAuthButton>
            <GoogleAuthButton>{selectedTab === 0 ? 'Login with' : 'Sign up with'}
              <GoogleIcon src="/images/google-icon.svg" alt=""/>
            </GoogleAuthButton>
          </SMAuthContainer>  
          {menuTitles.map((menu, index) => 
            selectedTab !== index && (
              <SelectAuthContainer key={index}>
                <span>{menu.message}</span>
                <ChangeAuthButton
                  selected={index === selectedTab}
                  onClick={e => {
                    e.preventDefault();

                    setSelectedTab(index);
                  }
                }>
                  {menu.title}
                </ChangeAuthButton>
              </SelectAuthContainer>  
            ))}
        </FormContainer>
      </AuthContainer>
      <SideBGDesktop>
        <SideBGText>
        {selectedTab === 0 ? menuTitles[0].title : menuTitles[1].title } to begin your journey with MultiTask.
        </SideBGText>
        <SideBGImg src="/images/bgside-logo.png" alt="" />
      </SideBGDesktop>
    </LoginWrapper>
  );
}

export default AuthTabs;
