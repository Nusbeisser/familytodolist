import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/atoms/Button/Button';
import AccountContainer from '../components/atoms/AccountContainer/AccountContainer';
import AddAccount from '../components/molecules/AddAccount/AddAccount';
import {
  registerChild as registerChildAction,
  deleteChild as deleteChildAction,
  fetchChilds as fetchChildsAction,
} from '../actions/index';

const StyledGrid = styled.div`
  position: relative;
  max-width: 80%;
  top: 100px;
  left: 25%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0px;
  justify-content: center;

  @media (min-width: 480px) {
    left: 25%;
  }
  @media (min-width: 768px) {
    left: 15%;
  }
  @media (min-width: 1024px) {
    left: 15%;
  }
  @media (min-width: 1600px) {
    left: 13%;
  }
`;
const StyledButtonMaring = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;
const StyledButton = styled(Button)`
  margin: auto;
`;

class Menagement extends React.Component {
  state = { isAddAccountOpen: false };

  componentDidMount() {
    const { fetchChilds } = this.props;
    fetchChilds();
  }

  openAddAccount = () => {
    this.setState({ isAddAccountOpen: true });
  };

  closeAddAccount = () => {
    this.setState({ isAddAccountOpen: false });
  };

  render() {
    const { isAddAccountOpen } = this.state;
    const { childAccs } = this.props;
    const { userID } = this.props;
    const { registerChild } = this.props;
    const { deleteChild } = this.props;
    return (
      <>
        <MainTemplate />
        <StyledButtonMaring>
          <StyledButton onClick={this.openAddAccount}>Add account</StyledButton>
        </StyledButtonMaring>
        {(console.log('childAccs w management'), console.log(childAccs))}
        <StyledGrid>
          {childAccs.map(({ name, points, tasksDone, _id, events }) => (
            <AccountContainer
              id={_id}
              name={name}
              points={points}
              tasksDone={tasksDone}
              activeTasks={events.length}
              key={_id}
              deleteChild={deleteChild}
              userID={userID}
            />
          ))}
        </StyledGrid>
        {isAddAccountOpen ? (
          <AddAccount
            closeAddAccount={this.closeAddAccount}
            registerChild={registerChild}
            userID={userID}
          />
        ) : null}
      </>
    );
  }
}

Menagement.propTypes = {
  childAccs: propTypes.arrayOf(propTypes.shape).isRequired,
  registerChild: propTypes.func.isRequired,
  userID: propTypes.string,
  deleteChild: propTypes.func,
  fetchChilds: propTypes.func,
};

Menagement.defaultProps = {
  userID: null,
  deleteChild: null,
  fetchChilds: null,
};

const mapStateToProps = ({ childAccs, userID = null, state = null }) => ({
  childAccs,
  userID,
  state,
});

const mapDispatchToProps = (dispatch) => ({
  registerChild: (name, username, password, userID, accessLevel) =>
    dispatch(registerChildAction(name, username, password, userID, accessLevel)),
  deleteChild: (id, userID) => dispatch(deleteChildAction(id, userID)),
  fetchChilds: (id) => dispatch(fetchChildsAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menagement);
