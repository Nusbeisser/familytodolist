/* eslint-disable import/prefer-default-export */

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = (values, shownAccId) => ({
  type: 'ADD_TASK',
  payload: { values, shownAccId },
});

export const deleteTask = (taskId, shownAccId) => ({
  type: 'DELETE_TASK',
  payload: { taskId, shownAccId },
});
