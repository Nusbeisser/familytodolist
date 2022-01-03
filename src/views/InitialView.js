import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import GlobalStyle from '../theme/GlobalStyle';
import { register as registerAction, authenticate as authenticateAction } from '../actions/index';

const StyledBackground = styled.div`
  background-color: yellowgreen;
  height: 100vh;
  width: 100vw;
`;

const StyledWrapper = styled.div`
  background-color: white;
  position: absolute;
  width: 500px;
  height: 540px;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -220px;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
`;
const StyledButton = styled(Button)`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledToggleFunc = styled.div`
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

class InitialView extends React.Component {
  state = {
    isLoginActive: true,
  };

  render() {
    const { isLoginActive } = this.state;
    const { userID } = this.props;
    const { register } = this.props;
    const { authenticate } = this.props;
    return (
      <>
        <GlobalStyle />
        <StyledBackground>
          <StyledWrapper>
            <h1>FamilyToDoList</h1>
            Your family task manager.
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={({ username, password }) => {
                if (isLoginActive) authenticate(username, password);
                else register(username, password);
              }}
            >
              {({ handleChange, handleBlur, values }) => {
                if (userID) {
                  return <Redirect to="/" />;
                }
                return (
                  <>
                    <Form>
                      <Input
                        placeholder="login"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                      <p />
                      <Input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {isLoginActive ? (
                        <StyledButton type="submit">Login</StyledButton>
                      ) : (
                        <StyledButton type="submit">Register</StyledButton>
                      )}
                    </Form>
                    {isLoginActive ? (
                      <>
                        <p />
                        Don`t have an account?
                        <StyledToggleFunc onClick={() => this.setState({ isLoginActive: false })}>
                          <h1>Sign up</h1>
                        </StyledToggleFunc>
                      </>
                    ) : (
                      <>
                        <p />
                        Already have an account?
                        <StyledToggleFunc onClick={() => this.setState({ isLoginActive: true })}>
                          <h1>Log In</h1>
                        </StyledToggleFunc>
                      </>
                    )}
                  </>
                );
              }}
            </Formik>
          </StyledWrapper>
        </StyledBackground>
      </>
    );
  }
}

const mapStateToProps = ({ userID = null }) => ({ userID });

const mapDispatchToProps = (dispatch) => ({
  register: (username, password) => dispatch(registerAction(username, password)),
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

InitialView.propTypes = {
  register: propTypes.func.isRequired,
  authenticate: propTypes.func.isRequired,
  userID: propTypes.string,
};

InitialView.defaultProps = {
  userID: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialView);
