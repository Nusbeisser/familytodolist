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
  margin: 30px;
  box-shadow: 0px 10px 30px -10px hsla(0, 0%, 0%, 0.1);
`;

const StyledHeading = styled.div`
  display: flex;
  height: 150px;
  min-width: 300px;
  background-color: yellowgreen;
  border-radius: 10px;
`;

const StyledAvatar = styled.img`
  border-radius: 100px;
  position: flex;
  display: flex;
  align-self: center;
  height: 140px;
  width: 140px;
`;

const StyledDeleteIcon = styled.img`
  position: flex;
  cursor: pointer;
  align-self: center;
  margin: 0 auto;
`;
const StyledName = styled.div`
  display: flex;
  min-height: 150px;
  min-width: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 40px;

  @media (min-width: 480px) {
    width: 60%;
  }
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 75%;
  }
  @media (min-width: 1600px) {
    width: 80%;
  }
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
