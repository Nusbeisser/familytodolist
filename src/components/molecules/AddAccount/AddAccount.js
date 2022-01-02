import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Input from '../../atoms/Input/Input';
import ButtonClose from '../../atoms/ButtonClose/ButtonClose';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -250px;
  background-color: #cccccc;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
  border-radius: 20px;
`;

const StyledInput = styled(Input)`
  display: block;
  margin: 10px;
`;
const StyledButtonClose = styled(ButtonClose)`
  margin-left: 400px;
  margin-bottom: 30px;
`;
const StyledButton = styled(Button)`
  margin-top: 100px;
  margin-left: 110px;
`;

const AddAccount = ({ closeAddAccount, registerChild, userID }) => (
  <StyledWrapper>
    <StyledButtonClose onClick={closeAddAccount} />
    <Formik
      initialValues={{ name: '', username: '', password: '' }}
      onSubmit={({ name, username, password }) => {
        console.log(name, username, password);
        const accessLevel = 0;
        registerChild(name, username, password, userID, accessLevel);
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form>
          <StyledInput
            placeholder="Name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <StyledInput
            placeholder="Login"
            type="login"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <StyledInput
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <StyledButton type="submit">CREATE ACCOUNT</StyledButton>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

AddAccount.propTypes = {
  closeAddAccount: propTypes.func.isRequired,
  registerChild: propTypes.func.isRequired,
  userID: propTypes.string,
};
AddAccount.defaultProps = {
  userID: null,
};

export default AddAccount;
