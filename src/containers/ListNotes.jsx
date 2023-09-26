import React, { useContext, useRef } from "react";

import { View } from "../components/View";
import { Text } from "../components/Text";
import { Checkbox } from "../components/CheckBox";
import { Card } from "../components/Card";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { NotesContext } from "../stores/NotesStore";

import { ProgressBar } from "../components/ProgressBar";
import { TooltipConfirmation } from "./TooltipConfirmation";

import theme from "../theme";

const ListNotes = () => {
  const {
    filteredNotesList,
    editNote,
    setNotesList,
    notesList,
    readNotes,
    setShowConfirmation,
  } = useContext(NotesContext);

  const onEditIcon = (id) => {
    editNote(id);
  };

  const onDeleteIcon = (idNote) => {
    setShowConfirmation(idNote);
  };
  const myRefs = useRef([]);

  const handleCheckboxChange = (event, note) => {
    let newList = notesList.map((item) => {
      if (item.id === note.id) {
        item.read = event.target.checked;
      }
      return item;
    });
    setNotesList(newList);
  };

  return (
    <>
      <View width="-webkit-fill-available" alignItems="center">
        <View
          width="120%"
          height="calc(100vh - 22rem)"
          style={{
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <ProgressBar
            value={(readNotes * 100) / notesList.length}
            max={100}
            message={`You have ${readNotes}/${notesList.length} notes completed`}
          />
          <View width="100%" flexWrap="wrap" flexDirection="row">
            {filteredNotesList.map((note, i) => {
              return (
                <Card
                  background={
                    note.category === "1"
                      ? theme.colors.homeColor
                      : note.category === "2"
                      ? theme.colors.workColor
                      : theme.colors.personalColor
                  }
                  width="404px"
                  height="174px"
                  style={{ overflow: "scroll" }}
                  m={10}
                >
                  <View
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    m={2}
                  >
                    <View flexDirection="colum">
                      <Checkbox
                        checked={note.read}
                        onChange={(e) => {
                          handleCheckboxChange(e, note);
                        }}
                      />

                      <Text
                        type="noteTitle"
                        style={{
                          textDecoration: note.read ? "line-through" : "none",
                        }}
                      >
                        {note.title}
                      </Text>
                    </View>
                    {!note.read && (
                      <View flexDirection="colum">
                        <EditIcon
                          htmlColor="white"
                          style={{
                            opacity: "0.6",
                          }}
                          onClick={() => {
                            onEditIcon(note.id);
                          }}
                        />

                        <DeleteIcon
                          htmlColor="white"
                          style={{
                            opacity: "0.6",
                          }}
                          onClick={() => {
                            onDeleteIcon(note.id);
                          }}
                          ref={(ref) => (myRefs.current[i] = ref)}
                        />

                        <TooltipConfirmation
                          reference={myRefs.current[i]}
                          idNote={note.id}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    p={1}
                    m={1}
                  >
                    <Text
                      type="noteDescription"
                      style={{
                        textDecoration: note.read ? "line-through" : "none",
                      }}
                    >
                      {note.description}
                    </Text>
                  </View>
                  <View
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    m={2}
                  >
                    <Text
                      type="noteDate"
                      style={{
                        textDecoration: note.read ? "line-through" : "none",
                      }}
                    >
                      {note.date}
                    </Text>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

export { ListNotes };
