import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import StepCreationForm from '../StepCreationForm';
import Step from '../Step';

const StepsStyleWrapper = styled.div``;

const StepsContainer = styled.div`
  position: relative;
  width: 678px;

  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StepsHead = styled.div`
  position: relative;
  display: flex;
`;

const StepsTitle = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #606060;
  padding-left: 10px;
`;

const StepsLength = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 1px;
  color: #b7b6b6;
`;

const StepsTotal = styled.span`
  font-size: 12px;
`;

const AddSteps = styled.img(({
  steps
}) => `
  position: absolute;
  right: 53px;
  top: ${steps.length > 0 ? '-8px' : '-10px'};
  cursor: pointer;
  width:50px;

  @media only screen and (max-width: 500px) {
    right: 0;
  }
`);


const Button = styled.button`
  display: block;
  margin: 0 auto;
`;

class Steps extends Component {
  state = {
    selectedStepId: null,
    showCreateSteps: false,
    showGoals: false,
    team: [{name:'user1', photo: '/images/users/user1.png'},
      {name:'user2', photo: '/images/users/user2.png'},
      {name:'user3', photo: '/images/users/user3.png'},
      {name:'user4', photo: '/images/users/user4.png'},
    ],
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
      this.setState({ selectedStepId: null, showGoals: false });
    }
  }

  handleSelect = id => this.setState({ selectedStepId: id });

  showAdd = () => {
    this.setState({ showCreateSteps: !this.state.showCreateSteps })
  }

  showGoals = () => {
    this.setState({ showGoals: !this.state.showGoals })
  }

  render () {
    const { taskId, steps, refetchQueries, onUpdate } = this.props;
    const { selectedStepId } = this.state;

    return (
      <StepsContainer>
        <StepsHead>
          <StepsTitle>Steps <StepsLength>(2/<StepsTotal>4</StepsTotal>)</StepsLength></StepsTitle>
          <AddSteps steps = { steps } src="/images/add-icon.png" alt=""
          onClick={this.showAdd}></AddSteps>
        </StepsHead>
        <StepsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
          {this.state.showCreateSteps &&
            <StepCreationForm
              parentId={taskId}
              refetchQueries={refetchQueries}
            />
          }

          {steps.map(step => (
            <Step
              key={v4()}
              step={step}
              team={this.state.team}
              selected={step.id === selectedStepId}
              onUpdate={onUpdate}
              parentId={taskId}
              refetchQueries={refetchQueries}
              onSelect={this.handleSelect}
              showCreateSteps={this.state.showCreateSteps}
              showGoals={this.showGoals}
              isGoalsShow={this.state.showGoals}
            />
          ))}
        </StepsStyleWrapper>
      </StepsContainer>
    )
  }
}

export default Steps;
