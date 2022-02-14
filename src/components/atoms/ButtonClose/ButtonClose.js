import styled from 'styled-components';
import ButtonCloseIcon from '../../../assets/close.png';

const ButtonClose = styled.button`
  width: 40px;
  height: 40px;
  background-image: url(${ButtonCloseIcon});
  background-repeat: no-repeat;
  background-size: 100%;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

export default ButtonClose;
