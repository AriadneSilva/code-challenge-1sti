import { React, useContext } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ModalCard } from "../components/ModalCard";
import { View } from "../components/View";
import { Select } from "../components/Select";
import { TextArea } from "../components/TextArea.jsx";

import { NotesContext } from "../stores/NotesStore";

const ModalNotes = () => {
  const {
    showModal,
    setShowModal,
    noteOptions,
    notesObj,
    setNotesObj,
    saveNote,
    startValidation,
  } = useContext(NotesContext);


  const onChangeNotesInfo = (e) => {
    const stateNoteObj = {
      ...notesObj,
      [e.target.name]: e.target.value !== "" ? e.target.value : null,
    };
    setNotesObj({ ...stateNoteObj });
  };

  const onAddButton = () => {
    saveNote();
  };

  return (
    <ModalCard
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      width="824px"
      title="Add note"
    >
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="-webkit-fill-available"
        mt={3}
      >
        <Input
          name="title"
          data-testid="title"
          width="475px"
          fontSize="16px"
          background="#F4F4F4"
          value={notesObj.title}
          mr={40}
          onChange={onChangeNotesInfo}
          placeholder="Add title..."
          error={startValidation && !notesObj.title}
          message={startValidation && !notesObj.title ? "Preencha o campo" : ""}
        ></Input>
        <Select
          options={noteOptions}
          width="247px"
          name="category"
          data-testid="category"
          onChange={onChangeNotesInfo}
          selectedValue={2}
          defaultValue={notesObj.category || ""}
          error={startValidation && !notesObj.category}
          message={
            startValidation && !notesObj.category ? "Preencha o campo" : ""
          }
        />
      </View>
      <View
        flexDirection="row"
        width="60%"
        alignItems="center"
        justifyContent="flex-end"
        mt={3}
      >
        <TextArea
          background="#F4F4F4"
          height="227px"
          data-testid="description"
          placeholder="Add descripton..."
          onChange={onChangeNotesInfo}
          name="description"
          value={notesObj.description}
          error={startValidation && !notesObj.description}
          message={
            startValidation && !notesObj.description ? "Preencha o campo" : ""
          }
        />
      </View>
      <View
        flexDirection="row"
        width="-webkit-fill-available"
        alignItems="flex-end"
        justifyContent="flex-end"
        mt={3}
      >
        <Button
          backgroundColor="transparent"
          data-testid="btnCancelNote"
          style={{
            color: "#2196F3",
          }}
          onClick={() => {
            setShowModal(false);
          }}
        >
          CANCEL
        </Button>
        <Button
          backgroundColor="transparent"
          data-testid="btnSaveNote"
          style={{
            color: "#2196F3",
          }}
          onClick={() => {
            onAddButton();
          }}
        >
          ADD
        </Button>
      </View>
    </ModalCard>
  );
};

export { ModalNotes };
