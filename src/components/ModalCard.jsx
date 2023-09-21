import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Text } from "./Text";
import { View } from "./View";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  shadow,
  grid,
} from "styled-system";
import CSSTransition from "react-transition-group/CSSTransition";
import ReactDOM from "react-dom";

const CardWrapper = styled.div`
  transition: all 0.2s ease;
  padding: 2rem;

  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${grid}
  ${border}
  ${shadow}

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;

      &:hover {
        box-shadow: 0px 0.8rem 1.8rem rgba(0, 0, 0, 0.12);
      }
    `}
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(119, 119, 119, 0.5);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;

  &.modal-enter {
    opacity: 0;
  }
  &.modal-enter-active {
    opacity: 1;
    transition: opacity 300ms ease;
  }
  &.modal-exit {
    opacity: 1;
  }
  &.modal-exit-active {
    opacity: 0;
    transition: opacity 300ms ease;
  }
`;

const CloseWrapper = styled.button`
  outline: 0;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  border: none;
  height: 4rem;
  width: 4rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    color: ${theme.colors.gray};
    box-shadow: 0rem 0.2rem 0.45rem rgba(0, 0, 0, 0.132);

    &:hover {
      color: ${theme.colors.danger};
      box-shadow: 0px 0.8rem 1.8rem rgba(0, 0, 0, 0.12);
    }
  `}

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Card = (props) => {
  return <CardWrapper {...props}>{props.children}</CardWrapper>;
};

const ModalContent = ({ onOutsideClick, children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      onOutsideClick &&
        wrapperRef &&
        wrapperRef.current === e.target &&
        onOutsideClick();
    };
    const handleEscPress = (e) => {
      wrapperRef &&
        getComputedStyle(wrapperRef.current).opacity === "1" &&
        e.key === "Escape" &&
        onOutsideClick();
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscPress, false);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, [onOutsideClick, wrapperRef]);

  const renderComponent = (
    <ModalWrapper ref={wrapperRef}>{children}</ModalWrapper>
  );
  return ReactDOM.createPortal(renderComponent, document.body);
};

/**
 * Modal component used to render
 */
const Modal = ({ isOpen, onModalExit, ...rest }) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      onExited={onModalExit}
      unmountOnExit
    >
      <ModalContent isOpen={isOpen} {...rest} />
    </CSSTransition>
  );
};

const CloseButton = (props) => {
  return (
    <CloseWrapper {...props}>
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M0.585786 12.5858C-0.195262 13.3668 -0.195262 14.6332 0.585786 15.4142C1.36683 16.1953 2.63317 16.1953 3.41421 15.4142L0.585786 12.5858ZM15.4142 3.41421C16.1953 2.63317 16.1953 1.36683 15.4142 0.585786C14.6332 -0.195262 13.3668 -0.195262 12.5858 0.585786L15.4142 3.41421ZM12.5858 15.4142C13.3668 16.1953 14.6332 16.1953 15.4142 15.4142C16.1953 14.6332 16.1953 13.3668 15.4142 12.5858L12.5858 15.4142ZM3.41421 0.585786C2.63317 -0.195262 1.36683 -0.195262 0.585786 0.585786C-0.195262 1.36683 -0.195262 2.63317 0.585786 3.41421L3.41421 0.585786ZM3.41421 15.4142L9.41421 9.41421L6.58579 6.58579L0.585786 12.5858L3.41421 15.4142ZM9.41421 9.41421L15.4142 3.41421L12.5858 0.585786L6.58579 6.58579L9.41421 9.41421ZM6.58579 9.41421L12.5858 15.4142L15.4142 12.5858L9.41421 6.58579L6.58579 9.41421ZM9.41421 6.58579L3.41421 0.585786L0.585786 3.41421L6.58579 9.41421L9.41421 6.58579Z"
          fill="currentColor"
        />
      </svg>
    </CloseWrapper>
  );
};

const ModalCard = ({
  children,
  title,
  isOpen,
  onClose,
  closeOnOutsideClick,
  ...rest
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOutsideClick={closeOnOutsideClick ? onClose : undefined}
    >
      <Card {...rest} style={{ cursor: "default" }}>
        <View
          flexDirection="row"
          alignSelf="stretch"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Text type="h3">{title}</Text>
          <CloseButton onClick={onClose} />
        </View>
        {children}
      </Card>
    </Modal>
  );
};

Card.defaultProps = {
  bg: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  fontFamily: "Montserrat",
  fontSize: 2,
  border: "none",
  boxShadow: "low",
  borderRadius: "card",
};

Modal.defaultProps = {
  isOpen: false,
};

ModalCard.defaultProps = {
  isOpen: false,
  maxWidth: "70vw",
  closeOnOutsideClick: true,
};

export { ModalCard };
