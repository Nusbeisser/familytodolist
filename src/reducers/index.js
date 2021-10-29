/* eslint-disable no-param-reassign */
import update from 'immutability-helper';
import { ADD_TASK } from '../actions/index';

const initialState = {
  childAccs: [
    {
      id: 1,
      name: 'Luki',
      points: 10,
      tasksDone: 5,
      activeTasks: 999,
      events: [{ id: 'abcd', title: 'event Luki', date: '2021-10-17' }],
    },
    {
      id: 2,
      name: 'Mika',
      points: 100,
      tasksDone: 50,
      activeTasks: 5,
      events: [{ title: 'event Mika', date: '2021-10-17' }],
    },
    {
      id: '3jhjk654654hhygf',
      name: 'Zuzia',
      points: 50,
      tasksDone: 30,
      activeTasks: 10,
      events: [{ title: 'event Zuzia', date: '2021-10-17' }],
    },
  ],
  events: [
    {
      title: 'event 1event 1event 1event 1event 1event 1event 1event 1event 1event 1event 1',
      date: '2021-10-17',
    },
    { title: 'event 1', date: '2021-10-17' },
    { title: 'event 1', date: '2021-10-17' },
    { title: 'event 1', date: '2021-10-17' },
    { title: 'event 1', date: '2021-10-17' },
    { title: 'event 1', date: '2021-10-17' },
    { title: 'event 2', date: '2021-10-18' },
    { title: 'event 3', start: '2021-10-19T12:30:00', end: '2021-10-19T13:30:00' },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      if (action.payload.values.start === '' || action.payload.values.end === '') {
        delete action.payload.values.start;
        delete action.payload.values.end;
      } else {
        action.payload.values.start = `${action.payload.values.date}T${action.payload.values.start}`;
        action.payload.values.end = `${action.payload.values.date}T${action.payload.values.end}`;
      }
      console.log(state.childAccs.findIndex((item) => item.id === action.payload.shownAccId));

      return update(state, {
        childAccs: {
          [state.childAccs.findIndex((item) => item.id === action.payload.shownAccId)]: {
            events: {
              $push: [action.payload.values],
            },
          },
        },
      });

    default:
      return state;
  }
};

export default rootReducer;
