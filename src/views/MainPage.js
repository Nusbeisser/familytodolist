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
  min-height: 92vh;
  padding-left: 50px;
`;

const StyledHeader = styled.div`
  align-items: center;
  text-align: center;
`;

const StyledPrizesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
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
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  min-width: 25%;
  background-color: lightgrey;
`;

const StyledColumnChild = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 50px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  min-width: 25%;
  background-color: lightgrey;
  max-width: 500px;
`;

const StyledChildContent = styled.div`
  align-items: center;
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
    const { tasksDone, events, points } = this.props;
    const childNamesArray = Object.keys(purchasedPrizes);

    return (
      <>
        <MainTemplate />
        {accessLevel > 0 ? (
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
                      <div style={{ marginTop: '30px' }}>
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
                      </div>
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
        ) : (
          <>
            <StyledHeader>
              <h1>Good morning!</h1>
            </StyledHeader>
            <StyledChildContent>
              Your stats:
              <ul>
                <li>{points} points,</li>
                <li>{events.length} tasks to realize,</li>
                <li>{tasksDone} tasks done.</li>
              </ul>
              <br />
              <br />
              Your prizes:
              <StyledColumnChild>
                {purchasedPrizes.map(({ _id, name }) => (
                  <div style={{ marginTop: '30px' }}>
                    <PrizesContainer id={_id} key={_id} name={name} purchased />
                  </div>
                ))}
              </StyledColumnChild>
            </StyledChildContent>
          </>
        )}
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

const mapStateToProps = ({ accessLevel, purchasedPrizes, tasksDone, events, points }) => ({
  accessLevel,
  purchasedPrizes,
  tasksDone,
  events,
  points,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchasedPrizes: dispatch(fetchPurchasedPrizesAction()),
  prizeRealized: (id, ownerId, ownerName) => dispatch(prizeRealizedAction(id, ownerId, ownerName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
