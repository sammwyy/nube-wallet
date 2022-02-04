import { Box, Flex, IconButton } from "@chakra-ui/react";
import { CgClose, CgMaximize, MdMinimize } from "react-icons/all";

import styles from "./titlebar.module.css";

function TitlebarButton({ icon, func }) {
  const Icon = icon;
  return (
    <IconButton
      className={styles["btn"]}
      ml={1}
      size={"xs"}
      icon={<Icon />}
      onClick={() => {
        func();
      }}
    />
  );
}

export default function Titlebar() {
  function close() {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("command", "close");
  }

  function maximize() {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("command", "maximize");
  }

  function minimize() {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("command", "minimize");
  }

  return (
    <Box
      position={"fixed"}
      width={"100%"}
      px={5}
      py={2}
      className={styles["titlebar"]}
    >
      <Flex
        justifyContent={"flex-end"}
        alignItems={"center"}
        className={styles["buttons"]}
      >
        <Box width="100%" color="transparent" className={styles["drag-area"]}>
          .
        </Box>
        <TitlebarButton icon={MdMinimize} func={minimize} />
        <TitlebarButton icon={CgMaximize} func={maximize} />
        <TitlebarButton icon={CgClose} func={close} />
      </Flex>
    </Box>
  );
}
