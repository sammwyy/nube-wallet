import { Box, Center, Flex, Heading } from "@chakra-ui/react";

export default function Welcome() {
  return (
    <Center>
      <Flex height={"100vh"} alignItems={"center"}>
        <Box textAlign={"center"}>
          <Heading>¡Bienvenido!</Heading>
          <Box>Vamos a comenzar a configurar tu billetera</Box>
        </Box>
      </Flex>
    </Center>
  );
}
