// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import PropTypes from "prop-types";
// import styled, { css } from "styled-components";
// import { color, typography, layout, space } from "styled-system";
// import get from "lodash.get";
// // import map from "lodash.map";
// // import tolower from "lodash.tolower";
// import { usePopper } from "react-popper";
// import { Input } from "./Input";
// import { View } from "./View";

// const SelectBox = styled(Input)`
//   outline: 0;
//   transition: all 0.2s ease;
//   display: flex;
//   flex-direction: row;
//   align-items: stretch;
//   justify-content: space-between;
//   ${color}
//   ${typography}
//   ${({ theme, isOpen }) => css`
//     background-color: ${get(theme, "colors.white", "white")};
//     padding: ${get(theme, "parameters.inputPadding", "8px 16px")};
//     border: ${get(
//       theme,
//       `borders.${isOpen ? "inputHovered" : "input"}`,
//       "2px solid #777777"
//     )};
//     border-radius: ${get(theme, "radii.input", "4px")};

//     &::placeholder {
//       color: ${get(theme, "colors.lightGray", "#E0E0E0")};
//     }

//     &:hover,
//     &:focus {
//       border: ${get(theme, "borders.inputHovered", "2px solid #303030")};
//     }
//   `}

//   ${layout}
//   ${space}
//   ${({ theme, disabled }) =>
//     disabled &&
//     css`
//       opacity: 0.6;
//       cursor: not-allowed;

//       &:hover {
//         border: ${get(theme, "borders.input", "2px solid #777777")};
//       }
//     `}
// `;

// const Dropdown = styled.div`
//   display: flex;
//   margin-left: 2rem;
//   align-items: center;
//   justify-content: center;
//   transition: transform 0.2s ease;
//   transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};

//   svg {
//     width: 2rem;
//     height: 1.25rem;
//     color: ${({ theme }) => get(theme, "colors.gray", "#777777")};
//   }
// `;

// const OptionsWrapper = styled(View)`
//   visibility: ${({ open }) => (open ? "visible" : "hidden")};
//   opacity: ${({ open }) => (open ? "1" : "0")};
//   transform: ${({ popperTransform, open }) =>
//     `${popperTransform} ${open ? "translateX(0)" : "scale(0.9)"} !important`};
//   overflow-y: auto;
//   position: absolute;
//   z-index: 999;
//   transition: all 0.2s ease;
// `;

// OptionsWrapper.defaultProps = {
//   fontFamily: "Roboto",
//   flexDirection: "column",
//   bg: "white",
//   boxShadow: "medium",
//   borderRadius: "card",
// };

// const Options = styled(View)`
//   display: flex;
//   max-height: 30rem;
//   overflow-y: auto;
// `;

// Options.defaultProps = {
//   alignSelf: "stretch",
//   alignItems: "stretch",
// };

// const Option = styled.div`
//   display: flex;
//   padding: ${({ theme }) => get(theme, "parameters.inputPadding", "8px 16px")};
//   align-items: center;
//   justify-content: flex-start;
//   user-select: none;
//   background-color: ${({ theme }) => theme.colors.white};
//   color: ${({ theme }) => theme.colors.darkGray};
//   transition: background-color 0.4s ease;
//   cursor: pointer;
//   ${({ theme, divider }) =>
//     divider && `border-top: 1px solid ${theme.colors.lightGray}`};
//   min-height: 1.5rem;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primary};
//     color: ${({ theme }) => theme.colors.white};
//   }
// `;

// const Arrow = styled.div`
//   position: relative;
//   right: 3.5rem;

//   svg {
//     cursor: pointer;
//     height: 1rem;
//   }
// `;

// const OptionsPopper = React.forwardRef(
//   (
//     {
//       styles,
//       forceUpdate,
//       attributes,
//       isOpen,
//       search,
//       handleSearchChange,
//       renderOptions,
//     },
//     ref
//   ) => {
//     useEffect(() => {
//       forceUpdate && forceUpdate();
//     }, [isOpen, forceUpdate]);

//     return (
//       <OptionsWrapper
//         ref={ref}
//         open={isOpen}
//         popperTransform={styles.popper.transform}
//         style={styles.popper}
//         {...attributes.popper}
//       >
//         <Options>{renderOptions}</Options>
//       </OptionsWrapper>
//     );
//   }
// );

// const Select = ({ placeholder, value, options, onChange, ...rest }) => {
//   const [isOpen, setDropdown] = useState(false);
//   const [search, setSearch] = useState(value ? value : "");
//   const [referenceElement, setReferenceElement] = useState(null);
//   const [popperElement, setPopperElement] = useState(null);

//   const { styles, attributes, forceUpdate } = usePopper(
//     referenceElement,
//     popperElement,
//     {
//       placement: "bottom",
//       modifiers: [
//         {
//           name: "preventOverflow",
//         },
//         {
//           name: "offset",
//           options: {
//             offset: [0, 8],
//           },
//         },
//       ],
//     }
//   );

//   const toggleSelect = () => setDropdown((isOpen) => !isOpen);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const onSelect = (selectedValue, label) => {
//     setSearch(label);
//     onChange(selectedValue);
//     toggleSelect();
//   };

//   const onBlur = (selectedValue) => () => {
//     onChange(selectedValue);
//   };

//   // const renderOptions = map(
//   //   options.filter(({ label }) =>
//   //     label !== undefined
//   //       ? label.toLowerCase().includes(search.toLowerCase())
//   //       : label
//   //   ),
//   //   ({ value, label }) => (
//   //     <Option key={value} value={value} onClick={() => onSelect(value, label)}>
//   //       {label}
//   //     </Option>
//   //   )
//   // );

//   const renderOptions = options.map(
//     // options.filter(({ label }) =>
//     //   label !== undefined
//     //     ? label.toLowerCase().includes(search.toLowerCase())
//     //     : label
//     // ),
//     ({ value, label }) => (
//       <Option key={value} value={value} onClick={() => onSelect(value, label)}>
//         {label}
//       </Option>
//     )
//   );

//   const handleOutsideClick = useCallback(
//     (e) => {
//       referenceElement &&
//         popperElement &&
//         !popperElement.contains(e.target) &&
//         !referenceElement.contains(e.target) &&
//         setDropdown(false);
//     },
//     [referenceElement, popperElement]
//   );

//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);
//     // return function to be called when unmounted
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [handleOutsideClick]);

//   return (
//     <Fragment>
//       <Dropdown open={isOpen} />
//       <View flexDirection="row" width="100%" alignItems="center">
//         <SelectBox
//           ref={setReferenceElement}
//           onClick={toggleSelect}
//           value={search}
//           onChange={handleSearchChange}
//           onBlur={onBlur(search)}
//           placeholder={placeholder}
//         />
//         <Arrow>
//           <svg
//             width="16"
//             height="10"
//             viewBox="0 0 16 10"
//             fill="none"
//             style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
//           >
//             <path
//               d="M14.2929 2.70711C14.9229 2.07714 14.4767 1 13.5858 1L8 1L2.41421 1C1.52331 1 1.07714 2.07714 1.70711 2.70711L7.29289 8.29289C7.68342 8.68342 8.31658 8.68342 8.70711 8.29289L14.2929 2.70711Z"
//               fill="currentColor"
//               stroke="currentColor"
//             />
//           </svg>
//         </Arrow>
//       </View>
//       <OptionsPopper
//         ref={setPopperElement}
//         {...{
//           styles,
//           forceUpdate,
//           attributes,
//           isOpen,
//           search,
//           handleSearchChange,
//           renderOptions,
//         }}
//       />
//     </Fragment>
//   );
// };

// Select.propTypes = {
//   /**
//    * Placeholder when no option is selected (value is null)
//    */
//   placeholder: PropTypes.string,
//   /**
//    * Selected option value
//    */
//   value: PropTypes.any,
//   /**
//    * Array of options
//    */
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.any,
//       label: PropTypes.string,
//       onClick: PropTypes.func,
//       divider: PropTypes.bool,
//     })
//   ).isRequired,
//   /**
//    * Function that is called when the value is changed, being passed as parameter the selected option value
//    */
//   onChange: PropTypes.func,
// };

// Select.defaultProps = {
//   value: null,
//   fontFamily: "Roboto",
//   fontSize: 1,
// };

// export { Select };

import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { space, color, typography, layout, flexbox } from "styled-system";
import _ from "lodash";
//import { BiErrorCircle } from "react-icons/bi";
import { View } from "./View";
import get from "lodash.get";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin: 0;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-family: "Roboto";
  vertical-align: middle;

  ${({ theme }) => css`
    color: ${theme.colors.error};

    .message-icon {
      min-width: ${_.get(theme, "fontSizes.1")};
      width: ${_.get(theme, "fontSizes.1")};
      min-height: ${_.get(theme, "fontSizes.1")};
      height: ${_.get(theme, "fontSizes.1")};
      margin-right: 8px;
    }
  `}
`;

const Wrapper = styled.label`
  ${color}
  ${typography}
  ${space}

  width: 100%;

  ${({ theme, label, error }) =>
    Boolean(label) &&
    css`
      &:before {
        content: "${label}";
        display: block;
        margin-bottom: 0.5rem;
        width: 100%;
        text-align: left;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: normal;
        color: ${error ? theme.colors.error : theme.colors.darkGray};
      }
    `}

  select {
    outline: 0;
    transition: all 0.2s ease;

    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${space}

    ${({ theme, error }) => css`
      background-color: ${theme.colors.secondary};
      padding: 0.5rem;
      // border: 0.25rem solid;
      // border-color: ${error ? theme.colors.error : theme.colors.darkGray};
      //color: ${error ? theme.colors.error : theme.colors.darkGray};

      &:hover,
      &:focus {
        border: 0.25rem solid #62a9b3;
      }
    `}


    ${({ width }) =>
      width &&
      css`
        width: ${width};
      `}

    option {
      color: black !important;
    }
  }
`;
Wrapper.defaultProps = {
  fontSize: "24px",
  fontFamily: "Roboto",
  fontWeight: "normal",
  color: "#00000099",
  width: "-webkit-fill-available",
  error: false,
};

const Select = React.forwardRef(
  (
    {
      children,
      options,
      defaultValue,
      error,
      message,
      width,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const controlChange = (e) => {
      setValue(e.target.value);
      onChange(e);
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <Fragment>
        <View>
          <Wrapper label={children} ref={ref} width={width} error={error}>
            <select {...rest} value={value} onChange={controlChange}>
              {_.map(options, (opt, index) => {
                return (
                  <option key={index} value={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
          </Wrapper>
          {error && (
            <MessageWrapper error={error}>
              {/* <BiErrorCircle className="message-icon" color="error" /> */}
              {message}
            </MessageWrapper>
          )}
        </View>
      </Fragment>
    );
  }
);

Select.defaultProps = {
  children: "",
  disabled: false,
};

export { Select };
