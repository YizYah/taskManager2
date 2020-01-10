import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import GoalCreationForm from '../GoalCreationForm';
import Goal from '../Goal';

const GoalsStyleWrapper = styled.div``;

const GoalsHead = styled.div`
  position: relative;
  display: flex;
  padding: 20px 0 0;
`;

const GoalsTitle = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 36px;
  color: #FFFFFF;
  padding-left: 10px;
`;

const GoalsLength = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 1px;
  color: #B4EAFB;
`;

const GoalsTotal = styled.span`
  font-size: 12px;
`;

const AddGoals = styled.img`
  width:50px;
  position: absolute;
  right: 0;
  top: 10px
  cursor: pointer;
`;

class Goals extends Component {
  state = {
    selectedGoalId: null,
    showCreateGoal: false
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
      this.setState({ selectedGoalId: null });
    }
  }

  handleSelect = id => this.setState({ selectedGoalId: id });

  showAdd = () => {
    this.setState({ showCreateGoal: !this.state.showCreateGoal })
  }

  render () {
    const { stepId, goals, refetchQueries, onUpdate } = this.props;
    const { selectedGoalId } = this.state;

    return (
      <GoalsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <GoalsHead>
          <GoalsTitle>Goals <GoalsLength>(2/<GoalsTotal>4</GoalsTotal>)</GoalsLength></GoalsTitle>
          <AddGoals src="/images/add-icon.png" alt=""
          onClick={this.showAdd}></AddGoals>
        </GoalsHead>
        {this.state.showCreateGoal &&
          <GoalCreationForm
            parentId={stepId}
            refetchQueries={refetchQueries}
          />
        }

        {goals.map(goal => (
          <Goal
            key={v4()}
            goal={goal}
            selected={goal.id === selectedGoalId}
            onUpdate={onUpdate}
            parentId={stepId}
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        ))}
      </GoalsStyleWrapper>
    )
  }
}

export default Goals;
