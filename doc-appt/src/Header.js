import React from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";

const Header = () => (
  <Flex justify="space-between" borderBottom="1px" borderColor="gray.200" p={3}>
    <Heading as="h3" size="lg" m={1} colorScheme="blue" color="blue.600">
      Notable
    </Heading>
  </Flex>
);

export default Header;
