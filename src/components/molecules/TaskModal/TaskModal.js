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
`;
const StyledButtonIcon = styled(ButtonIcon)``;

const TaskModal = ({ task, hideModal, deleteTask, shownAccId, confirmDoneTask }) => (
  <StyledWrapper>
    <h1>Task details</h1>
    <StyledButtonClose onClick={hideModal} />
    {console.log(task)}
    Task:{task.title}
    <p />
    Points: {task.extendedProps.points}
    <p />
    <p />
    <StyledButtonIcon
      onClick={() => {
        console.log(task);
        deleteTask(task.extendedProps._id, shownAccId);
        hideModal();
      }}
    >
      Delete
    </StyledButtonIcon>
    <p /> {task.ui.backgroundColor ? <p>Zadanie wykonane</p> : null}
    {task.ui.backgroundColor ? (
      <StyledButtonIcon
        onClick={() => {
          confirmDoneTask(task.extendedProps._id, shownAccId, task.extendedProps.points);
        }}
      >
        Confirm
      </StyledButtonIcon>
    ) : null}
  </StyledWrapper>
);

TaskModal.propTypes = {
  hideModal: propTypes.func.isRequired,
  task: propTypes.objectOf(propTypes.shape).isRequired,
  deleteTask: propTypes.func.isRequired,
  shownAccId: propTypes.string.isRequired,
};

TaskModal.defaultProps = {};

export default TaskModal;
