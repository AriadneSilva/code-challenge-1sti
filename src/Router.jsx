import React from "react";
import { Route, Routes } from "react-router-dom";

//COMPONENTS
import { View } from "./components/View";

//PAGES
import Home from "./pages/Home";

const Router = () => {
  return (
    <>
      <View width="100%" height="100vh" backgroundColor="white">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </View>
    </>
  );
};

export default Router;
