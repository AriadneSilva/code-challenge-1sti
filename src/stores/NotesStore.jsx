import React, { createContext, useEffect, useState, useMemo } from "react";

import { ListNotes } from "../containers/ListNotes";

export const NotesContext = createContext();
export const NotesProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [startValidation, setStartValidation] = useState(false);
  const [validModal, setValidModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [readNotes, setReadNotes] = useState(0);
  const [filteredValue, setFilteredValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const tabOptions = [
    {
      label: "All",
      content: <ListNotes />,
    },
    {
      label: "Home",
      content: <ListNotes />,
      color: "#FF9100",
    },
    {
      label: "Work",
      content: <ListNotes />,
      color: "#5C6BC0",
    },
    {
      label: "Personal",
      content: <ListNotes />,
      color: "#66BB6A",
    },
  ];

  const noteOptions = [
    {
      value: 0,
      label: "Select Category",
      disabled: true,
    },
    {
      value: "1",
      label: "Home",
    },
    {
      value: "2",
      label: "Work",
    },
    {
      value: "3",
      label: "Personal",
    },
  ];

  const [notesObj, setNotesObj] = useState({
    id: null,
    title: null,
    category: null,
    description: null,
    date: null,
    read: false,
  });

  const [notesList, setNotesList] = useState([]);

  localStorage.setItem("arrayNotes", JSON.stringify(notesList));

  const newNote = () => {
    setNotesObj({
      id: null,
      title: null,
      category: null,
      description: null,
      date: null,
      read: false,
    });
    setIsEditing(false);
    setStartValidation(false);
    setShowModal(true);
  };

  const editNote = (idNote) => {
    let noteEdit = notesList.find((note) => {
      return note.id === idNote;
    });
    setIsEditing(true);
    setNotesObj(noteEdit);
    setShowModal(true);
  };

  const deleteNote = (idNote) => {
    let updatedList = notesList.filter((note) => {
      return note.id !== idNote;
    });

    setNotesList(updatedList);
    localStorage.setItem("arrayNotes", JSON.stringify(updatedList));
  };

  const saveNote = () => {
    if (!startValidation) {
      setStartValidation(true);
    }

    if (validModal) {
      if (isEditing) {
        let newList = notesList.map((note) => {
          if (note.id === notesObj.id) {
            note = notesObj;
          }
          return note;
        });
        setNotesList(newList);

        localStorage.setItem("arrayNotes", JSON.stringify(newList));

        setStartValidation(false);
        setShowModal(false);
      } else {
        notesObj.id = notesList.length + 1;

        notesObj.date = new Date().toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        notesObj.read = false;
        setNotesList([...notesList, notesObj]);
        localStorage.setItem(
          "arrayNotes",
          JSON.stringify([...notesList, notesObj])
        );
        setStartValidation(false);
        setShowModal(false);
      }
    }
  };

  const filteredNotesList = useMemo(() => {
    if (filteredValue !== "" && filteredValue !== 0) {
      return notesList.filter((note) => {
        if (Number.isInteger(filteredValue)) {
          return parseInt(note.category) === filteredValue;
        } else {
          return (
            note.title.toUpperCase().indexOf(filteredValue.toUpperCase()) >= 0
          );
        }
      });
    } else {
      return notesList;
    }
  }, [filteredValue, notesList]);

  useEffect(() => {
    if (notesList.length > 0) {
      let completedNotes = notesList.filter((note) => {
        return note.read !== false;
      });
      setReadNotes(completedNotes.length);
    }
  }, [notesList]);

  useEffect(() => {
    const emptyFields = notesObj.category === null;
    setValidModal(!emptyFields);
  }, [notesObj]);

  useEffect(() => {
    let dataCache = localStorage.getItem("arrayNotes");
    if (dataCache !== null) {
      setNotesList(JSON.parse(dataCache));
    }
  }, []);

  const renderStore = (
    <NotesContext.Provider
      value={{
        notesObj,
        setNotesObj,
        showModal,
        setShowModal,
        tabOptions,
        noteOptions,
        editNote,
        notesList,
        setNotesList,
        newNote,
        saveNote,
        deleteNote,
        readNotes,
        filteredValue,
        setFilteredValue,
        filteredNotesList,
        showConfirmation,
        setShowConfirmation,
        startValidation,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </NotesContext.Provider>
  );

  return renderStore;
};
