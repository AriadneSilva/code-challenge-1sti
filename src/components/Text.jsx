import styled from "styled-components";
import { space, color, typography, layout, variant } from "styled-system";

const Text = styled.span`
  display: inline-block;
  transition: all 0.15s ease;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${variant({
    prop: "type",
    variants: {
      h1: {
        fontSize: 3,
        fontWeight: "bold",
        lineHeight: "10rem",
        textTransform: "uppercase",
      },
      h2: {
        fontSize: "34px",
        fontWeight: "normal",
        color: "#00000099",
        textAlign: "left",
        letterSpacing: "0px",
        opacity: "0.6",
      },
      h3: {
        fontSize: 1,
        fontWeight: "normal",
        lineHeight: "4.5rem",
        color: "#00000099",
        textAlign: "left",
        letterSpacing: "0px",
        opacity: "0.8",
      },
      small: {
        fontSize: "1rem",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
      normal: {
        fontSize: "1.5rem",
      },
      noteTitle: {
        color: "#FFFFFF",
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "medium",
        fontSize: "20px",
        fontFamily: "Roboto",
        textAlign: "left",
        letterSpacing: "0px",
        opacity: "1",
      },
      noteDescription: {
        color: "white",
        fontStyle: "normal",
        fontVariant: "normal",
        fontSize: "14px",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: "0px",
        opacity: "0.8",
      },
      noteDate: {
        color: "white",
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "medium",
        fontSize: "15px",
        textAlign: "left",
        letterSpacing: "0px",
        opacity: "0.6",
      },
    },
  })}
`;

Text.defaultProps = {
  color: "darkGray",
  type: "medium",
};

export { Text };
