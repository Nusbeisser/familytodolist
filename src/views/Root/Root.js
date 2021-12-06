/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/index';
import GlobalStyle from '../../theme/GlobalStyle';
import Sidebar from '../../components/organisms/Sidebar/Sidebar';
import Button from '../../components/atoms/Button/Button';
import MainPage from '../MainPage';
import Management from '../Management';
import AddTasks from '../AddTasks';
import Prizes from '../Prizes';
import Settings from '../Settings';
import InitialView from '../InitialView';
import PrivateRoute from '../../routes/PrivateRoute';

const StyledButton = styled(Button)`
  position: absolute;
  top: 1100px;
  left: 300px;
`;

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/authenticate" component={InitialView} />
        <PrivateRoute exact path="/" component={MainPage} />
        <PrivateRoute path="/addtasks" component={AddTasks} />
        <PrivateRoute path="/management" component={Management} />
        <PrivateRoute path="/prizes" component={Prizes} />
        <PrivateRoute path="/settings" component={Settings} />
        <GlobalStyle />
        <Sidebar />
        <StyledButton>Dodaj konto</StyledButton>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
