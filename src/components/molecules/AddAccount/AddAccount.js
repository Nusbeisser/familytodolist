import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Input from '../../atoms/Input/Input';
import ButtonClose from '../../atoms/ButtonClose/ButtonClose';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: 22vh;
  left: 40vw;
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

const AddAccount = ({ closeAddAccount }) => (
  <StyledWrapper>
    <StyledButtonClose onClick={closeAddAccount} />
    <StyledInput placeholder="Name" type="text" />
    <StyledInput placeholder="Login" type="login" />
    <StyledInput placeholder="Password" type="password" />
    <StyledButton>CREATE ACCOUNT</StyledButton>
  </StyledWrapper>
);

AddAccount.propTypes = {
  closeAddAccount: propTypes.func.isRequired,
};

export default AddAccount;
