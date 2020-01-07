import React, { Component, createRef } from 'react';

import { Unit, LogoutButton } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import ProjectCreationForm from '../ProjectCreationForm';
import Project from '../Project';

import { SOURCE_PROJECTS_FOR_USER_ID } from '../../../config';
import { PROJECTS_FOR_USER_RELATIONSHIPS, SOURCE_PROJECTS_FOR_USER_QUERY } from '../../source-props/projectsForUser';

const ProjectsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #EAF4FD;
  overflow-y: hidden;
`;

const MenuContainer = styled.div`
  position: relative;
  padding: 0 90px 0 40px;
  z-index: 2;
  background: #FFFFFF;
  border-radius: 0px 20px 0px;
  box-shadow: 5px 0px 10px rgba(140, 194, 241, 0.3);

  .active {
    background: linear-gradient(95deg,#EAF4FD 0 ,rgba(234,244,253,0) 100%);
    border-left: 5px solid #1A85E5;
    transition: .5s ease-in-out;
  }

  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const MenuList = styled.li`
  list-style: none;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: #606060;
  padding: 20px 0;
  transition: .5s ease-in-out;
`;

const Logo = styled.div`
  height: 125px;
  padding: 70px 0;
  padding-bottom: 0;


  @media only screen and (max-width: 500px) {
    background: linear-gradient(180deg, #56CCF2 0%, #1A85E5 100%);
    padding: 100px 0;
    margin: 0 auto;
  }
`;

const LogoDesktop = styled.img`
  display: block;
`;

const TeamTitle = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 39px;
  color: #606060;
  padding: 60px 0 20px;
  text-align: left;
`;

const TeamListContainer = styled.div`
  display: flex;
  margin-bottom: 80px;
`;

const TeamList = styled.img`
  border-radius: 50%;
  margin-right: 20px;
`;

const Copyright = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #A6A6A6;
  position: absolute;
  bottom: 15px;
`;

const ProjectsContainer = styled.div`
  position: relative;
  padding-left: 60px;
  background: #EAF4FD;
  overflow-y: hidden;
  height: 100%;
  width: 100%;

  @media only screen and (max-width: 500px) {
    width: 100%;
    padding-left: 0
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

const ProjectsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #EAF4FD;
  overflow: auto;
  height: 100%;
  padding-right: 15px;

  @media only screen and (max-width: 500px) {
    width: 88%;
    margin: 0 auto;
    margin-top: -40px;
    background: none;
    padding-bottom: 100px;
    padding-right: 0;
    overflow: unset;
  }
`;

const ProjectsTitle = styled.div(({
  selectedProjectId,
}) => `
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  position: relative;
  width:600px;
  line-height: 39px;
  color: #606060;
  display: flex;
  padding: 70px 0 20px;

  @media only screen and (max-width: 500px) {
    background: #FFFFFF;
    border-radius: 0px 0px 20px 20px;
    padding: 0px 30px;
    display: flex;
    align-items: center;
    height: 150px;
    opacity: ${selectedProjectId ? '0.5' : '1'};
  }
}
`);

const ProjectsLength = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 39px;
  color: #bbbbbb;
  padding-left: 5px;
`;

const TotalProjects = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 39px;
  color: #bbbbbb;
`;

const AddProjects = styled.img`
  position: absolute;
  right: -62px;
  cursor: pointer;
  width:50px;

  @media only screen and (max-width: 1200px) {
    right: 60px;
  }

  @media only screen and (max-width: 500px) {
    width: 23%;
    bottom: 5px;
    right: 5px;
    position: fixed;
    z-index: 6;
  }
`;

const Menu = styled.img`
  display: none;

  @media only screen and (max-width: 500px) {
    z-index: 2;
    display: block;
    position: absolute;
    right: 35px;
  }
`;

const MenuMobile = styled.img`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 5;
  }
`;

const LogoM = styled.img`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
    position: fixed;
    bottom: 18px;
    z-index: 6;
    right: 45%;
  }
`;

const Back = styled.img`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
    position: fixed;
    bottom: 25px;
    left: 50px;
    z-index: 6;
  }
`;

class Projects extends Component {
  state = {
    selectedProjectId: null,
    showCreateProject: false,
    showTasks: false,
    menu: ['Projects', 'Tasks', 'Steps', 'Goals'],
    team: [{name:'User1', photo: '/images/users/user1.png'},
      {name:'User2', photo: '/images/users/user2.png'},
      {name:'User3', photo: '/images/users/user3.png'},
      {name:'User4', photo: '/images/users/user4.png'},
    ],
    totalProjects: 2,
    projectsActive: 2,
    menuActive: 'Projects'
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    const node = this.wrapperRef.current;

    if (
      node &&
      node !== e.target && 
      !node.contains(e.target)
    ) {
      this.setState({ selectedProjectId: null, 
        menuActive: 'Projects',
        showTasks: false });
    }
  }
  
  handleSelect = id => this.setState({ selectedProjectId: id, menuActive: 'Tasks' });

  menuActive = menu => {
    this.setState({ menuActive: menu})
  }

  showAdd = () => {
    this.setState({ showCreateProject: !this.state.showCreateProject })
  }

  showTasks = () => {
    this.setState({ showTasks: !this.state.showTasks })
  }

  render() {
    const { userId } = this.props;
    const { selectedProjectId } = this.state;

    const parameters = {
      __currentUser__: userId,
    };
    
    return (
    <div style={{overflowY: 'hidden'}}>
      <Unit
        id={SOURCE_PROJECTS_FOR_USER_ID}
        typeRelationships={PROJECTS_FOR_USER_RELATIONSHIPS}
        query={SOURCE_PROJECTS_FOR_USER_QUERY}
        parameters={parameters}
      >
        {({loading, error, data, refetchQueries}) => {
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`
          };

          const projects = data.unitData.map(el => flattenData(el));

          return (
            <ProjectsWrapper> 
              <MenuContainer>
                <Logo>
                  <LogoDesktop src="/images/logo-desktop.png" alt="" />
                </Logo>
                {this.state.menu.map((list, index) => {
                  let active =''
                  
                  if(list === this.state.menuActive) 
                    active = 'active'

                  return (
                    <MenuList className={active} key={index}>{list}</MenuList>
                  )
                 })
                }
      
                <TeamTitle>Team</TeamTitle>
                <TeamListContainer>
                  {this.state.team.map((list, index) => (
                    <TeamList key={index} src={list.photo} alt="" />
                  ))}
                </TeamListContainer>

                <LogoutButton />
                <Copyright>Copyright 2019-2020 by MultiTask</Copyright>
              </MenuContainer>
              <ProjectsContainer>

                <ProjectsTitle selectedProjectId={selectedProjectId}>Projects <ProjectsLength>({this.state.projectsActive}/
                    <TotalProjects>{this.state.totalProjects}</TotalProjects>)
                  </ProjectsLength>
                  <AddProjects src="/images/add-icon.png" alt=""
                   onClick={this.showAdd} />
                  <Menu src="/images/menu.png" alt="" />
                </ProjectsTitle>

                { this.state.showCreateProject &&
                <ProjectCreationForm  userId={userId} refetchQueries={refetchQueries}/>
                }

                <ProjectsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                  {projects && projects.map(project => (
                    <Project
                      showCreateProject={this.state.showCreateProject}
                      menuActive={this.menuActive}
                      showTasks={this.showTasks}
                      isTasksShow={this.state.showTasks}
                      users={this.state.team}
                      key={v4()}
                      parentId={userId}
                      project={project}
                      selected={project.id === selectedProjectId}
                      refetchQueries={refetchQueries}
                      onSelect={this.handleSelect}
                    />
                  ))}
                </ProjectsStyleWrapper>
                <MenuMobile src="/images/mobile-menu.png" alt="" />
                <LogoM src="/images/logo.png" alt="" />
                <Back src="/images/back.png" alt="" />
              </ProjectsContainer>
            </ProjectsWrapper>
          );
        }}
      </Unit>
    </div>
    );
  }
}

export default Projects;
