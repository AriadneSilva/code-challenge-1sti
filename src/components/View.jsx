import React from "react";
import styled from "styled-components";
import {
  typography,
  space,
  color,
  layout,
  flexbox,
  grid,
  border,
  shadow,
} from "styled-system";

/**
 * General use View component that implements the flex (or grid) layout system
 */
const StyledView = styled.div`
  ${typography}
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${grid}
  ${border}
  ${shadow}

  cursor: default;
  /* Customize website's scrollbar like Mac OS
  Not supports in Firefox and IE */

  /* total width */
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;
  }

  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {
    display: none;
  }
`;
const View = React.forwardRef(
  (
    { display, flexDirection, justifyContent, alignItems, fontSize, ...props },
    ref
  ) => {
    return (
      <StyledView
        ref={ref}
        display={display}
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
        fontSize={fontSize}
        {...props}
      />
    );
  }
);

View.defaultProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  fontSize: 1,
  tooltip: false,
};

export { View };
