/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import AccountContainer from '../components/atoms/AccountContainer/AccountContainer';
import MainTemplate from '../templates/MainTemplate';
import Calendar from '../components/organisms/Calendar/Calendar';
import AddTaskModal from '../components/organisms/AddTaskModal/AddTaskModal';
import {
  addTask as addTaskAction,
  chooseAccount as chooseAccountAction,
  fetchChilds as fetchChildsAction,
  fetchEvents as fetchEventsAction,
} from '../actions/index';

const StyledWrapper = styled.div`
  position: relative;
  width: 80%;
  top: 70px;
  left: 12.5vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
`;

const StyledCalendarWrapper = styled.div`
  position: relative;
  display: block;
  top: 100px;
  left: 12.5vw;
  width: 80%;

  background-color: yellowgreen;
`;

class AddTasks extends React.Component {
  state = {
    isModalOpen: false,
    isAllDayTask: true,
  };

  componentDidMount() {
    const { accessLevel } = this.props;
    const { fetchChilds } = this.props;
    const { fetchEvents } = this.props;
    accessLevel > 0 ? fetchChilds() : fetchEvents();
  }

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
    this.setState((prevState) => ({
      isAllDayTask: !prevState.isAllDayTask,
    }));
  };

  // chooseAccount = (id) => {
  //   this.setState({
  //     shownAccId: id,
  //   });
  // };

  render() {
    const { isModalOpen } = this.state;
    const { isAllDayTask } = this.state;
    const { addTask } = this.props;
    const { childAccs } = this.props;
    const { shownAccId } = this.props;
    const { chooseAccount, accessLevel } = this.props;
    const { events } = this.props;

    return accessLevel > 0 ? (
      <>
        <MainTemplate />
        <StyledWrapper>
          {childAccs.map(({ name, points, tasksDone, activeTasks, _id }) => (
            <AccountContainer
              id={_id}
              name={name}
              points={points}
              tasksDone={tasksDone}
              activeTasks={activeTasks}
              key={_id}
              tasks
              chooseAccount={chooseAccount}
              active={_id === shownAccId ? true : null}
            />
          ))}
        </StyledWrapper>
        <StyledCalendarWrapper>
          <Calendar
            showModal={this.showModal}
            events={childAccs.filter((item) => item._id === shownAccId)}
            shownAccId={shownAccId}
          />
        </StyledCalendarWrapper>
        <AddTaskModal
          isModalOpen={isModalOpen}
          hideModal={this.hideModal}
          isAllDayTaskHandler={this.isAllDayTaskHandler}
          isAllDayTask={isAllDayTask}
          addTask={addTask}
          shownAccId={shownAccId}
        />
      </>
    ) : (
      <>
        <MainTemplate />
        <StyledCalendarWrapper>
          <Calendar events={events} />
        </StyledCalendarWrapper>
      </>
    );
  }
}

const mapStateToProps = ({ childAccs, events, shownAccId, accessLevel }) => ({
  childAccs,
  events,
  shownAccId,
  accessLevel,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (values, shownAccId) => dispatch(addTaskAction(values, shownAccId)),
  chooseAccount: (id) => dispatch(chooseAccountAction(id)),
  fetchChilds: (id) => dispatch(fetchChildsAction(id)),
  fetchEvents: () => dispatch(fetchEventsAction()),
});
AddTasks.propTypes = {
  addTask: propTypes.func.isRequired,
  childAccs: propTypes.arrayOf(propTypes.object),
  fetchChilds: propTypes.func,
  shownAccId: propTypes.string,
  chooseAccount: propTypes.func,
  accessLevel: propTypes.number.isRequired,
  events: propTypes.arrayOf(propTypes.object),
  fetchEvents: propTypes.func.isRequired,
};

AddTasks.defaultProps = {
  childAccs: null,
  fetchChilds: null,
  shownAccId: null,
  chooseAccount: null,
  events: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTasks);
