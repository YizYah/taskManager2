import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NoStackConsumer, LoginForm, RegistrationForm } from '@nostack/no-stack';

import { PLATFORM_ID, TYPE_USER_ID } from './config';

import NavBar from './components/NavBar';
import AuthTabs from './components/AuthTabs';
import Projects from './components/ProjectsForUser/Projects';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => (
  <>
    {/* <NavBar /> */}
    <Wrapper className="App">
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;

          if (!currentUser) {
            return (
              <LoginWrapper>
                <AuthTabs
                  menuTitles={[
                    { title: 'Login', 
                      message: 'Existing user?'},
                    { title: 'Sign Up', 
                      message: 'New to MultiTask?'}
                  ]}
                >
                  <LoginForm />
                  <RegistrationForm 
                    platformId={PLATFORM_ID}
                    userClassId={TYPE_USER_ID}
                  />
                </AuthTabs>
              </LoginWrapper>
            );
          }

          return (
            <Projects userId={ currentUser.id } />
          );
        }}
      </NoStackConsumer>
    </Wrapper>
  </>
);

export default App;
