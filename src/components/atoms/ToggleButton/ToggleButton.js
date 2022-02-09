import React from 'react';
import styled from 'styled-components';

const ToggleButton = ({ darkModeFunction, darkMode, setDarkMode }) => (
  <>
    {console.log(document.body.classList.contains('dark-mode'))}
    <CheckBoxWrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        onClick={() => darkModeFunction()}
        checked={darkMode}
        onChange={() => setDarkMode(document.body.classList.contains('dark-mode'))}
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  </>
);

const CheckBoxWrapper = styled.div`
  position: relative;
  margin-left: 30px;
  margin-top: 5px;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: yellowgreen;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export default ToggleButton;
