/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import update from 'immutability-helper';
import {
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_SUCCESS,
  CHOOSE_ACCOUNT,
  FETCH_CHILDS_SUCCESS,
  CONFIRM_DONE_SUCCESS,
  DELETE_CHILD_SUCCESS,
} from '../actions/index';

const initialState = {
  userID: '',
  mainAcc: { id: '12acbjk', name: 'Gienio', accessLevel: 1 },
  childAccs: [
    {
      id: 1,
      name: 'Luki',
      points: 10,
      tasksDone: 5,
      activeTasks: 999,
      events: [
        { id: 'abcd', title: 'event Luki', date: '2021-11-07', points: 50 },
        { id: 'abcde', title: 'event Luki2', date: '2021-11-08', points: 50, color: 'green' },
      ],
    },
    {
      id: 2,
      name: 'Mika',
      points: 100,
      tasksDone: 50,
      activeTasks: 5,
      events: [{ id: 'cdba', title: 'event Mika', date: '2021-11-07' }],
    },
    {
      id: '3jhjk654654hhygf',
      name: 'Zuzia',
      points: 50,
      tasksDone: 30,
      activeTasks: 10,
      events: [
        { id: 'aaaa', title: 'event Zuzia', date: '2021-11-07' },
        {
          id: 'jhkwjh',
          title: 'event 2564564',
          date: '2021-10-18',
          start: '2021-10-18T12:30:00',
          end: '2021-10-18T13:30:00',
        },
      ],
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
    {
      title: 'event 2564564',
      date: '2021-10-18',
      start: '2021-10-18T12:30:00',
      end: '2021-10-18T13:30:00',
    },
    { title: 'event 3', start: '2021-10-19T12:30:00', end: '2021-10-19T13:30:00' },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      // if (action.payload.values.start === '' || action.payload.values.end === '') {
      //   delete action.payload.values.start;
      //   delete action.payload.values.end;
      // } else {
      //   action.payload.values.start = `${action.payload.values.date}T${action.payload.values.start}`;
      //   action.payload.values.end = `${action.payload.values.date}T${action.payload.values.end}`;
      // }
      // console.log(state.childAccs.findIndex((item) => item._id === action.payload.shownAccId));
      // action.payload.values.id = Math.random().toString(36).substr(2, 9);
      return update(state, {
        childAccs: {
          [state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)]: {
            events: {
              $push: [action.payload.data],
            },
          },
        },
      });
    case DELETE_TASK_SUCCESS: {
      console.log(action.payload.taskId);
      console.log(state.childAccs.findIndex((item) => item._id === action.payload.shownAccId));

      console.log(
        state.childAccs[
          state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)
        ].events.filter((item) => item._id !== action.payload.taskId),
      );

      return update(state, {
        childAccs: {
          [state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)]: {
            events: {
              $set: state.childAccs[
                state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)
              ].events.filter((item) => item._id !== action.payload.taskId),
            },
          },
        },
      });
    }

    case DELETE_CHILD_SUCCESS:
      console.log('DELETE_CHILD_SUCCES');
      console.log(action.id);
      console.log(action.userID);
      return {
        ...state,
        childAccs: state.childAccs.filter((item) => item._id !== action.id),
      };

    case REGISTER_SUCCESS:
      console.log('User Registered');
      console.log(action.data);
      return {
        ...state,
        childAccs: [...state.childAccs, action.data],
      };

    case FETCH_CHILDS_SUCCESS:
      console.log('FETCH_CHILDS_SUCCESS');
      console.log(action.payload.data);
      return {
        ...state,
        childAccs: action.payload.data,
      };

    case CONFIRM_DONE_SUCCESS:
      console.log('CONFIRM_DONE_SUCCESS');
      return update(state, {
        childAccs: {
          [state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)]: {
            events: {
              $set: state.childAccs[
                state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)
              ].events.filter((item) => item._id !== action.payload.taskId),
            },
            points: {
              $apply(x) {
                return x + action.payload.points;
              },
            },
          },
        },
      });

    case AUTH_SUCCESS:
      console.log(action.payload.data);

      if (action.payload.data.childAccs.length === 0 && !action.payload.data.parentID) {
        return {
          userID: action.payload.data._id,
          childAccs: action.payload.data.childAccs,
          shownAccId: null,
          accessLevel: action.payload.data.accessLevel,
        };
      }

      if (!action.payload.data.parentID && action.payload.data.childAccs[0]._id) {
        return {
          userID: action.payload.data._id,
          childAccs: action.payload.data.childAccs,
          shownAccId: action.payload.data.childAccs[0]._id,
          accessLevel: action.payload.data.accessLevel,
        };
      }

      return {
        userID: action.payload.data._id,
        events: action.payload.data.events,
        accessLevel: action.payload.data.accessLevel,
      };

    case CHOOSE_ACCOUNT:
      return {
        ...state,
        shownAccId: action.payload.id,
      };

    default:
      return state;
  }
};

export default rootReducer;
