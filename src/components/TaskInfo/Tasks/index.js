import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';


import { flattenData } from '../../../flattenData';

import TaskCreationForm from '../TaskCreationForm';
import Task from '../Task';

import { SOURCE_TASK_INFO_ID } from '../../../config';
import { TASK_INFO_RELATIONSHIPS, SOURCE_TASK_INFO_QUERY } from '../../source-props/taskInfo';

// add styling here
const TasksStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  position: absolute;
  z-index: 2;
  position: relative;
  width: 700px;
  margin: 1em 0em;

  @media only screen and (max-width: 500px) {
    width: 120%;
    margin-left: -16%;
  }
  @media only screen and (max-width: 360px) {
    margin-left: -17%;
  }
  @media only screen and (max-width: 320px) {
    width: 107%;
    margin-left: -12%;
  }
  
`;

const TasksContainer = styled.div`
  width: 100%;

  @media only screen and (max-width: 500px) {
    width: 117%;
  }
`;

const AddTask = styled.img`
  position: absolute;
  right: -50px;
  top: 30px;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    position: fixed;
    right: 3px;
    top: unset;
    width: 23%;
    bottom: 3px;
    z-index: 6;
  }
`;

class Tasks extends Component {
  state = {
    selectedTaskId: null,
    showCreateTasks: false,
    showSteps: false,
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
       this.changeStatus('Tasks', null)
     // this.props.menuActive('Tasks');
    }
  }

  changeStatus = (menu, id) => {
    //this.props.menuActive(menu);
    this.setState({ selectedTaskId: id, 
      showSteps: false  });
  }

  handleSelect = id => {
    this.changeStatus('Steps', id);
   // this.setState({ selectedTaskId: id });
   // this.props.menuActive('Steps');
  }

  showAdd = () => {
    this.setState({ showCreateTasks: !this.state.showCreateTasks })
  }

  showSteps = () => {
    this.setState({ showSteps: !this.state.showSteps })
  }

  render() {
    const { projectId } = this.props;
    const { selectedTaskId } = this.state;

    const parameters = {
      currentProjectId: projectId,
    };

    return (
      <Unit
        id={SOURCE_TASK_INFO_ID}
        typeRelationships={TASK_INFO_RELATIONSHIPS}
        query={SOURCE_TASK_INFO_QUERY}
        parameters={parameters}
      >
        {({loading, error, data, refetchQueries}) => {
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`
          };

          const tasks = data.unitData.map(el => flattenData(el));

          return (
            <TasksContainer>
              <AddTask src="/images/add-icon-2.png" alt=""
                onClick={this.showAdd}></AddTask>

              { this.state.showCreateTasks &&
              <TaskCreationForm projectId={projectId} refetchQueries={refetchQueries}/>
              }

              <TasksStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                {tasks && tasks.map(task => (
                  <Task
                    key={v4()}
                    parentId={projectId}
                    task={task}
                    showSteps={this.showSteps}
                    isStepsShow={this.state.showSteps}
                    selected={task.id === selectedTaskId}
                    refetchQueries={refetchQueries}
                    onSelect={this.handleSelect}
                    showCreateTasks={this.state.showCreateTasks}
                  />
                ))}
              </TasksStyleWrapper>
            </TasksContainer>
          );
        }}
      </Unit>
    );
  }
}

export default Tasks;
