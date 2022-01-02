import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import MainTemplate from '../templates/MainTemplate';
import PrizesContainer from '../components/atoms/PrizesContainer/PrizesContainer';
import {
  fetchPurchasedPrizes as fetchPurchasedPrizesAction,
  prizeRealized as prizeRealizedAction,
} from '../actions/index';

const StyledWrapper = styled.div`
  background-color: red;
  weight: 100vw;
  min-height: 92vh;
  padding-left: 50px;
`;

const StyledHeader = styled.div`
  align-items: center;
  text-align: center;
`;

const StyledPrizesWrapper = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 1440px) {
    flex-direction: row;
  }
`;
const StyledPrizesHeader = styled.div`
  margin: 0 auto;
  text-align: center;
`;
const StyledColumn = styled.div`
  margin: 50px;
  text-align: center;
`;

class MainPage extends React.Component {
  componenDidMount() {
    const { fetchPurchasedPrizes } = this.props;
    fetchPurchasedPrizes();
  }

  render() {
    const { accessLevel } = this.props;
    const { purchasedPrizes } = this.props;
    const { prizeRealized } = this.props;
    const childNamesArray = Object.keys(purchasedPrizes);

    return (
      <>
        <MainTemplate />
        <StyledWrapper>
          <StyledHeader>
            <h1>Good morning!</h1>
          </StyledHeader>
          <StyledPrizesHeader>There are prizes to realize:</StyledPrizesHeader>
          <StyledPrizesWrapper>
            {childNamesArray.map((ownerName) => (
              <StyledColumn key={ownerName}>
                <h1>{ownerName}</h1>
                {purchasedPrizes[ownerName].length > 0 ? (
                  purchasedPrizes[ownerName].map(({ _id, name, ownerId }) => (
                    <PrizesContainer
                      id={_id}
                      key={_id}
                      name={name}
                      accessLevel={accessLevel}
                      purchased
                      ownerId={ownerId}
                      prizeRealized={prizeRealized}
                      ownerName={ownerName}
                    />
                  ))
                ) : (
                  <>
                    <h1>There are no prizes to realize 😭</h1>
                  </>
                )}
              </StyledColumn>
            ))}
          </StyledPrizesWrapper>
        </StyledWrapper>
      </>
    );
  }
}

MainPage.propTypes = {
  accessLevel: propTypes.number.isRequired,
  purchasedPrizes: propTypes.objectOf(propTypes.arrayOf(propTypes.objectOf(propTypes.shape))),
  prizeRealized: propTypes.func,
  fetchPurchasedPrizes: propTypes.objectOf(propTypes.shape),
};

MainPage.defaultProps = {
  purchasedPrizes: null,
  prizeRealized: null,
  fetchPurchasedPrizes: null,
};

const mapStateToProps = ({ accessLevel, purchasedPrizes }) => ({ accessLevel, purchasedPrizes });

const mapDispatchToProps = (dispatch) => ({
  fetchPurchasedPrizes: dispatch(fetchPurchasedPrizesAction()),
  prizeRealized: (id, ownerId, ownerName) => dispatch(prizeRealizedAction(id, ownerId, ownerName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
