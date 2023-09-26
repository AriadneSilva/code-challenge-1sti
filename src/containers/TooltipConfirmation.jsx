import React, { useContext } from "react";

import { Tooltip } from "../components/Tooltip";
import { View } from "../components/View";

import { NotesContext } from "../stores/NotesStore";

const TooltipConfirmation = ({ reference, idNote }) => {
  const { showConfirmation, setShowConfirmation, deleteNote } =
    useContext(NotesContext);

  const onDelete = (id) => {
    deleteNote(idNote);
  };

  const onCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <View flexDirection="row">
      <Tooltip
        referenceElement={reference}
        placement={"top"}
        isOpen={showConfirmation === idNote}
        bg="white"
        color="black"
        fontSize="16px"
        width="50%"
      >
        Delete Note?
        <br />
        <br />
        <br />
        <button
          onClick={() => {
            onCancel();
          }}
          style={{
            backgroundColor: "transparent",
            color: "#2196F3",
            border: "0px",
          }}
        >
          CANCEL
        </button>
        &ensp;
        <button
          onClick={() => {
            onDelete();
          }}
          style={{
            backgroundColor: "transparent",
            color: "#2196F3",
            border: "0px",
          }}
        >
          DELETE
        </button>
      </Tooltip>
    </View>
  );
};

export { TooltipConfirmation };
