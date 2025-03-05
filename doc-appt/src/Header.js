import { Flex, Heading } from "@chakra-ui/react";

const Header = () => (
  <Flex justify="space-between" borderBottom="1px" borderColor="gray.200" p={3}>
    <Heading as="h3" size="4xl" m={1} colorScheme="blue" color="blue.600">
      Doctor Appointment Display
    </Heading>
  </Flex>
);

export default Header;
