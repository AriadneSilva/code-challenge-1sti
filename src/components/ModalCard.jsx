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
        >
          <Text type="h3">{title}</Text>
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
  fontFamily: "Roboto",
  fontSize: 2,
  border: "none",
  boxShadow: "low",
  borderRadius: "4px",
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
