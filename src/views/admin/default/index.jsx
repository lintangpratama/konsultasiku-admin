/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
// Assets
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
import { useEffect } from "react";
import { MdBarChart, MdPerson } from "react-icons/md";
import ComplexTable from "views/admin/default/components/ComplexTable";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("jobspot-admin")) {
      window.location.href = "/#/auth/sign-in";
    } else {
      const getConselors = () => {
        axios
          .get("https://api.qerja.id/api/jobs?limit=1000")
          .then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
          })
          .catch((err) => console.log(err));
      };
      getConselors();
    }
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Job Posted"
          value="234"
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ComplexTable columnsData={columnsDataComplex} tableData={data} />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
