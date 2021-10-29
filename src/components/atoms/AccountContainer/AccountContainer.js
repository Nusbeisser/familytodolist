import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import SampleAvatar from '../../../assets/avatar.png';

const StyledWrapper = styled.div`
  height: 450px;
  width: 35vw;
  top: 70px;
  left: 200px;
  margin-top: 30px;
  box-shadow: 0px 10px 30px -10px hsla(0, 0%, 0%, 0.1);
`;

const StyledHeading = styled.div`
  height: 150px;
  width: 35vw;
  margin-top: 30px;
  background-color: yellowgreen;
  border-radius: 10px;
`;

const StyledAvatar = styled.img`
  border-radius: 100px;
  position: relative;
  height: 140px;
  width: 140px;
  display: inline-block;
`;

const StyledName = styled.div`
  position: relative;
  height: 150px;
  min-width: 150px;
  display: inline-block;
  text-align: center;
  padding-top: 50px;
  padding-left: 20px;
  overflow: auto;
  font-size: 40px;
`;

const StyledInfo = styled.div`
  padding-left: 30px;
  font-size: 40px;
`;

const AccountContainer = ({ name, points, tasksDone, activeTasks, id, tasks, chooseAccount }) =>
  tasks ? (
    <StyledHeading style={{ width: '15vw' }} id={id} onClick={() => chooseAccount(id)}>
      <StyledAvatar src={SampleAvatar} />
      <StyledName>{name}</StyledName>
    </StyledHeading>
  ) : (
    <StyledWrapper>
      <StyledHeading>
        <StyledAvatar src={SampleAvatar} />
        <StyledName>{name}</StyledName>
      </StyledHeading>
      <StyledInfo>
        <p>Points: {points}</p>
        <p>Tasks done: {tasksDone}</p>
        <p>Active tasks: {activeTasks}</p>
      </StyledInfo>
    </StyledWrapper>
  );

AccountContainer.propTypes = {
  name: propTypes.string.isRequired,
  points: propTypes.number.isRequired,
  tasksDone: propTypes.number.isRequired,
  activeTasks: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  tasks: propTypes.bool,
};

AccountContainer.defaultProps = {
  tasks: null,
};

export default AccountContainer;
