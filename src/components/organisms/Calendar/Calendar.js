/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { connect } from 'react-redux';
import TaskModal from '../../molecules/TaskModal/TaskModal';
import { deleteTask as deleteTaskAction } from '../../../actions/index';

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
    console.log(events);
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
          events={event.events}
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
          />
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (taskId, shownAccId) => dispatch(deleteTaskAction(taskId, shownAccId)),
});

export default connect(null, mapDispatchToProps)(Calendar);
