/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import AccountContainer from '../components/atoms/AccountContainer/AccountContainer';
import Sidebar from '../components/organisms/Sidebar/Sidebar';
import MainTemplate from '../templates/MainTemplate';
import Calendar from '../components/organisms/Calendar/Calendar';
import MyModal from '../components/organisms/Modal/Modal';
import { addTask as addTaskAction } from '../actions/index';

const StyledWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 12.5vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 185px;
  background-color: blue;
`;

const StyledCalendarWrapper = styled.div`
  position: absolute;
  display: block;
  top: 300px;
  left: 12.5vw;
  width: 80%;

  background-color: yellowgreen;
`;

class AddTasks extends React.Component {
  state = {
    isModalOpen: false,
    shownAccId: 1,
    isAllDayTask: true,
  };

  showModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  hideModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  isAllDayTaskHandler = () => {
    this.setState({
      isAllDayTask: !this.state.isAllDayTask,
    });
  };

  chooseAccount = (id) => {
    this.setState({
      shownAccId: id,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { isAllDayTask } = this.state;
    const { addTask } = this.props;
    const { childAccs } = this.props;
    const { shownAccId } = this.state;
    return (
      <>
        <MainTemplate />
        <Sidebar />
        <StyledWrapper>
          {childAccs.map(({ name, points, tasksDone, activeTasks, id }) => (
            <AccountContainer
              id={id}
              name={name}
              points={points}
              tasksDone={tasksDone}
              activeTasks={activeTasks}
              key={id}
              tasks
              chooseAccount={this.chooseAccount}
            />
          ))}
        </StyledWrapper>
        <StyledCalendarWrapper>
          <Calendar
            showModal={this.showModal}
            events={childAccs.filter((item) => item.id === shownAccId)}
          />
        </StyledCalendarWrapper>
        {isModalOpen ? (
          <MyModal
            hideModal={this.hideModal}
            isAllDayTaskHandler={this.isAllDayTaskHandler}
            isAllDayTask={isAllDayTask}
            addTask={addTask}
            shownAccId={shownAccId}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ childAccs, events }) => ({ childAccs, events });

const mapDispatchToProps = (dispatch) => ({
  addTask: (values, shownAccId) => dispatch(addTaskAction(values, shownAccId)),
});
// ^^^ nie przekazuje id z modala tu trzeba pomodzić
AddTasks.propTypes = {
  events: propTypes.arrayOf(propTypes.object),
  addTask: propTypes.func.isRequired,
  childAccs: propTypes.arrayOf(propTypes.object),
};

AddTasks.defaultProps = {
  events: null,
  childAccs: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTasks);
