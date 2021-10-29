import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/organisms/Sidebar/Sidebar';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/atoms/Button/Button';
import AccountContainer from '../components/atoms/AccountContainer/AccountContainer';
import AddAccount from '../components/molecules/AddAccount/AddAccount';

const AccList = [
  {
    id: 1,
    name: 'Luki',
    points: 10,
    tasksDone: 5,
    activeTasks: 999,
  },
  {
    id: 2,
    name: 'Mika',
    points: 100,
    tasksDone: 50,
    activeTasks: 5,
  },
  { id: 3, name: 'Zuzia', points: 50, tasksDone: 30, activeTasks: 10 },
];

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

  openAddAccount = () => {
    this.setState({ isAddAccountOpen: true });
  };

  closeAddAccount = () => {
    this.setState({ isAddAccountOpen: false });
  };

  render() {
    const { isAddAccountOpen } = this.state;
    return (
      <>
        <MainTemplate />
        <Sidebar />
        <StyledGrid>
          {AccList.map(({ name, points, tasksDone, activeTasks, id }) => (
            <AccountContainer
              id={id}
              name={name}
              points={points}
              tasksDone={tasksDone}
              activeTasks={activeTasks}
              key={id}
            />
          ))}
        </StyledGrid>
        {isAddAccountOpen ? <AddAccount closeAddAccount={this.closeAddAccount} /> : null}
        <StyledButton onClick={this.openAddAccount}>Add account</StyledButton>
      </>
    );
  }
}

export default Menagement;
