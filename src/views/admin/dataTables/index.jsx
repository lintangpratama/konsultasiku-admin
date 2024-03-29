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
import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import { columnsDataColumns } from "views/admin/dataTables/variables/columnsData";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Settings() {
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      phone: "",
      email: "",
      psycolog_name: "Hikmatun Balighoh, M.Psi., Psikolog",
      amount: 0,
      consultation_date: "2023-01-31T00:00:00Z",
      complaint: "",
      invoice_id: "",
      expiry_date: "2023-01-25T00:00:00Z",
      payment_link: "",
    },
  ]);
  // Chakra Color Mode
  useEffect(() => {
    if (!localStorage.getItem("admin-konsultasiku")) {
      window.location.href = "/#/auth/sign-in";
    } else {
      axios.get("https://api.andil.id/konsultasiku/orders?limit=1000").then((res) => {
        setData(res.data.conselors);
      });
    }
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ColumnsTable columnsData={columnsDataColumns} tableData={data} />
      </SimpleGrid>
    </Box>
  );
}
