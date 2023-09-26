import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import get from "lodash.get";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  background,
} from "styled-system";
import { View } from "./View";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin-top: 4px;
  margin-bottom: 2rem;
  font-size: 16px;
  font-family: "Roboto";
  vertical-align: middle;

  ${({ theme }) => css`
    color: ${theme.colors.error};

    .message-icon {
      min-width: ${get(theme, "fontSizes.1")};
      width: ${get(theme, "fontSizes.1")};
      min-height: ${get(theme, "fontSizes.1")};
      height: ${get(theme, "fontSizes.1")};
      margin-right: 1rem;
    }
  `}
`;

const Wrapper = styled.label`
  ${color}
  ${typography}
  ${space}

  width: 100%;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  ${background}

  ${({ theme, label, error }) =>
    Boolean(label) &&
    css`
      &:before {
        content: "${label}";
        display: block;
        margin-bottom: 0.5rem;
        width: 100%;
        text-align: left;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: bold;
        color: ${error ? theme.colors.error : theme.colors.darkGray};
      }
    `}

    ${({ theme, success, warning, error }) => css`
      border: ${get(theme, "borders.input", "2px solid")};
      border-color: ${success
        ? get(theme, "colors.success")
        : error
        ? get(theme, "colors.error")
        : warning
        ? get(theme, "colors.warning")
        : "#E0E0E0"};
      border-radius: ${get(theme, "radii.input", "4px")};
    `}
}

  input {
    outline: 0;
    transition: all 0.2s ease;
    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${space}
    ${background}
    border: 0;
    margin-left: 15px;


`;

Wrapper.defaultProps = {
  fontSize: "24px",
  fontFamily: "Roboto",
  fontWeight: "normal",
  color: "#00000099",
  width: "20rem",
  error: false,
  height: "46px",
  background: "transparent",
};

const Input = React.forwardRef(
  (
    { children, error, message, icon, width, color, background, ...rest },
    ref
  ) => {
    const [value, setValue] = useState("");
    const onChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <Fragment>
        <View>
          <Wrapper
            label={children}
            ref={ref}
            error={error}
            width={width}
            color={color}
            background={background}
          >
            {icon !== "" ? icon : ""}
            <input value={value} onChange={onChange} {...rest} />
          </Wrapper>
          {error && <MessageWrapper>{message}</MessageWrapper>}
        </View>
      </Fragment>
    );
  }
);

Input.defaultProps = {
  children: "",
  icon: "",
};

export { Input };
