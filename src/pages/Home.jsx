import { React, useContext } from "react";
import { Button } from "../components/Button";
import { Tab } from "../components/Tab";
import { Input } from "../components/Input";
import { View } from "../components/View";
import { Card } from "../components/Card";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { ModalNotes } from "../containers/ModalNotes";

import { NotesContext } from "../stores/NotesStore";

const Home = () => {
  const { tabOptions, newNote, setFilteredValue, searchValue, setSearchValue } =
    useContext(NotesContext);

  const onChangeTab = (e) => {
    setFilteredValue(e);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
    setFilteredValue(e.target.value);
  };

  return (
    <>
      <Card
        bg="gray"
        width="98%"
        height="98%"
        alignItems="center"
        background="#F5F5F5"
      >
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mt={3}
        >
          <Input
            name="search"
            data-testid="search"
            value={searchValue}
            icon={<SearchIcon />}
            width="920px"
            onChange={onChangeSearch}
            placeholder="Search notes..."
            background="white"
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
          <Tab
            options={tabOptions}
            selectedIndex={0}
            data-testid="tabNotes"
            onChange={(e) => onChangeTab(e)}
          />

          <Button
            type="primary"
            width="128px"
            data-testid="btnNewNote"
            onClick={() => {
              newNote();
            }}
          >
            <AddIcon /> ADD NOTE
          </Button>
        </View>
      </Card>
      <ModalNotes />
    </>
  );
};

export default Home;
