/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import deleteIcon from '../../../assets/delete.png';

const StyledWrapper = styled.div`
  display: inline-block;
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

const StyledDeleteIcon = styled.img`
  position: relative;
  top: -40px;
  left: 600px;
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

const PrizesContainer = ({ name, description, cost, id, deletePrize, accessLevel, points }) => (
  <StyledWrapper>
    <StyledHeading>
      <StyledName>{name}</StyledName>
      {accessLevel < 1 ? (
        points >= cost ? (
          <p>Choose prize button</p>
        ) : (
          <p>Not enough points</p>
        )
      ) : (
        <StyledDeleteIcon src={deleteIcon} onClick={() => deletePrize(id)} />
      )}
    </StyledHeading>
    <StyledInfo>
      <p>{description}</p>
      <p>Cost: {cost} points</p>
    </StyledInfo>
  </StyledWrapper>
);

PrizesContainer.propTypes = {
  name: propTypes.string.isRequired,
  cost: propTypes.number.isRequired,
  description: propTypes.string,
  id: propTypes.string.isRequired,
  deletePrize: propTypes.func.isRequired,
  accessLevel: propTypes.number.isRequired,
};

PrizesContainer.defaultProps = {
  description: null,
};

export default PrizesContainer;
