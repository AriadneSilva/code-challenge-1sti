import React, { Fragment } from "react";
import {
  createGlobalStyle,
  ThemeProvider as StyledProvider,
} from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
/* Customize website's scrollbar like Mac OS
  Not supports in Firefox and IE */
  /* total width */
  body::-webkit-scrollbar {
    background-color: #fff;
    width: 16px
  }

  /* background of the scrollbar except button or resizer */
  body::-webkit-scrollbar-track {
    background-color: #fff
  }

  /* scrollbar itself */
  body::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff
  }

  /* set button(top and bottom of the scrollbar) */
  body::-webkit-scrollbar-button {display:none}

  body {
    margin: 0px;
    font-family: Montserrat;
  }


  @media screen and (min-width: 415px) {
    html {
      font-size: 4px !important;
    }
  }

  @media screen and (min-width: 680px) {
    html {
      font-size: 6px !important;
    }
  }


  @media screen and (min-width: 1024px) {
    html {
      font-size: 10px !important;
    }
  }

  @media screen and (min-width: 1560px) {
    html {
      font-size: 15px !important;
    }
  }
`;

export const ThemeProvider = ({ children }) => {
  return (
    <Fragment>
      <GlobalStyle />
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </Fragment>
  );
};
