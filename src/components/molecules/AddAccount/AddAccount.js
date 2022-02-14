import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { CSSTransition } from 'react-transition-group';
import Input from '../../atoms/Input/Input';
import ButtonClose from '../../atoms/ButtonClose/ButtonClose';
import Button from '../../atoms/Button/Button';
import './AddAccount.css';

const StyledWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  //margin-top: -300px;
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
  max-width: 400px;
`;
const StyledButtonClose = styled(ButtonClose)`
  margin-left: 400px;
  //margin-bottom: 30px;
`;
const StyledButton = styled(Button)`
  //margin-top: 100px;
  margin-left: 110px;
`;

function AddAccount({ closeAddAccount, registerChild, userID, isAddAccountOpen }) {
  const [nameError, setNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [accountCreated, setAccountCreated] = useState(null);

  const registerChildValidate = (username, name, password, userID, accessLevel) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+$/i;
    if (!name) {
      errors.name = 'Cannot be blank';
    } else if (!regex.test(name)) {
      errors.name = 'Invalid format, only letters and numbers allowed';
    }
    if (!username) {
      errors.username = 'Cannot be blank';
    } else if (!regex.test(username)) {
      errors.username = 'Invalid format, only letters and numbers allowed';
    }
    if (!password) {
      errors.password = 'Cannot be blank';
    } else if (password.length < 5) {
      errors.password = 'Password must be more than 5 characters';
    }
    if (errors.username || errors.password || errors.name) {
      setNameError(errors.name);
      setUsernameError(errors.username);
      setPasswordError(errors.password);
      setAccountCreated(null);
    } else {
      setUsernameError(null);
      setPasswordError(null);
      setNameError(null);
      setAccountCreated('Account created!');
      console.log('child acc created');
      registerChild(name, username, password, userID, accessLevel);
    }
  };

  const clearState = () => {
    setUsernameError(null);
    setPasswordError(null);
    setNameError(null);
    setAccountCreated(null);
    closeAddAccount();
  };
  return (
    <CSSTransition in={isAddAccountOpen} timeout={1000} classNames="addModal" unmountOnExit>
      <StyledWrapper>
        <StyledButtonClose onClick={() => clearState()} />
        <Formik
          initialValues={{ name: '', username: '', password: '' }}
          onSubmit={({ name, username, password }) => {
            const accessLevel = 0;
            registerChildValidate(username, name, password, userID, accessLevel);
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <span style={{ color: 'yellowgreen' }}>{accountCreated}</span>
              <StyledInput
                placeholder="Name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: 'red', fontSize: '15px' }}>{nameError}</span>
              <StyledInput
                placeholder="Login"
                type="login"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: 'red', fontSize: '15px' }}>{usernameError}</span>
              <StyledInput
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: 'red', fontSize: '15px' }}>{passwordError}</span>

              <StyledButton type="submit">CREATE ACCOUNT</StyledButton>
            </Form>
          )}
        </Formik>
      </StyledWrapper>
    </CSSTransition>
  );
}

AddAccount.propTypes = {
  closeAddAccount: propTypes.func.isRequired,
  registerChild: propTypes.func.isRequired,
  userID: propTypes.string,
  isAddAccountOpen: propTypes.bool.isRequired,
};
AddAccount.defaultProps = {
  userID: null,
};

export default AddAccount;
