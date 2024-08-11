import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import { createRoot } from 'react-dom/client';
import Playground from "./components/Playground/Playground.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Playground />
    </ChakraProvider>
  </React.StrictMode>
);