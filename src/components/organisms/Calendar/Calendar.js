/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { connect } from 'react-redux';
import TaskModal from '../../molecules/TaskModal/TaskModal';
import {
  deleteTask as deleteTaskAction,
  confirmDoneTask as confirmDoneTaskAction,
  taskDone as taskDoneAction,
  taskToImprove as taskToImproveAction,
} from '../../../actions/index';

class Calendar extends React.Component {
  state = {
    task: {},
    isModalOpen: false,
  };

  eventClickHandler = (eventClickInfo) => {
    console.log(eventClickInfo.event._def);
    this.setState({ task: eventClickInfo.event._def });
    this.showModal();
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

  render() {
    const { isModalOpen } = this.state;
    const { events } = this.props;
    const { showModal } = this.props;
    const [event] = events;
    const { task } = this.state;
    const { deleteTask } = this.props;
    const { shownAccId } = this.props;
    const { confirmDoneTask, taskDone, taskToImprove } = this.props;
    const { accessLevel } = this.props;
    return (
      <>
        <FullCalendar
          customButtons={{
            addButton: {
              text: 'Add task',
              click() {
                showModal();
              },
            },
          }}
          dateClick={(e) => {
            console.log(e);
          }}
          eventBorderColor="none"
          aspectRatio="3"
          firstDay="1"
          headerToolbar={{
            center: 'dayGridMonth,timeGridDay,addButton',
          }}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={event ? (accessLevel === 1 ? event.events : events) : []}
          selectable
          editable
          dayMaxEventRows
          navLinks
          eventClick={(eventClickInfo) => this.eventClickHandler(eventClickInfo)}
        />
        {isModalOpen ? (
          <TaskModal
            task={task}
            hideModal={this.hideModal}
            deleteTask={deleteTask}
            shownAccId={shownAccId}
            confirmDoneTask={confirmDoneTask}
            accessLevel={accessLevel}
            taskDone={taskDone}
            taskToImprove={taskToImprove}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ accessLevel }) => ({ accessLevel });

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (taskId, shownAccId) => dispatch(deleteTaskAction(taskId, shownAccId)),
  confirmDoneTask: (taskId, shownAccId, points) =>
    dispatch(confirmDoneTaskAction(taskId, shownAccId, points)),
  taskDone: (taskId, points) => dispatch(taskDoneAction(taskId, points)),
  taskToImprove: (taskId, shownAccId) => dispatch(taskToImproveAction(taskId, shownAccId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
