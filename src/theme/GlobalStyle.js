import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    html {
        font-size: 62,5%; //1rem = 10px
    }

    body {
        font-size: 1.6rem;
        font-family: 'Montserrat';
        margin: 0;
        padding: 0;
    }
    .dark-mode {
        background-color: black;
        color: white;
    }

    .buttonIcon {
        background-color: transparent;
    }

    .active .buttonIcon {
        background-color: white;
    }

    a{
        text-decoration: none;
    }
`;

export default GlobalStyle;
