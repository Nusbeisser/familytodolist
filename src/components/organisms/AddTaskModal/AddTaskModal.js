/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { CSSTransition } from 'react-transition-group';
import Input from '../../atoms/Input/Input';
// import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import ButtonClose from '../../atoms/ButtonClose/ButtonClose';
import Button from '../../atoms/Button/Button';
import '../../../theme/CSSTransitions.css';

const StyledWrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  margin-top: -600px;
  margin-left: -300px;
  background-color: #cccccc;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
  border-radius: 20px;
  z-index: 999;

  @media (min-width: 480px) {
    margin-top: -600px;
  }
  @media (min-width: 768px) {
    margin-top: -600px;
  }
  @media (min-width: 1024px) {
    margin-top: -250px;
  }
  @media (min-width: 1600px) {
    margin-top: -250px;
  }
`;

const StyledButtonClose = styled(ButtonClose)`
  margin-left: 500px;
  margin-bottom: 30px;
`;
const StyledTextarea = styled.textarea`
  width: 550px;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 30px;
  border: none;
  background-color: #e6e6e6;
`;

const StyledButton = styled(Button)`
  margin-left: 165px;
  margin-top: 5px;
`;
const StyledInput = styled(Input)`
  width: 150px;
`;

const AddTaskModal = ({
  hideModal,
  isAllDayTaskHandler,
  isAllDayTask,
  addTask,
  shownAccId,
  isModalOpen,
}) => (
  <CSSTransition in={isModalOpen} timeout={300} classNames="taskModal" unmountOnExit>
    <StyledWrapper>
      <StyledButtonClose onClick={hideModal} />
      <Formik
        initialValues={{ title: '', date: '', start: '', end: '', points: '' }}
        onSubmit={(values, { resetForm }) => {
          addTask(values, shownAccId);
          resetForm({ values: '' });
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <StyledTextarea
              placeholder="task"
              type="textarea"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p />
            <Input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginRight: '30px' }}
            />
            All day task
            <Input type="checkbox" onChange={() => isAllDayTaskHandler()} />
            <p />
            {isAllDayTask ? (
              <>
                Start time:
                <Input
                  type="time"
                  name="start"
                  value={values.start}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                End time:
                <Input
                  type="time"
                  name="end"
                  value={values.end}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </>
            ) : null}
            <p />
            Points worth:
            <StyledInput
              type="number"
              name="points"
              value={values.points}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <StyledButton type="submit">Add task</StyledButton>
          </Form>
        )}
      </Formik>
    </StyledWrapper>
  </CSSTransition>
);

export default AddTaskModal;
