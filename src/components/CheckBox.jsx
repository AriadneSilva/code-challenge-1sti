import React from "react";
import styled, { css } from "styled-components";
import { space, typography, layout, flexbox } from "styled-system";
import get from "lodash.get";

const Wrapper = styled.label`
  ${space}
  ${typography}
  ${layout}
  ${flexbox}
  border: none;
  cursor: pointer;

  input {
    appearance: none;
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span:first-of-type {
    position: relative;
    transition: all 0.2s ease;
    box-sizing: border-box;
    ${({ theme }) => css`
      background-color: transparent;
      margin-right: ${get(theme, "parameters.checkboxRightMargin", "16px")};
      width: ${get(theme, "parameters.checkboxSize", "16px")};
      height: ${get(theme, "parameters.checkboxSize", "16px")};
      border: ${get(theme, "borders.checkbox", "2px solid #777777")};
      border-radius: ${get(theme, "radii.checkbox", "4px")};

      &:hover {
        background-color: ${get(theme, "colors.lightGray", "#777777")};
        border: ${get(theme, "borders.checkboxHovered", "2px solid #303030")};
      }

      &:after {
        transition: all 0.2s ease;
        content: "";
        position: absolute;
        top: calc(${get(theme, "parameters.checkboxSize", "16px")} / 14);
        left: calc(${get(theme, "parameters.checkboxSize", "16px")} / 4);
        width: calc(${get(theme, "parameters.checkboxSize", "16px")} / 4);
        height: calc(${get(theme, "parameters.checkboxSize", "16px")} / 2.2);
        border: solid ${get(theme, "colors.white", "white")};
        border-radius: 0.125rem;
        border-width: 0 0.25rem 0.25rem 0;
        background-color: transparent;
        transform: rotate(45deg) scale(0);
        opacity: 0;
      }
    `}
  }

  input:checked ~ span {
    ${({ theme }) => css`
      background-color: ${get(theme, "colors.success", "#59e480")};
      border: ${get(theme, "borders.checkboxChecked", "2px solid #59e480")};

      &:hover {
        border: ${get(theme, "borders.checkboxHovered", "2px solid #303030")};
        background-color: ${get(theme, "colors.success", "#59e480")};
      }

      &:after {
        transform: rotate(45deg) scale(1);
        opacity: 1;
      }
    `}
  }
`;

Wrapper.defaultProps = {
  width: "fit-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  fontFamily: "Roboto",
  fontSize: 1,
};

const Checkbox = React.forwardRef(
  (
    {
      children,
      m,
      margin,
      mt,
      marginTop,
      mr,
      marginRight,
      mb,
      marginBotton,
      ml,
      marginLeft,
      mx,
      my,
      p,
      padding,
      pt,
      paddingTop,
      pr,
      paddingRight,
      pb,
      paddingBotton,
      pl,
      paddingLeft,
      px,
      py,
      ...rest
    },
    ref
  ) => {
    const spacingProps = {
      m,
      margin,
      mt,
      marginTop,
      mr,
      marginRight,
      mb,
      marginBotton,
      ml,
      marginLeft,
      mx,
      my,
      p,
      padding,
      pt,
      paddingTop,
      pr,
      paddingRight,
      pb,
      paddingBotton,
      pl,
      paddingLeft,
      px,
      py,
    };

    // Remove undefined
    Object.keys(spacingProps).forEach((key) =>
      spacingProps[key] === undefined ? delete spacingProps[key] : {}
    );

    return (
      <Wrapper {...spacingProps} ref={ref}>
        <input type="checkbox" {...rest} />
        <span />
        {children}
      </Wrapper>
    );
  }
);

export { Checkbox };
