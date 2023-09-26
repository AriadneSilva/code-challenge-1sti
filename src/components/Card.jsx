import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  shadow,
  grid,
  background,
} from "styled-system";
import get from "lodash.get";

const Wrapper = styled.div`
  transition: all 0.2s ease;
  ${({ theme }) => css`
    padding: ${get(theme, "parameters.cardPadding", "16px")};
  `}
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${grid}
  ${border}
  ${shadow}
  ${background}



  ${({ theme, onClick }) =>
    onClick &&
    css`
      cursor: pointer;

      &:hover {
        box-shadow: ${theme.shadows.medium ||
        "0px 6.4px 14.4px rgba(0, 0, 0, 0.12)"};
      }
    `}
`;

const Card = (props) => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

Card.propTypes = {
  onClick: PropTypes.func,
};

Card.defaultProps = {
  bg: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  fontFamily: "Roboto",
  fontSize: 2,
  border: "none",
  boxshadow: "low",
  borderradius: "card",
  background: "white",
};

export { Card };
