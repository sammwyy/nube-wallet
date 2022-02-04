import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import LandscapeBG from "../components/layout/landscape-bg/landscape-bg";

export default function Welcome() {
  return (
    <>
      <LandscapeBG></LandscapeBG>
      <Center>
        <Flex height={"100vh"} alignItems={"center"}>
          <Box textAlign={"center"}>
            <Heading>¡Bienvenido!</Heading>
            <Text color={"#ddd"} my={2} fontSize={"2xl"}>
              Vamos a comenzar a configurar tu billetera
            </Text>
            <Button>Comenzar</Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
