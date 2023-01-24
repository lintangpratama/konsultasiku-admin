import React from "react";

// Chakra imports
import { Flex, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode

  return (
    <Flex align="center" direction="column">
      <Text
        fontSize={"xl"}
        fontWeight="bold"
        mx="auto"
        pt="18px"
        pb="44px"
      >
        Konsultasiku Admin
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
