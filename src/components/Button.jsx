import React from "react";
import styled, { css, keyframes } from "styled-components";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  shadow,
  variant,
  background,
} from "styled-system";
import get from "lodash.get";

const StyledButton = styled.button`
  position: relative;
  outline: 0;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  ${({ theme, small, type }) => css`
    font-size: ${get(
      theme,
      `parameters.${small ? "smallButtonFontSize" : "buttonFontSize"}`,
      small ? "12px" : "16px"
    )};
    padding: ${get(
      theme,
      `parameters.${
        ["outline"].includes(type) ? "buttonOutlinePadding" : "buttonPadding"
      }`,
      "12px 24px"
    )};
  `}
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${shadow}
  ${background}
  ${variant({
    prop: "type",
    variants: {
      default: {
        bg: "gray",
        color: "white",
        fill: "white",
      },
      primary: {
        bg: "primary",
        color: "white",
        fill: "white",
      },
      secondary: {
        bg: "secondary",
        color: "white",
        fill: "white",
      },
      selected: {
        bg: "selected",
        color: "white",
        fill: "white",
      },
      success: {
        bg: "success",
        color: "white",
        fill: "white",
      },
      confirm: {
        bg: "confirm",
        color: "white",
        fill: "white",
      },
      error: {
        bg: "error",
        color: "white",
        fill: "white",
      },
      danger: {
        bg: "danger",
        color: "white",
        fill: "white",
      },
      dark: {
        bg: "darkGray",
        color: "white",
        fill: "white",
      },
      outline: {
        bg: "white",
        color: "white",
        fill: "white",
        border: "outlineButton",
      },
      cancel: {
        bg: "white",
        color: "gray",
        fill: "gray",
        border: "outlineButton",
      },
      gradient: {
        background: "linear-gradient(270deg, #6f5ed3 0%, #60c7dd 100%)",
        color: "white",
        fill: "white",
      },
    },
  })}

  &:hover {
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      filter: none !important;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      color: transparent;
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.svg`
  position: absolute;
  animation: ${rotate} 1s linear infinite;
  width: ${({ theme }) => get(theme, "fontSizes.2", "18px")};
  height: ${({ theme }) => get(theme, "fontSizes.2", "18px")};
`;

const Button = React.forwardRef((props, ref) => {
  const renderLoading = props.isLoading && (
    <Spinner
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 12C23.3284 12 24.0097 12.6742 23.9064 13.4961C23.7239 14.9481 23.2769 16.3588 22.5831 17.6568C21.6528 19.3972 20.3077 20.8813 18.6668 21.9776C17.026 23.074 15.1401 23.7488 13.1762 23.9422C11.2123 24.1356 9.23099 23.8417 7.4078 23.0866C5.5846 22.3314 3.97579 21.1382 2.72387 19.6127C1.47196 18.0873 0.61557 16.2766 0.230577 14.3411C-0.154417 12.4056 -0.0561353 10.405 0.516716 8.51658C0.943956 7.10816 1.62533 5.79454 2.52301 4.63884C3.03119 3.98459 3.98959 3.98959 4.57538 4.57538V4.57538C5.16116 5.16117 5.14894 6.10514 4.66846 6.77999C4.10501 7.57137 3.67145 8.4515 3.38754 9.38744C2.9579 10.8038 2.88419 12.3042 3.17293 13.7558C3.46168 15.2074 4.10397 16.5654 5.04291 17.7095C5.98185 18.8536 7.18845 19.7485 8.55585 20.3149C9.92325 20.8813 11.4092 21.1017 12.8822 20.9567C14.3551 20.8116 15.7695 20.3055 17.0001 19.4832C18.2308 18.6609 19.2396 17.5479 19.9373 16.2426C20.3983 15.38 20.7141 14.4511 20.8753 13.4931C21.0127 12.6761 21.6716 12 22.5 12V12Z"
        fill="current"
      />
    </Spinner>
  );

  return (
    <StyledButton ref={ref} {...props}>
      {renderLoading}
      {props.children}
    </StyledButton>
  );
});

Button.defaultProps = {
  display: "flex",
  flexdirection: "row",
  alignitems: "center",
  justifycontent: "center",
  fontFamily: "Roboto",
  fontWeight: "normal",
  border: "none",
  boxshadow: "low",
  borderradius: "button",
  type: "default",
};

export { Button };
