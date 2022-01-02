/* eslint-disable no-case-declarations */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
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
  ADD_PRIZE_SUCCESS,
  FETCH_PRIZES_SUCCESS,
  DELETE_PRIZE_SUCCESS,
  PURCHASE_PRIZE_SUCCESS,
  TASK_DONE_SUCCESS,
  TASK_IMPROVE_SUCCESS,
  FETCH_EVENTS_SUCCESS,
  FETCH_PURCHASEDPRIZES_SUCCESS,
  PRIZE_REALIZED_SUCCESS,
} from '../actions/index';

const initialState = {
  userID: sessionStorage.getItem('userID') ? JSON.parse(sessionStorage.getItem('userID')) : '',
  accessLevel: sessionStorage.getItem('lvl') ? JSON.parse(sessionStorage.getItem('lvl')) : '0',
  authed: sessionStorage.getItem('authed') ? JSON.parse(sessionStorage.getItem('authed')) : false,
  childAccs: [],
  prizes: [],
  purchasedPrizes: {},
  events: [],
  points: 0,
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

    case DELETE_PRIZE_SUCCESS:
      console.log(action.payload.id);
      return {
        ...state,
        prizes: state.prizes.filter((item) => item._id !== action.payload.id),
      };

    case PURCHASE_PRIZE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        purchasedPrizes: [...state.purchasedPrizes, action.payload],
        points: state.points - action.payload.cost,
      };

    case PRIZE_REALIZED_SUCCESS:
      console.log('PRIZE_REALIZED_SUCCESS');
      console.log(action.payload);
      const newArray = state.purchasedPrizes[action.payload.ownerName].filter(
        (item) => item._id !== action.payload.id,
      );
      return update(state, {
        purchasedPrizes: {
          [action.payload.ownerName]: { $set: newArray },
        },
      });

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
        shownAccId: action.payload.data[0]._id,
      };

    case FETCH_EVENTS_SUCCESS:
      console.log('FETCH_EVENTS_SUCCES');
      return {
        ...state,
        events: action.payload.data,
      };

    case TASK_DONE_SUCCESS:
      console.log('TASK_DONE_SUCCESS');

      return update(state, {
        events: {
          [state.events.findIndex((item) => item._id === action.payload.taskId)]: {
            $merge: { color: 'red' },
          },
        },
      });

    case TASK_IMPROVE_SUCCESS:
      const eventsArray =
        state.childAccs[state.childAccs.findIndex((item) => item._id === action.payload.shownAccId)]
          .events;
      const eventIndex = eventsArray.findIndex((item) => item._id === action.payload.taskId);

      const childIndex = state.childAccs.findIndex(
        (item) => item._id === action.payload.shownAccId,
      );

      return update(state, {
        childAccs: {
          [childIndex]: {
            events: {
              [eventIndex]: {
                $merge: { color: '' },
              },
            },
          },
        },
      });

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

      // need some hash or something
      sessionStorage.setItem('userID', JSON.stringify(action.payload.data._id));
      sessionStorage.setItem('lvl', JSON.stringify(action.payload.data.accessLevel));
      sessionStorage.setItem('authed', JSON.stringify(true));

      if (action.payload.data.childAccs.length === 0 && !action.payload.data.parentID) {
        return {
          ...state,
          userID: action.payload.data._id,
          childAccs: action.payload.data.childAccs,
          shownAccId: null,
          accessLevel: action.payload.data.accessLevel,
          authed: true,
        };
      }

      if (!action.payload.data.parentID && action.payload.data.childAccs[0]._id) {
        return {
          ...state,
          userID: action.payload.data._id,
          childAccs: action.payload.data.childAccs,
          shownAccId: action.payload.data.childAccs[0]._id,
          accessLevel: action.payload.data.accessLevel,
          authed: true,
        };
      }

      return {
        ...state,
        userID: action.payload.data._id,
        events: action.payload.data.events,
        accessLevel: action.payload.data.accessLevel,
        authed: true,
        points: action.payload.data.points,
      };

    case CHOOSE_ACCOUNT:
      return {
        ...state,
        shownAccId: action.payload.id,
      };

    case ADD_PRIZE_SUCCESS:
      console.log('ADD_PRIZE_SUCCESS');
      return {
        ...state,
        prizes: [...state.prizes, action.payload.data],
      };

    case FETCH_PRIZES_SUCCESS:
      console.log('FETCH_PRIZES_SUCCES');
      console.log(action.payload.data);
      return {
        ...state,
        prizes: action.payload.data.prizes,
        points: action.payload.data.points,
      };

    case FETCH_PURCHASEDPRIZES_SUCCESS:
      console.log('FETCH_PURCHASED_PRIZES');
      console.log(action.payload.data);
      console.log(Object.keys(action.payload.data));
      return {
        ...state,
        purchasedPrizes: action.payload.data,
      };

    default:
      return state;

    // case LOGOUT_SUCCESS:
    //   return null;
  }
};

export default rootReducer;
