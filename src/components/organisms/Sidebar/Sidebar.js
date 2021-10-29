import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import ManagementIcon from '../../../assets/management.png';
import AddTaskIcon from '../../../assets/add.png';
import AddAchievementIcon from '../../../assets/achievement.png';
import SettingsIcon from '../../../assets/settings.png';
import LogoutIcon from '../../../assets/logout.png';

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

const konsolka = () => {
  console.log('konsolowanko nananananko');
};

const Sidebar = () => (
  <StyledWrapper>
    <NavLink to="/">
      <StyledLogo>
        <h1>FamilyToDoApp</h1>
      </StyledLogo>
    </NavLink>
    <StyledNav>
      <NavLink to="/management">
        <StyledButtonIcon icon={ManagementIcon} onClick={konsolka} />
      </NavLink>
      <NavLink to="/addtasks">
        <StyledButtonIcon icon={AddTaskIcon} onClick={konsolka} />
      </NavLink>
      <StyledButtonIcon icon={AddAchievementIcon} onClick={konsolka} />
      <StyledButtonIcon icon={SettingsIcon} onClick={konsolka} />
    </StyledNav>
    <StyledLogout>
      <ButtonIcon icon={LogoutIcon} onClick={konsolka} />
    </StyledLogout>
  </StyledWrapper>
);

export default Sidebar;
