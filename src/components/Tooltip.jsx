import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { border, typography, color, shadow, space } from "styled-system";
import { usePopper } from "react-popper";

const TooltipWrapper = styled.div`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  padding: 10px;
  max-width: 400px;
  text-align: justify;
  z-index: 999;
  transition: all 0.2s ease;
  ${typography}
  ${color}
  ${border}
  ${shadow}
  ${space}

  /* Arrow Style */
  div,
  div::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }

  div::before {
    content: "";
    transform: rotate(45deg);
    ${color}
  }

  &[data-popper-placement="bottom"] div {
    top: -4px;
  }
  &[data-popper-placement="right"] div {
    left: -4px;
  }
  &[data-popper-placement="left"] div {
    right: -4px;
  }
  &[data-popper-placement="top"] div {
    bottom: -4px;
  }
`;
const Tooltip = ({
  referenceElement,
  placement,
  isOpen,
  children,
  ...props
}) => {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [referenceHovered, setReferenceHovered] = useState(false);
  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: placement || "top",
      modifiers: [
        {
          name: "arrow",
          options: { element: arrowElement },
        },
        {
          name: "offset",
          options: {
            offset: [0, 16],
          },
        },
      ],
    }
  );

  const handleMouseOver = useCallback(() => {
    setReferenceHovered(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setReferenceHovered(false);
  }, []);

  const tooltipStyle = useMemo(
    () => ({
      ...styles.popper,
      transform: `${styles.popper.transform} ${
        isOpen || referenceHovered ? "translateX(0)" : "scale(0.9)"
      }`,
    }),
    [styles.popper, isOpen, referenceHovered]
  );

  useEffect(() => {
    if (referenceElement) {
      referenceElement.addEventListener("mouseover", handleMouseOver);
      referenceElement.addEventListener("mouseout", handleMouseOut);

      return () => {
        referenceElement.removeEventListener("mouseover", handleMouseOver);
        referenceElement.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [referenceElement, handleMouseOver, handleMouseOut]);

  useEffect(() => {
    (isOpen || referenceHovered) && forceUpdate && forceUpdate();
  }, [isOpen, referenceHovered, forceUpdate]);

  return (
    <TooltipWrapper
      {...props}
      ref={setPopperElement}
      style={tooltipStyle}
      isOpen={isOpen || referenceHovered}
      {...attributes.popper}
    >
      {children}
      <div ref={setArrowElement} style={styles.arrow} />
    </TooltipWrapper>
  );
};

Tooltip.defaultProps = {
  fontFamily: "Roboto",
  fontSize: 1,
  bg: "darkGray",
  color: "white",
  boxShadow: "medium",
  border: "none",
  borderRadius: "tooltip",
  padding: 2,
};

export { Tooltip };
