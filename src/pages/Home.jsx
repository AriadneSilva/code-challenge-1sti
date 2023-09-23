import { React, useContext } from "react";
import { Button } from "../components/Button";
import { Tab } from "../components/Tab";
import { Input } from "../components/Input";
import { ModalCard } from "../components/ModalCard";
import { View } from "../components/View";
import { Text } from "../components/Text";
import { ProgressBar } from "../components/ProgressBar";
import { Select } from "../components/Select";
import { Card } from "../components/Card";
import { TextArea } from "../components/TextArea.jsx";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { ModalNotes } from "../containers/ModalNotes";

import { NotesContext } from "../stores/NotesStore";

const Home = () => {
  const { showModal, setShowModal, tabOptions, noteOptions, newNote } =
    useContext(NotesContext);

  return (
    <>
      <Card bg="gray" width="90%" alignItems="center">
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mt={3}
        >
          {" "}
          <Input
            name="search"
            data-testid="search"
            value={""}
            icon={<SearchIcon />}
            width="824px"
            // onChange={onChangeCustomerInfo}
            //  error={startValidation && !customerObj.rg}
            //  message={startValidation && !customerObj.rg ? "Preencha o campo" : ""}
            placeholder="Search notes..."
          ></Input>
        </View>
        <View
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="center"
          mt={3}
          width="50%"
          p={10}
        >
          <Tab options={tabOptions} selectedIndex={0} />
          <Button
            type="primary"
            width="25%"
            onClick={() => {
              newNote();
              setShowModal(true);
            }}
          >
            <AddIcon /> ADD NOTE
          </Button>
        </View>
        <ModalNotes mode={"add"} />
      </Card>
    </>
  );
};

export default Home;
