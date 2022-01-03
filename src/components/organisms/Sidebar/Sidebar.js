/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import ManagementIcon from '../../../assets/management.png';
import AddTaskIcon from '../../../assets/add.png';
import AddAchievementIcon from '../../../assets/achievement.png';
import SettingsIcon from '../../../assets/settings.png';
import LogoutIcon from '../../../assets/logout.png';
import store from '../../../store/index';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: yellowgreen;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 480px) {
    width: 70px;
  }
  @media (min-width: 768px) {
    width: 70px;
  }
  @media (min-width: 1024px) {
    width: 100px;
  }
  @media (min-width: 1600px) {
    width: 110px;
  }
`;

const StyledLogo = styled.div`
  display: block;
  font-size: 10px;
  text-align: center;
`;

const StyledNav = styled.div`
  position: absolute;
  top: 120px;
  left: 38px;

  @media (min-width: 480px) {
    left: 1px;
  }
  @media (min-width: 768px) {
    left: 1px;
  }
  @media (min-width: 1024px) {
    left: 17px;
  }
  @media (min-width: 1600px) {
    left: 22px;
  }
  @media (min-height: 600px) {
    top: 180px;
  }
`;

const StyledLogout = styled.div`
  margin-top: auto;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  margin-top: 5px;
`;

// stopgap
const myLogout = () => {
  axios.post('http://localhost:9000/api/user/logout');
  sessionStorage.clear();
  location.reload();
};

const Sidebar = () =>
  store.getState().accessLevel === 1 ? (
    <>
      <StyledWrapper>
        <NavLink to="/">
          <StyledLogo>
            <h1>Family ToDo App</h1>
          </StyledLogo>
        </NavLink>
        <StyledNav>
          <NavLink to="/management">
            <StyledButtonIcon icon={ManagementIcon} />
          </NavLink>
          <NavLink to="/addtasks">
            <StyledButtonIcon icon={AddTaskIcon} />
          </NavLink>
          <NavLink to="/prizes">
            <StyledButtonIcon icon={AddAchievementIcon} />
          </NavLink>
          <NavLink to="/settings">
            <StyledButtonIcon icon={SettingsIcon} />
          </NavLink>
        </StyledNav>
        <StyledLogout>
          <ButtonIcon icon={LogoutIcon} onClick={() => myLogout()} />
        </StyledLogout>
      </StyledWrapper>
      )
    </>
  ) : (
    <>
      <StyledWrapper>
        <NavLink to="/">
          <StyledLogo>
            <h1>Family ToDo App</h1>
          </StyledLogo>
        </NavLink>

        <StyledNav>
          <NavLink to="/addtasks">
            <StyledButtonIcon icon={AddTaskIcon} />
          </NavLink>
          <NavLink to="/prizes">
            <StyledButtonIcon icon={AddAchievementIcon} />
          </NavLink>
          <NavLink to="/settings">
            <StyledButtonIcon icon={SettingsIcon} />
          </NavLink>
        </StyledNav>
        <StyledLogout>
          <ButtonIcon icon={LogoutIcon} onClick={() => myLogout()} />
        </StyledLogout>
      </StyledWrapper>
      )
    </>
  );

export default Sidebar;
