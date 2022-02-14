import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import MainTemplate from '../templates/MainTemplate';
import PrizesContainer from '../components/atoms/PrizesContainer/PrizesContainer';
import Button from '../components/atoms/Button/Button';
import AddPrizeModal from '../components/organisms/AssPrizeModal/AddPrizeModal';
import '../components/molecules/AddAccount/AddAccount.css';
import {
  addPrize as addPrizeAction,
  fetchPrizes as fetchPrizesAction,
  deletePrize as deletePrizeAction,
  purchasePrize as purchasePrizeAction,
} from '../actions/index';

const StyledWrapper = styled.div`
  position: relative;
  width: 80%;
  top: 70px;
  left: 15vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const StyledButtonMaring = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;
const StyledButton = styled(Button)`
  margin: auto;
`;

class Prizes extends React.Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { fetchPrizes } = this.props;
    fetchPrizes();
  }

  showModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  hideModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { addPrize } = this.props;
    const { isModalOpen } = this.state;
    const { prizes } = this.props;
    const { points } = this.props;
    const { deletePrize } = this.props;
    const { accessLevel } = this.props;
    const { purchasePrize } = this.props;
    return (
      <>
        <MainTemplate />
        {accessLevel > 0 ? (
          <StyledButtonMaring>
            <StyledButton onClick={() => this.showModal()}>Add prize</StyledButton>
          </StyledButtonMaring>
        ) : null}
        <AddPrizeModal addPrize={addPrize} hideModal={this.hideModal} isModalOpen={isModalOpen} />
        <StyledWrapper>
          {prizes.map(({ _id, name, description, cost }) => (
            <PrizesContainer
              id={_id}
              key={_id}
              name={name}
              cost={cost}
              description={description}
              deletePrize={deletePrize}
              accessLevel={accessLevel}
              points={points}
              purchasePrize={purchasePrize}
            />
          ))}
        </StyledWrapper>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPrize: (values) => dispatch(addPrizeAction(values)),
  fetchPrizes: () => dispatch(fetchPrizesAction()),
  deletePrize: (id) => dispatch(deletePrizeAction(id)),
  purchasePrize: (id, name, cost, description) =>
    dispatch(purchasePrizeAction(id, name, cost, description)),
});

const mapStateToProps = ({ prizes, accessLevel, points }) => ({
  prizes,
  accessLevel,
  points,
});

Prizes.propTypes = {
  fetchPrizes: propTypes.func.isRequired,
  addPrize: propTypes.func.isRequired,
  prizes: propTypes.arrayOf(propTypes.object),
  deletePrize: propTypes.func.isRequired,
  accessLevel: propTypes.number.isRequired,
  points: propTypes.number,
  purchasePrize: propTypes.func.isRequired,
};

Prizes.defaultProps = {
  prizes: null,
  points: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Prizes);
