/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import ButtonClose from '../../atoms/ButtonClose/ButtonClose';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';

const StyledWrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  top: 0vh;
  left: 27vw;
  background-color: #cccccc;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
  border-radius: 20px;
  z-index: 999;
`;
const StyledButtonClose = styled(ButtonClose)`
  position: absolute;
  top: 50px;
  margin-left: 500px;
  margin-bottom: 30px;
  cursor: pointer;
`;
const StyledButtonIcon = styled(ButtonIcon)`
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
`;

const TaskModal = ({
  task,
  hideModal,
  deleteTask,
  shownAccId,
  confirmDoneTask,
  accessLevel,
  taskDone,
  taskToImprove,
}) => (
  <StyledWrapper>
    <h1>Task details</h1>
    <StyledButtonClose onClick={hideModal} />
    {console.log(task)}
    Task:{task.title}
    <p />
    Points: {task.extendedProps.points}
    <p />
    <p />
    {accessLevel > 0 ? (
      <StyledButtonIcon
        onClick={() => {
          console.log(task);
          deleteTask(task.extendedProps._id, shownAccId);
          hideModal();
        }}
      >
        Delete
      </StyledButtonIcon>
    ) : !task.ui.backgroundColor ? (
      <StyledButtonIcon
        onClick={() => {
          console.log(task);
          taskDone(task.extendedProps._id);
          hideModal();
        }}
      >
        Done
      </StyledButtonIcon>
    ) : (
      <p>Task completed, waiting for verification.</p>
    )}
    {task.ui.backgroundColor && accessLevel > 0 ? <p>Task completed</p> : null}
    {task.ui.backgroundColor && accessLevel > 0 ? (
      <>
        <StyledButtonIcon
          onClick={() => {
            confirmDoneTask(task.extendedProps._id, shownAccId, task.extendedProps.points);
          }}
        >
          Confirm task
        </StyledButtonIcon>
        <StyledButtonIcon
          onClick={() => {
            taskToImprove(task.extendedProps._id, shownAccId);
          }}
        >
          To correct
        </StyledButtonIcon>
      </>
    ) : null}
  </StyledWrapper>
);

TaskModal.propTypes = {
  hideModal: propTypes.func.isRequired,
  task: propTypes.objectOf(propTypes.shape).isRequired,
  deleteTask: propTypes.func.isRequired,
  shownAccId: propTypes.string.isRequired,
  confirmDoneTask: propTypes.func.isRequired,
  accessLevel: propTypes.number.isRequired,
  taskDone: propTypes.func.isRequired,
  taskToImprove: propTypes.func.isRequired,
};

TaskModal.defaultProps = {};

export default TaskModal;
