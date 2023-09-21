import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { color, typography, layout } from "styled-system";
import get from "lodash.get";
import { Card } from "./Card";
import { LoadingOverlay } from "./LoadingOverlay";

const Wrapper = styled(Card)`
  ${color}
  ${typography}
  ${layout}

  width: fit-content;
  font-weight: bold;
  font-size: 2.5rem;

  progress {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: ${({ width }) => width};
    height: 2rem;
    margin-top: 1rem;
  }

  progress::-webkit-progress-bar {
    ${({ theme }) => css`
      background-color: ${get(theme, "colors.offWhite", "#f5f5f5")};
    `}
    border-radius: 1rem;
  }

  progress::-webkit-progress-value {
    ${({ theme, color }) => css`
      background-color: ${get(theme, `colors.${color}`, "#667eea")};
    `}
    border-radius: 1rem;
  }
`;

Wrapper.defaultProps = {
  fontFamily: "Roboto",
  fontSize: 2,
};

const ProgressBar = React.forwardRef(
  (
    {
      children,
      value,
      hideValue,
      max,
      color,
      width,
      message,
      showLoading,
      ...rest
    },
    ref
  ) => {
    return (
      <Fragment>
        <Wrapper color={color} width={width} {...rest} ref={ref}>
          {showLoading && (
            <div
              style={{
                position: "relative",
                marginLeft: "2rem",
                top: "1.5rem",
              }}
            >
              <LoadingOverlay visible size="4rem" />
            </div>
          )}
          <div style={{ marginLeft: showLoading ? "4.5rem" : "0" }}>
            {!hideValue && `${value}%`} {message || ""}
          </div>
          <progress id="progressBar" max={max} value={value} {...rest} />
        </Wrapper>
      </Fragment>
    );
  }
);

ProgressBar.defaultProps = {
  max: 100,
  value: 0,
  type: "primary",
  width: "50rem",
};

export { ProgressBar };
