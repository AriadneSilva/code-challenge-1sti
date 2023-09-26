import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { space, color, typography, layout, flexbox } from "styled-system";
import _ from "lodash";
import { View } from "./View";
import get from "lodash.get";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin: 0;
  margin-top: 4px;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-family: "Roboto";
  vertical-align: middle;

  ${({ theme }) => css`
    color: ${theme.colors.error};

    .message-icon {
      min-width: ${_.get(theme, "fontSizes.1")};
      width: ${_.get(theme, "fontSizes.1")};
      min-height: ${_.get(theme, "fontSizes.1")};
      height: ${_.get(theme, "fontSizes.1")};
      margin-right: 8px;
    }
  `}
`;

const Wrapper = styled.label`
  ${color}
  ${typography}
  ${space}

  width: 100%;

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
        font-weight: normal;
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
    border-radius: ${get(theme, "radio.input", "4px")};
  `}

  select {
    outline: 0;
    transition: all 0.2s ease;

    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${space}
    border: 0px;

    ${({ theme, error }) => css`
      background-color: ${theme.colors.secondary};
      padding: 0.5rem;

      &: hover;
    `}

    ${({ width }) =>
      width &&
      css`
        width: ${width};
      `}

    option {
      color: black !important;
      border: 0px;
    }
  }
`;
Wrapper.defaultProps = {
  fontSize: "24px",
  fontFamily: "Roboto",
  fontWeight: "normal",
  color: "#00000099",
  width: "-webkit-fill-available",
  error: false,
};

const Select = React.forwardRef(
  (
    {
      children,
      options,
      defaultValue,
      error,
      message,
      width,
      onChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const controlChange = (e) => {
      setValue(e.target.value);
      onChange(e);
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <Fragment>
        <View>
          <Wrapper label={children} ref={ref} width={width} error={error}>
            <select {...rest} value={value} onChange={controlChange}>
              {_.map(options, (opt, index) => {
                return (
                  <option key={index} value={opt.value} disabled={disabled}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
          </Wrapper>
          {error && <MessageWrapper error={error}>{message}</MessageWrapper>}
        </View>
      </Fragment>
    );
  }
);

Select.defaultProps = {
  children: "",
  disabled: false,
};

export { Select };
