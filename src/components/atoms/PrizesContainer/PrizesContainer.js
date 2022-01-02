/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import deleteIcon from '../../../assets/delete.png';
import prizeIcon from '../../../assets/gift-box1.png';
import doneIcon from '../../../assets/verify.png';

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 450px;
  width: 35vw;
  top: 70px;

  box-shadow: 0px 10px 30px -10px hsla(0, 0%, 0%, 0.1);
`;

const StyledHeading = styled.div`
  display: flex;
  min-height: 150px;
  margin-top: 30px;
  background-color: yellowgreen;
  border-radius: 10px;
  margin-left: 10px;
`;

const StyledDeleteIcon = styled.img`
  position: flex;
  display: inline-block;
  cursor: pointer;
  align-self: center;
  margin: 0 auto;
`;
const StyledIcon = styled.div`
  position: flex;
  display: flex;
  flex-direction: row;
  align-self: center;
  text-align: center;
  height: 63px;
  width: 63px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 100px 100px 10px;
  margin-left: 20px;
`;

const StyledName = styled.div`
  display: flex;
  min-height: 150px;
  min-width: 200px;
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

const PrizesContainer = ({
  name,
  description,
  cost,
  id,
  deletePrize,
  accessLevel,
  points,
  purchasePrize,
  purchased,
  ownerId,
  prizeRealized,
  ownerName,
}) =>
  !purchased ? (
    <StyledWrapper>
      <StyledHeading>
        <StyledName>{name}</StyledName>
        {accessLevel < 1 ? (
          points >= cost ? (
            <StyledDeleteIcon
              src={prizeIcon}
              onClick={() => purchasePrize(id, name, cost, description)}
            />
          ) : (
            <StyledIcon>Not enough points</StyledIcon>
          )
        ) : (
          <StyledDeleteIcon
            src={deleteIcon}
            onClick={() => {
              deletePrize(id);
            }}
          />
        )}
      </StyledHeading>
      <StyledInfo>
        <p>{description}</p>
        <p>Cost: {cost} points</p>
      </StyledInfo>
    </StyledWrapper>
  ) : (
    <StyledHeading>
      <StyledName>{name}</StyledName>
      <StyledDeleteIcon
        src={doneIcon}
        onClick={() =>
          confirm('Is this prize already realized?') ? prizeRealized(id, ownerId, ownerName) : null
        }
      />
    </StyledHeading>
  );

PrizesContainer.propTypes = {
  name: propTypes.string.isRequired,
  cost: propTypes.number,
  description: propTypes.string,
  id: propTypes.string.isRequired,
  deletePrize: propTypes.func,
  accessLevel: propTypes.number.isRequired,
  points: propTypes.number,
  purchasePrize: propTypes.func,
  purchased: propTypes.bool,
  ownerId: propTypes.string,
  prizeRealized: propTypes.func,
  ownerName: propTypes.string,
};

PrizesContainer.defaultProps = {
  description: null,
  points: 0,
  deletePrize: null,
  cost: null,
  purchasePrize: null,
  purchased: null,
  ownerId: null,
  prizeRealized: null,
  ownerName: null,
};

export default PrizesContainer;
