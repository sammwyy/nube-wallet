import React from "react";
import ReactDOM from "react-dom";

import { ChakraProvider } from "@chakra-ui/provider";
import { ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import theme from "./theme";
import { WalletProvider } from "./context/wallet-context";

ReactDOM.render(
  <WalletProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </WalletProvider>,
  document.getElementById("root")
);
