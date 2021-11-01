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
  margin-left: 500px;
  margin-bottom: 30px;
`;
const StyledButtonIcon = styled(ButtonIcon)``;

const TaskModal = ({ task, hideModal, deleteTask, shownAccId }) => (
  <StyledWrapper>
    <StyledButtonClose onClick={hideModal} />
    {console.log(task)}
    <h1>Hello, TaskModal!</h1>
    Zadanie:{task.title}
    <p />
    Ilośc punktów: {task.extendedProps.points}
    <StyledButtonIcon
      onClick={() => {
        console.log(task);
        deleteTask(task.publicId, shownAccId);
      }}
    >
      Delete
    </StyledButtonIcon>
  </StyledWrapper>
);

TaskModal.propTypes = {
  hideModal: propTypes.func.isRequired,
  task: propTypes.objectOf(propTypes.shape).isRequired,
};

TaskModal.defaultProps = {};

export default TaskModal;
