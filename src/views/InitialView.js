import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import GlobalStyle from '../theme/GlobalStyle';
import { register as registerAction } from '../actions/registerActions';
import { authenticate as authenticateAction } from '../actions/index';

const StyledBackground = styled.div`
  position: relative;
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
  margin-top: -270px;
  margin-left: -250px;
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
    usernameError: null,
    passwordError: null,
  };

  render() {
    const { isLoginActive } = this.state;
    const { userID, registerMessage } = this.props;
    const { register } = this.props;
    const { authenticate } = this.props;
    const { usernameError, passwordError } = this.state;

    // const registerValidate = (username, password) => {
    //   const errors = {};
    //   const regex = /^[a-zA-Z0-9]+$/i;
    //   if (!username) {
    //     errors.username = 'Cannot be blank';
    //   } else if (!regex.test(username)) {
    //     errors.username = 'Invalid format, only letters and numbers allowed';
    //   }
    //   if (!password) {
    //     errors.password = 'Cannot be blank';
    //   } else if (password.length < 5) {
    //     errors.password = 'Password must be more than 5 characters';
    //   }
    //   if (errors.username || errors.password) {
    //     console.log(errors);
    //     this.setState({ usernameError: errors.username });
    //     this.setState({ passwordError: errors.password });
    //   } else {
    //     this.setState({ usernameError: null });
    //     this.setState({ passwordError: null });
    //     register(username, password);
    //   }
    // };

    return (
      <>
        <GlobalStyle />
        <StyledBackground>
          <StyledWrapper>
            <h2>FamilyToDoList</h2>
            <span style={{ color: 'yellowgreen' }}>{registerMessage.message}</span>
            {registerMessage.message ? <br /> : null}
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
                      <br />
                      <span style={{ color: 'red', fontSize: '15px' }}>
                        {registerMessage.username}
                      </span>
                      <p />
                      <Input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <br />
                      <span style={{ color: 'red', fontSize: '15px' }}>
                        {registerMessage.password}
                      </span>
                      <p />
                      {isLoginActive ? (
                        <StyledButton type="submit">Login</StyledButton>
                      ) : (
                        <StyledButton type="submit">Register</StyledButton>
                      )}
                    </Form>
                    {isLoginActive ? (
                      <>
                        Don`t have an account?
                        <StyledToggleFunc onClick={() => this.setState({ isLoginActive: false })}>
                          <h3>Sign up</h3>
                        </StyledToggleFunc>
                      </>
                    ) : (
                      <>
                        Already have an account?
                        <StyledToggleFunc onClick={() => this.setState({ isLoginActive: true })}>
                          <h3>Log In</h3>
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

const mapStateToProps = ({ userID = null, registerMessage = null }) => ({
  userID,
  registerMessage,
});

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
