import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  background,
} from "styled-system";
import get from "lodash.get";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: 16px;
  margin: 0;
  margin-bottom: 2rem;
  font-family: "Roboto";
  color: ${({ theme, success, warning, error }) =>
    success
      ? get(theme, "colors.success")
      : error
      ? get(theme, "colors.error")
      : warning
      ? get(theme, "colors.warning")
      : "#E0E0E0"};

  vertical-align: middle;
  font-family: Roboto;

  .message-icon {
    ${({ theme }) => css`
      min-width: ${get(theme, "fontSizes.3")};
      width: ${get(theme, "fontSizes.3")};
      min-height: ${get(theme, "fontSizes.3")};
      height: ${get(theme, "fontSizes.3")};
    `}
    margin-right: 8px;
  }
`;

const Wrapper = styled.label`
  ${color}
  ${typography}
  ${space}

  width: 100%;

  ${({ theme, label }) =>
    Boolean(label) &&
    css`
      &:before {
        content: "${label}";
        display: block;
        margin-bottom: ${get(theme, "parameters.inputLabelMargin", "4px")};
        width: 100%;
        text-align: left;
      }
    `}

  textarea {
    outline: 0;
    transition: all 0.2s ease;
    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${space}
    ${background}

    ${({ theme, success, warning, error }) => css`
      padding: ${get(theme, "parameters.inputPadding", "8px 16px")};
      border: ${get(theme, "borders.input", "2px solid")};
      border-color: ${success
        ? get(theme, "colors.success")
        : error
        ? get(theme, "colors.error")
        : warning
        ? get(theme, "colors.warning")
        : "#E0E0E0"};
      border-radius: ${get(theme, "radio.input", "4px")};

      &::placeholder {
        color: ${get(theme, "colors.lightGray", "#00000099")};
      }

      &: hover;
    `}

    ${({ width, height }) =>
      width &&
      css`
        width: ${width};
        height: ${height};
      `}

    ${({ disabled }) =>
      disabled &&
      css`
        opacity: 0.5;
        cursor: not-allowed;
      `}
  }
`;

Wrapper.defaultProps = {
  fontFamily: "Roboto",
  fontSize: "24px",
  color: "black",
  width: "-webkit-fill-available",
  height: "227px",
};

const TextArea = React.forwardRef(
  (
    {
      children,
      disabled,
      cancelable,
      searchable,
      error,
      success,
      warning,
      message,
      messageType,
      width,
      rows,
      cols,
      background,
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState("");
    const onChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <Fragment>
        <Wrapper
          label={children}
          disabled={disabled}
          ref={ref}
          width={width}
          success={success}
          error={error}
          warning={warning}
          background={background}
        >
          <textarea
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...rest}
            rows={rows}
            cols={cols}
          />
          {message && (
            <MessageWrapper success={success} error={error} warning={warning}>
              {message}
            </MessageWrapper>
          )}{" "}
        </Wrapper>
      </Fragment>
    );
  }
);

TextArea.defaultProps = {
  children: "",
  disabled: false,
  searchable: false,
  rows: 4,
  cols: 50,
  background: "white",
};

export { TextArea };
