/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

axios.defaults.withCredentials = true;
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const CHOOSE_ACCOUNT = 'CHOOSE_ACCOUNT';
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const FETCH_CHILDS_REQUEST = 'FETCH_CHILDS_REQUEST';
export const FETCH_CHILDS_SUCCESS = 'FETCH_CHILDS_SUCCESS';
export const FETCH_CHILDS_FAILURE = 'FETCH_CHILDS_FAILURE';
export const CONFIRM_DONE_REQUEST = 'CONFIRM_DONE_REQUEST';
export const CONFIRM_DONE_SUCCESS = 'CONFIRM_DONE_SUCCESS';
export const CONFIRM_DONE_FAILURE = 'CONFIRM_DONE_FAILURE';
export const DELETE_CHILD_REQUEST = 'DELETE_CHILD_REQUEST';
export const DELETE_CHILD_SUCCESS = 'DELETE_CHILD_SUCCESS';
export const DELETE_CHILD_FAILURE = 'DELETE_CHILD_FAILURE';
export const FETCH_PRIZES_REQUEST = 'FETCH_PRIZES_REQUEST';
export const FETCH_PRIZES_SUCCESS = 'FETCH_PRIZES_SUCCESS';
export const FETCH_PRIZES_FAILURE = 'FETCH_PRIZES_FAILURE';
export const ADD_PRIZE_REQUEST = 'ADD_PRIZE_REQUEST';
export const ADD_PRIZE_SUCCESS = 'ADD_PRIZE_SUCCESS';
export const ADD_PRIZE_FAILURE = 'ADD_PRIZE_FAILURE';
export const DELETE_PRIZE_REQUEST = 'DELETE_PRIZE_REQUEST';
export const DELETE_PRIZE_SUCCESS = 'DELETE_PRIZE_SUCCESS';
export const DELETE_PRIZE_FAILURE = 'DELETE_PRIZE_FAILURE';

export const addTask = (values, shownAccId) => (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  axios
    .post('http://localhost:9000/api/addTask', {
      title: values.title,
      date: values.date,
      start: values.start,
      end: values.end,
      points: values.points,
      userID: shownAccId,
    })
    .then(({ data }) => {
      console.log(data);
      console.log('acions');
      dispatch({
        type: ADD_TASK_SUCCESS,
        payload: { data, shownAccId },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_TASK_FAILURE });
    });
};

export const deleteTask = (taskId, shownAccId) => (dispatch) => {
  dispatch({ type: DELETE_TASK_REQUEST });
  return axios
    .post('http://localhost:9000/api/deleteTask', {
      params: {
        taskId,
        shownAccId,
      },
    })
    .then(() => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: {
          taskId,
          shownAccId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_TASK_FAILURE });
    });
};

export const deletePrize = (id) => (dispatch) => {
  console.log(id);
  dispatch({ type: DELETE_TASK_REQUEST });
  return axios
    .post('http://localhost:9000/api/deletePrize', {
      params: {
        id,
      },
    })
    .then(() => {
      dispatch({
        type: DELETE_PRIZE_SUCCESS,
        payload: {
          id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_PRIZE_FAILURE });
    });
};

export const confirmDoneTask = (taskId, shownAccId, points) => (dispatch) => {
  dispatch({ type: CONFIRM_DONE_REQUEST });

  return axios
    .post('http://localhost:9000/api/confirmDoneTask', {
      params: {
        taskId,
        shownAccId,
      },
    })
    .then(() => {
      dispatch({
        type: CONFIRM_DONE_SUCCESS,
        payload: {
          taskId,
          shownAccId,
          points,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: CONFIRM_DONE_FAILURE });
    });
};

export const fetchPrizes = () => (dispatch) => {
  console.log('fetchPrizes');
  return axios
    .get('http://localhost:9000/api/fetchPrizes')
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_PRIZES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_PRIZES_FAILURE });
    });
};
export const addPrize = (values) => (dispatch) => {
  dispatch({ type: ADD_PRIZE_REQUEST });

  return axios
    .post('http://localhost:9000/api/addPrize', {
      params: {
        prize: values,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ADD_PRIZE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_PRIZE_FAILURE });
    });
};

export const fetchChilds = () => (dispatch, getState) => {
  dispatch({ type: FETCH_CHILDS_REQUEST });
  // works only when childAccs array in redux is empty
  if (getState().childAccs.length === 0) {
    console.log('getState().childAccs.length === 0');
    return axios
      .get('http://localhost:9000/api/fetchChilds', {
        params: {
          id: getState().childAccs.map((obj) => obj._id),
        },
      })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: FETCH_CHILDS_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: FETCH_CHILDS_FAILURE });
      });
  }
  // works only when childAccs.events is empty due to flat data
  if (getState().childAccs[0].events.length === 0) {
    console.log('getState().childAccs[0].events.length === 0');
    return axios
      .get('http://localhost:9000/api/fetchChilds', {
        params: {
          id: getState().childAccs.map((obj) => obj._id),
        },
      })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: FETCH_CHILDS_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: FETCH_CHILDS_FAILURE });
      });
  }
  dispatch({
    type: FETCH_CHILDS_SUCCESS,
    payload: {
      data: getState().childAccs,
    },
  });
};

export const chooseAccount = (id) => ({
  type: CHOOSE_ACCOUNT,
  payload: { id },
});

export const register = (username, password) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  return axios
    .post('http://localhost:9000/api/user/register', {
      username,
      password,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: REGISTER_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
    });
};

export const registerChild = (name, username, password, userID, accessLevel) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post('http://localhost:9000/api/user/register', {
      name,
      username,
      password,
      userID,
      accessLevel,
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: REGISTER_SUCCESS, data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
    });
};

export const deleteChild = (id, userID) => (dispatch) => {
  dispatch({ type: DELETE_CHILD_REQUEST });
  return axios
    .post('http://localhost:9000/api/user/deletechild', {
      id,
      userID,
    })
    .then(() => {
      dispatch({ type: DELETE_CHILD_SUCCESS, id, userID });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_CHILD_FAILURE });
    });
};

export const authenticate = (username, password) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  return axios
    .post('http://localhost:9000/api/user/login', {
      username,
      password,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: AUTH_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: AUTH_FAILURE });
    });
};

// export const logout = () => (dispatch) => {
//   // dispatch({ type: LOGOUT_REQUEST });
//   console.log('akcja logout');
//   return axios
//     .post('http://localhost:9000/api/user/logout')
//     .then(dispatch({ type: LOGOUT_SUCCESS }))
//     .catch((err) => {
//       console.log(err);
//       dispatch({ type: LOGOUT_FAILURE });
//     });
// };
