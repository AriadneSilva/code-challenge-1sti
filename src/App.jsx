import React from "react";

//UTILS
import { ThemeProvider } from "./TheneProvider";
import theme from "./theme";
import Router from "./Router";

//EXTERNAL LIBS
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// //STORES
import { NotesProvider } from "./stores/NotesStore";

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <ThemeProvider theme={theme}>
      <NotesProvider>
        <Router />
      </NotesProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
