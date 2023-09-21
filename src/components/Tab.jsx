import React, { Fragment, useEffect, useState } from "react";
import { Button } from "./Button";
import { View } from "./View";
import PropTypes from "prop-types";

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

  const getBorderRadius = (isFirst, isLast) => {
    if (isFirst) {
      return direction === "horizontal" ? "4px 0 0 4px" : "4px 4px 0 0";
    } else if (isLast) {
      return direction === "horizontal" ? "0 4px 4px 0" : "0 0 4px 4px";
    }
    return "0";
  };

  const renderButtons = () => {
    return options.map((option, index) => {
      return (
        <Button
          type={index === selectedTab ? "primary" : "white"}
          onClick={() => {
            setSelectedTab(index);
            onChange && onChange(index);
          }}
          key={index}
          backgroundColor="white"
          borderRadius={getBorderRadius(
            index === 0,
            index === options.length - 1
          )}
          width={width}
          style={{ whiteSpace: "nowrap" }}
        >
          {option.label}
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
