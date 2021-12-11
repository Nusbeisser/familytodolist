import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';
import MainTemplate from '../templates/MainTemplate';
import PrizesContainer from '../components/atoms/PrizesContainer/PrizesContainer';
import Button from '../components/atoms/Button/Button';
import AddPrizeModal from '../components/organisms/AssPrizeModal/AddPrizeModal';

import {
  addPrize as addPrizeAction,
  fetchPrizes as fetchPrizesAction,
  deletePrize as deletePrizeAction,
} from '../actions/index';

const StyledWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 12.5vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 185px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: -150px;
  left: 1280px;
  margin-top: 200px;
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
    const { deletePrize } = this.props;
    const { accessLevel } = this.props;
    return (
      <>
        <MainTemplate />
        {isModalOpen ? <AddPrizeModal addPrize={addPrize} hideModal={this.hideModal} /> : null}
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
            />
          ))}
        </StyledWrapper>
        <StyledButton onClick={() => this.showModal()}>Add prize</StyledButton>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPrize: (values) => dispatch(addPrizeAction(values)),
  fetchPrizes: () => dispatch(fetchPrizesAction()),
  deletePrize: (id) => dispatch(deletePrizeAction(id)),
});

const mapStateToProps = ({ prizes, accessLevel }) => ({
  prizes,
  accessLevel,
});

Prizes.propTypes = {
  fetchPrizes: propTypes.func.isRequired,
  addPrize: propTypes.func.isRequired,
  prizes: propTypes.arrayOf(propTypes.object),
  deletePrize: propTypes.func.isRequired,
  accessLevel: propTypes.number.isRequired,
};

Prizes.defaultProps = {
  prizes: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Prizes);
