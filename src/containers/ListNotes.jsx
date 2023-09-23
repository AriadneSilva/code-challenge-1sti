import React, { useContext, useEffect, useMemo, useState } from "react";

//COMPONENTES
import { View } from "../components/View";
import { Text } from "../components/Text";
import { Checkbox } from "../components/CheckBox";

import { Card } from "../components/Card";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useLocation } from "react-router-dom";

import { NotesContext } from "../stores/NotesStore";

import theme from "../theme";

const ListNotes = () => {
  const location = useLocation();

  const teste = theme.colors.homeColor; //get(theme, "homeColor");

  const { notesList } = useContext(NotesContext);

  //const [filteredValue, setFilteredValue] = useState("");

  //   useEffect(() => {
  //     const hydrate = async () => {
  //       location.pathname === "/list" && !customerList && (await getCustomers());
  //     };
  //     hydrate();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   const filteredCustomerList = useMemo(() => {
  //     if (filteredValue !== "") {
  //       return _.filter(
  //         customerList,
  //         (customer) =>
  //           _.toUpper(customer.nome).indexOf(_.toUpper(filteredValue)) >= 0 ||
  //           _.toUpper(customer.rg).indexOf(_.toUpper(filteredValue)) >= 0
  //       );
  //     } else {
  //       return customerList;
  //     }
  //   }, [filteredValue, customerList]);

  const cliqueiNoEdit = () => {
    console.log("Cliquei no edit");
  };

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <View width="-webkit-fill-available" alignItems="center">
        <View
          width="100%"
          height="calc(100vh - 22rem)"
          style={{
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          {notesList.map((note, index) => {
            let colorTeste = theme.colors.homeColor;
            console.log("Cor de teste: ", colorTeste);
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
                style={{ overflowY: "auto" }}
                height="174px"
                m={10}
              >
                <View
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  m={3}
                  p={1}
                  width="100%"
                >
                  <Checkbox
                    checked={note.read}
                    onChange={handleCheckboxChange}
                  />

                  <Text type="noteTitle">{note.title}</Text>
                  <EditIcon htmlColor="white" onClick={cliqueiNoEdit} />
                  <DeleteIcon htmlColor="white" />
                </View>
                <View
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  p={1}
                >
                  <Text type="noteDescription">{note.description}</Text>
                </View>
                <View
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text type="noteDate">{note.date}</Text>
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    </>
  );
};

export { ListNotes };
