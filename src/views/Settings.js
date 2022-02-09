/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import '../theme/Settings.css';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import MainTemplate from '../templates/MainTemplate';
import ToggleButton from '../components/atoms/ToggleButton/ToggleButton';
import Input from '../components/atoms/Input/Input';
import upArrow from '../assets/up-arrow.png';
import downArrow from '../assets/down-arrow.png';

const StyledWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.darkMode === true ? 'black' : 'lightgrey')};
  margin-left: 22px;

  @media (min-width: 480px) {
    margin-left: 70px;
  }
  @media (min-width: 768px) {
    margin-left: 70px;
  }
  @media (min-width: 1024px) {
    margin-left: 100px;
  }
  @media (min-width: 1600px) {
    margin-left: 110px;
  }
`;

const StyledPageHeader = styled.h1`
  text-align: center;
`;
const StyledContent = styled.div`
  text-align: center;
`;
const StyledDarkModeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledPasswordHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease 0.2s;
  margin: auto auto;
  width: 20%;

  :hover {
    opacity: 0.5;
  }
`;
const StyledPasswordContent = styled.div``;

const StyledArrow = styled.img`
  margin-left: 5px;
  background-color: lightgrey;
  border-radius: 50%;
`;

function Settings() {
  const [passwordModal, setPasswordModal] = useState(false);
  const [darkMode, setDarkMode] = useState(document.body.classList.contains('dark-mode'));

  function darkModeFunction() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  }
  return (
    <>
      <MainTemplate />
      <StyledWrapper darkMode={darkMode}>
        <StyledPageHeader>Settings</StyledPageHeader>
        <StyledContent>
          <StyledDarkModeWrapper>
            <h3>Dark mode on/off</h3>
            <ToggleButton
              darkModeFunction={darkModeFunction}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </StyledDarkModeWrapper>

          <StyledPasswordHeader onClick={() => setPasswordModal(!passwordModal)}>
            <h3>Change password</h3>
            <StyledArrow open={passwordModal} src={passwordModal ? upArrow : downArrow} />
          </StyledPasswordHeader>

          <CSSTransition in={passwordModal} timeout={300} classNames="sample" unmountOnExit>
            <StyledPasswordContent>
              <p>Actual password:</p>
              <Input />
              <p>New password:</p>
              <Input />
            </StyledPasswordContent>
          </CSSTransition>

          <p>Change main color</p>
          <p>What else? ;-;</p>
        </StyledContent>
      </StyledWrapper>
    </>
  );
}

export default Settings;
