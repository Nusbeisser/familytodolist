/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default class Calendar extends React.Component {
  state = {};

  eventClickHandler = (eventClickInfo) => {
    console.log(eventClickInfo.event._def.publicId);
  };

  render() {
    const { events } = this.props;
    const { showModal } = this.props;
    const [event] = events;
    console.log(events);
    return (
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
    );
  }
}
