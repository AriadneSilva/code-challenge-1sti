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
        fontSize: 2,
        fontWeight: "bold",
        lineHeight: "6.75rem",
      },
      h3: {
        fontSize: 1,
        fontWeight: "bold",
        lineHeight: "4.5rem",
      },
      small: {
        fontSize: "1rem",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
      medium: {
        fontSize: "1.5rem",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
      normal: {
        fontSize: "1.5rem",
      },
      smallTitle: {
        color: "primary",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
      smallDescription: {
        color: "white",
        fontSize: "0.75rem",
        textTransform: "uppercase",
      },
      largeDescription: {
        color: "white",
        fontSize: "2.5rem",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
  })}
`;

Text.defaultProps = {
  color: "darkGray",
  type: "medium",
};

export { Text };
