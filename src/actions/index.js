/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import URL from './url';

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
export const TASK_DONE_REQUEST = 'TASK_DONE_REQUEST';
export const TASK_DONE_SUCCESS = 'TASK_DONE_SUCCESS';
export const TASK_DONE_FAILURE = 'TASK_DONE_FAILURE';
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
export const TASK_IMPROVE_REQUEST = 'TASK_IMPROVE_REQUEST';
export const TASK_IMPROVE_SUCCESS = 'TASK_IMPROVE_SUCCESS';
export const TASK_IMPROVE_FAILURE = 'TASK_IMPROVE_FAILURE';
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const PURCHASE_PRIZE_REQUEST = 'PURCHASE_PRIZE_REQUEST';
export const PURCHASE_PRIZE_SUCCESS = 'PURCHASE_PRIZE_SUCCESS';
export const PURCHASE_PRIZE_FAILURE = 'PURCHASE_PRIZE_FAILURE';
export const FETCH_PURCHASEDPRIZES_REQUEST = 'FETCH_PURCHASEDPRIZES_REQUEST';
export const FETCH_PURCHASEDPRIZES_SUCCESS = 'FETCH_PURCHASEDPRIZES_SUCCESS';
export const FETCH_PURCHASEDPRIZES_FAILURE = 'FETCH_PURCHASEDPRIZES_FAILURE';
export const PRIZE_REALIZED_REQUEST = 'PRIZE_REALIZED_REQUEST';
export const PRIZE_REALIZED_SUCCESS = 'PRIZE_REALIZED_SUCCESS';
export const PRIZE_REALIZED_FAILURE = 'PRIZE_REALIZED_FAILURE';

export const addTask = (values, shownAccId) => (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  axios
    .post(`${URL}/api/addTask`, {
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
    .post(`${URL}/api/deleteTask`, {
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
    .post(`${URL}/api/deletePrize`, {
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
export const taskToImprove = (taskId, shownAccId) => (dispatch) => {
  dispatch({ type: TASK_IMPROVE_REQUEST });
  return axios
    .post(`${URL}/api/taskImprove`, {
      params: {
        taskId,
        shownAccId,
      },
    })
    .then(() => {
      dispatch({
        type: TASK_IMPROVE_SUCCESS,
        payload: {
          taskId,
          shownAccId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: TASK_IMPROVE_FAILURE });
    });
};
export const taskDone = (taskId) => (dispatch, getState) => {
  dispatch({ type: TASK_DONE_REQUEST });

  return axios
    .post(`${URL}/api/taskDone`, {
      params: {
        taskId,
      },
    })
    .then(() => {
      dispatch({
        type: TASK_DONE_SUCCESS,
        payload: {
          taskId,
          id: getState().userID,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: TASK_DONE_FAILURE });
    });
};
export const confirmDoneTask = (taskId, shownAccId, points) => (dispatch) => {
  dispatch({ type: CONFIRM_DONE_REQUEST });

  return axios
    .post(`${URL}/api/confirmDoneTask`, {
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
  dispatch({ type: FETCH_PRIZES_REQUEST });
  console.log('fetchPrizes');
  return axios
    .get(`${URL}/api/fetchPrizes`)
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

export const fetchPurchasedPrizes = () => (dispatch) => {
  dispatch({ type: FETCH_PURCHASEDPRIZES_REQUEST });
  console.log('fetchPurchasedPrizes');
  return axios
    .get(`${URL}/api/fetchPurchasedPrizes`)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_PURCHASEDPRIZES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_PURCHASEDPRIZES_FAILURE });
    });
};

export const addPrize = (values) => (dispatch) => {
  dispatch({ type: ADD_PRIZE_REQUEST });

  return axios
    .post(`${URL}/api/addPrize`, {
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

export const prizeRealized = (id, ownerId, ownerName) => (dispatch) => {
  dispatch({ type: PRIZE_REALIZED_REQUEST });

  return axios
    .post(`${URL}/api/prizeRealized`, {
      params: {
        id,
        ownerId,
      },
    })
    .then(() => {
      dispatch({ type: PRIZE_REALIZED_SUCCESS, payload: { id, ownerId, ownerName } });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: PRIZE_REALIZED_FAILURE });
    });
};

export const purchasePrize = (id, name, cost, description) => (dispatch) => {
  dispatch({ type: PURCHASE_PRIZE_REQUEST });
  console.log(name);
  return axios
    .post(`${URL}/api/purchasePrize`, {
      params: {
        _id: id,
        name,
        cost,
        description,
      },
    })
    .then(() => {
      dispatch({ type: PURCHASE_PRIZE_SUCCESS, payload: { _id: id, name, cost, description } });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: PURCHASE_PRIZE_FAILURE });
    });
};

export const fetchEvents = () => (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });

  return axios
    .get(`${URL}/api/fetchEvents`, {})
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_EVENTS_FAILURE });
    });
};

export const fetchChilds = () => (dispatch, getState) => {
  dispatch({ type: FETCH_CHILDS_REQUEST });
  // works only when childAccs array in redux is empty
  if (getState().childAccs.length === 0) {
    console.log('getState().childAccs.length === 0');
    return axios
      .get(`${URL}/api/fetchChilds`, {
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
      .get(`${URL}/api/fetchChilds`, {
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
    .post(`${URL}/api/user/register`, {
      username,
      password,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: REGISTER_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err.response.data);
      // console.log(response);
      const message = err.response.data;
      dispatch({ type: REGISTER_FAILURE, message });
    });
};

export const registerChild = (name, username, password, userID, accessLevel) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`${URL}/api/user/register`, {
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
    .post(`${URL}/api/user/deletechild`, {
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
    .post(`${URL}/api/user/login`, {
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
