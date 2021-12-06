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
  position: absolute;
  top: 70px;
  left: 12.5vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 185px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 1100px;
  left: 300px;
  margin-top: 200px;
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
        <StyledGrid>
          {childAccs.map(({ name, points, tasksDone, activeTasks, _id }) => (
            <AccountContainer
              id={_id}
              name={name}
              points={points}
              tasksDone={tasksDone}
              activeTasks={activeTasks}
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
        <StyledButton onClick={this.openAddAccount}>Add account</StyledButton>
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
