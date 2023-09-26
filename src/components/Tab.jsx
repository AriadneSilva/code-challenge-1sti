import React, { Fragment, useEffect, useState } from "react";
import { Button } from "./Button";
import { View } from "./View";
import PropTypes from "prop-types";
import styled from "styled-components";
import { background } from "styled-system";

const Circle = styled.div`
  ${background}
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin-top: 2px;
`;

Circle.propTypes = {
  background: "",
};

const Tab = ({
  selectedIndex,
  options,
  direction,
  onChange,
  width,
  ...rest
}) => {
  const [selectedTab, setSelectedTab] = useState(selectedIndex);

  useEffect(() => {
    setSelectedTab(selectedIndex);
  }, [selectedIndex]);


  const renderButtons = () => {
    return options.map((option, index) => {
      return (
        <Button
          type={index === selectedTab ? "selected" : "white"}
          onClick={() => {
            setSelectedTab(index);
            onChange && onChange(index);
          }}
          key={index}
          backgroundColor="transparent"
          borderRadius={"4px"}
          width={"95px"}
          style={{
            whiteSpace: "nowrap",
            color: index === selectedTab ? "white" : "#00000099",
          }}
          flexDirection="column"
          fontSize="18px"
          mr={40}
        >
          {option.label}
          <Circle background={option.color} />
        </Button>
      );
    });
  };

  return (
    <Fragment>
      <View
        width="100%"
        flexDirection={direction === "horizontal" ? "column" : "row"}
      >
        <View
          flexDirection={direction === "horizontal" ? "row" : "column"}
          width="fit-content"
        >
          {renderButtons()}
        </View>
        {options.map(
          (option, index) =>
            selectedTab === index && (
              <View width="100%" key={index}>
                {option.content}
              </View>
            )
        )}
      </View>
    </Fragment>
  );
};

Tab.propTypes = {
  options: PropTypes.any,
  selectedIndex: PropTypes.number,
  direction: PropTypes.string,
  width: PropTypes.string,
  onChange: PropTypes.func,
};

Tab.defaultProps = {
  options: [],
  selectedIndex: 0,
  direction: "horizontal",
  width: "100%",
};

export { Tab };
