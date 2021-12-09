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
`;

const StyledLogo = styled.div`
  display: block;
  font-size: 10px;
`;

const StyledNav = styled.div`
  position: absolute;
  top: 180px;
  left: 38px;
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
            <h1>FamilyToDoApp</h1>
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
            <h1>FamilyToDoApp</h1>
          </StyledLogo>
        </NavLink>
        <NavLink to="/prizes">
          <StyledButtonIcon icon={AddAchievementIcon} />
        </NavLink>
        <StyledNav>
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
