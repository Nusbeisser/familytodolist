import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import ToggleButton from '../components/atoms/ToggleButton/ToggleButton';
import Input from '../components/atoms/Input/Input';

const StyledWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  margin-left: 22px;

  @media (min-width: 480px) {
    margin-left: 70px;
  }
  @media (min-width: 768px) {
    margin-left: 70px;
  }
  @media (min-width: 1024px) {
    margin-left: 100px;
  }
  @media (min-width: 1600px) {
    margin-left: 110px;
  }
`;

const StyledPageHeader = styled.h1`
  text-align: center;
`;
const StyledContent = styled.div`
  text-align: center;
`;
const StyledDarkModeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StyledChangePasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Settings = () => (
  <>
    <MainTemplate />
    <StyledWrapper>
      <StyledPageHeader>Settings</StyledPageHeader>
      <StyledContent>
        <StyledDarkModeWrapper>
          <h3>Dark mode on/off</h3>
          <ToggleButton />
        </StyledDarkModeWrapper>

        <StyledChangePasswordWrapper>
          <h3>Change password</h3>
          <p>Actual password:</p>
          <Input />
          <p>New password:</p>
          <Input />
        </StyledChangePasswordWrapper>
        <p>Change main color</p>
        <p>What else? ;-;</p>
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quae! Eos harum, omnis
          laboriosam quidem eveniet et! Non, voluptatibus eligendi? Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Earum atque debitis, iusto temporibus eveniet fugiat, fuga
          dolorem odit sit a omnis necessitatibus eligendi ducimus facere pariatur suscipit
          voluptates ab dignissimos praesentium modi deserunt? Debitis at expedita iure asperiores
          veniam quae, minima eum, odit culpa eveniet voluptatum adipisci autem commodi aut, maxime
          possimus mollitia doloribus iusto unde inventore cum quisquam ipsum. Fuga possimus
          doloremque cum alias omnis, sequi commodi nesciunt qui iure natus, quasi deserunt
          molestiae quo? Illum non aperiam sint voluptatibus sunt repellat commodi magnam quo
          assumenda, incidunt possimus ratione fugit, dolor, a quisquam inventore amet harum
          perferendis velit voluptate.
        </p> */}
      </StyledContent>
    </StyledWrapper>
  </>
);

export default Settings;
