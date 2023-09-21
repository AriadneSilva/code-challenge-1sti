import React from "react";
import styled, { css } from "styled-components";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  shadow,
  background,
} from "styled-system";

const StyledButton = styled.button`
  position: relative;
  outline: 0;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
  padding: 1rem 5rem;
  font-size: 1.5rem;

  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${shadow}
  ${background}


  &:hover {
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }

  ${({ theme, selectable, selected, error }) =>
    selectable &&
    css`
      background-color: ${selected ? theme.colors.gray : "transparent"};
      color: ${theme.colors.darkGray};
      border: 0.25rem solid
        ${error
          ? theme.colors.error
          : selected
          ? theme.colors.primary
          : theme.colors.darkGray};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      filter: none !important;
    `}
`;

const Button = React.forwardRef((props, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {props.children}
    </StyledButton>
  );
});

Button.defaultProps = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  border: "none",
  fontFamily: "Montserrat",
  backgroundColor: "gray",
};

export { Button };
