import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { space, color, typography, layout, flexbox } from "styled-system";
import _ from "lodash";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { View } from "./View";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin: 0;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-family: "Montserrat";
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
        font-weight: bold;
        color: ${error ? theme.colors.error : theme.colors.darkGray};
      }
    `}

  select {
    outline: 0;
    transition: all 0.2s ease;

    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${space}

    ${({ theme, error }) => css`
      background-color: ${theme.colors.secondary};
      padding: 0.5rem;
      border: 0.25rem solid;
      border-color: ${error ? theme.colors.error : theme.colors.darkGray};
      color: ${error ? theme.colors.error : theme.colors.darkGray};

      &:hover,
      &:focus {
        border: 0.25rem solid #62a9b3;
      }
    `}


    ${({ width }) =>
      width &&
      css`
        width: ${width};
      `}

    option {
      color: black !important;
    }
  }
`;

Wrapper.defaultProps = {
  fontSize: "2rem",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  color: "black",
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
                  <option key={index} value={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
          </Wrapper>
          {error && (
            <MessageWrapper error={error}>
              <ErrorOutlineIcon className="message-icon" color="error" />
              {message}
            </MessageWrapper>
          )}
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
