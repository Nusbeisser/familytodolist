/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Input from '../../atoms/Input/Input';
// import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import ButtonClose from '../../atoms/ButtonClose/ButtonClose';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  top: 22vh;
  left: 40vw;
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
  margin-top: 110px;
`;
// zmienić na klasę i przerzucić isAllDayTaskHandler i isAllDayTask tutaj
const MyModal = ({ hideModal, isAllDayTaskHandler, isAllDayTask, addTask, shownAccId }) => (
  <StyledWrapper>
    <StyledButtonClose onClick={hideModal} />
    <Formik
      initialValues={{ title: '', date: '', start: '', end: '' }}
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
          <StyledButton type="submit">Add task</StyledButton>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

export default MyModal;
