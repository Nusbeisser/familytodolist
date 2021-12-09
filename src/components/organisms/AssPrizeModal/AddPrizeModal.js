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
  margin-top: 30px;
`;
const StyledInput = styled(Input)`
  width: 150px;
`;

const AddPrizeModal = ({ hideModal, addPrize }) => (
  <StyledWrapper>
    <StyledButtonClose onClick={hideModal} />
    <Formik
      initialValues={{ name: '', cost: '', description: '' }}
      onSubmit={(values, { resetForm }) => {
        addPrize(values);
        resetForm({ values: '' });
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <StyledInput
            style={{ width: '500px' }}
            placeholder="prize name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p />

          <StyledInput
            type="number"
            name="cost"
            placeholder="cost"
            value={values.cost}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p />
          <StyledTextarea
            placeholder="description"
            type="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <StyledButton type="submit">Add price</StyledButton>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

export default AddPrizeModal;
