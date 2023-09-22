import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { space, color, typography, layout, flexbox } from "styled-system";
import get from "lodash.get";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: ${({ theme }) => get(theme, "fontSizes.1")};
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

    ${({ theme, success, warning, error }) => css`
      background-color: ${get(theme, "colors.white", "white")};
      padding: ${get(theme, "parameters.inputPadding", "8px 16px")};
      border: ${get(theme, "borders.input", "2px solid")};
      border-color: ${success
        ? get(theme, "colors.success")
        : error
        ? get(theme, "colors.error")
        : warning
        ? get(theme, "colors.warning")
        : "#E0E0E0"};
      border-radius: ${get(theme, "radii.input", "4px")};

      &::placeholder {
        color: ${get(theme, "colors.lightGray", "#E0E0E0")};
      }

      &:hover,
      &:focus {
        border: ${get(theme, "borders.inputHovered", "2px solid #777777")};
      }
    `}

    ${({ width }) =>
      width &&
      css`
        width: ${width};
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
  fontSize: 1,
  color: "black",
  width: "-webkit-fill-available",
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
        >
          <textarea
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...rest}
            rows={rows}
            cols={cols}
          />
        </Wrapper>
        {message && (
          <MessageWrapper success={success} error={error} warning={warning}>
            {message}
          </MessageWrapper>
        )}
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
};

export { TextArea };
