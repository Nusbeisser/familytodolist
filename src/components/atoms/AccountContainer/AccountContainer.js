/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import SampleAvatar from '../../../assets/avatar.png';
import deleteIcon from '../../../assets/delete.png';

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

const StyledDeleteIcon = styled.img`
  position: relative;
  top: -40px;
  left: 500px;
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

const AccountContainer = ({
  name,
  points,
  tasksDone,
  activeTasks,
  id,
  tasks,
  chooseAccount,
  deleteChild,
  userID,
  active,
}) =>
  // clear for management, tasks for AddTasks
  tasks ? (
    // active for choosen child
    active ? (
      <StyledHeading
        style={{ width: '15vw', cursor: 'pointer', border: '1px solid white', color: 'white' }}
        id={id}
        onClick={() => chooseAccount(id)}
      >
        <StyledAvatar src={SampleAvatar} />
        <StyledName>{name}</StyledName>
      </StyledHeading>
    ) : (
      <StyledHeading
        style={{ width: '15vw', cursor: 'pointer' }}
        id={id}
        onClick={() => chooseAccount(id)}
      >
        <StyledAvatar src={SampleAvatar} />
        <StyledName>{name}</StyledName>
      </StyledHeading>
    )
  ) : (
    <StyledWrapper>
      <StyledHeading>
        <StyledAvatar src={SampleAvatar} />
        <StyledName>{name}</StyledName>
        <StyledDeleteIcon
          id={id}
          src={deleteIcon}
          onClick={(e) => {
            if (confirm('Are you sure, you want delete this account?')) {
              deleteChild(e.target.id, userID);
            }
          }}
        />
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
  id: propTypes.string.isRequired,
  tasks: propTypes.bool,
  chooseAccount: propTypes.func,
  deleteChild: propTypes.func,
  userID: propTypes.string,
  active: propTypes.bool,
};

AccountContainer.defaultProps = {
  tasks: null,
  chooseAccount: null,
  deleteChild: null,
  userID: null,
  active: null,
};

export default AccountContainer;
