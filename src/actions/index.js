/* eslint-disable import/prefer-default-export */

export const ADD_TASK = 'ADD_TASK';

export const addTask = (values, shownAccId) => ({
  type: 'ADD_TASK',
  payload: { values, shownAccId },
});
