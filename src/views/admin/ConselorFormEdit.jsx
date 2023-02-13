import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";

export default function ConselorForm() {
  const [input, setInput] = React.useState({
    nama_conselor: "",
    jabatan_conselor: "",
    description: "",
    no_himpsi: "",
    no_izin: "",
    harga: "",
  });
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();
  let history = useHistory();
  const { id } = useParams();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };
  const handleClick = (e) => {
    if (
      !input.nama_conselor ||
      !input.harga ||
      !input.no_himpsi ||
      !input.description ||
      !input.jabatan_conselor ||
      !input.no_izin
    ) {
      setError("Isi semua data terlebih dahulu!");
    } else {
      let data = input;
      data = {
        ...data,
        jabatan_conselor: data.jabatan_conselor.split(","),
        harga: parseInt(data.harga),
      };
      console.log(data);
      if (!Array.isArray(data.jabatan_conselor)) {
        setError("Isi jabatan dengan format yang benar");
      } else {
        axios
          .put(`https://api.andil.id/konsultasiku/conselor/${id}`, data)
          .then((data) => {
            setSuccess("Daa konselor berhasil diubah!");
            setError(null);
            setInput({
              nama_conselor: "",
              jabatan_conselor: "",
              description: "",
              no_himpsi: "",
              no_izin: "",
              harga: "",
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("admin-konsultasiku")) {
      window.location.href = "/#/auth/sign-in";
    } else {
      const getConselors = () => {
        axios
          .get(`https://api.andil.id/konsultasiku/conselor/${id}`)
          .then((data) => setInput(data.data.conselors.ResponseConselor[0]));
      };
      getConselors();
    }
  }, [id]);
  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w="100%"
      mx={{ base: "auto" }}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: "30px" }}
      px={{ base: "25px" }}
      mt={{ base: "10px" }}
      flexDirection="column"
    >
      <Flex
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        pt="6"
        mx={{ base: "auto", lg: "auto" }}
        me="auto"
        mb={{ base: "20px", md: "auto" }}
      >
        <Flex onClick={() => history.goBack()} align="center" cursor="pointer">
          <Icon as={MdChevronLeft} color={"blue.700"} w="24px" h="24px" />
          <Text fontSize="sm" color="gray.500" mt="0.5">
            Back
          </Text>
        </Flex>
        <Box me="auto" mt="5">
          <Heading fontSize="36px" mb="10px">
            Conselor Form
          </Heading>
          <Text mb="36px" ms="4px" fontWeight="400" fontSize="md">
            Enter the conselor information below!
          </Text>
        </Box>
        <FormControl>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Nama Konselor<Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: Sinta, S.Psi."
            name="nama_conselor"
            value={input.nama_conselor}
            onChange={(e) => handleChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
          />
          <FormLabel ms="4px" fontSize="sm" fontWeight="500" display="flex">
            Jabatan<Text>*</Text>
          </FormLabel>
          <InputGroup size="md" flexDirection="column">
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="Ex: Dosen,Psikolog Klinis,Psikolog Anak"
              mb="8px"
              name="jabatan_conselor"
              value={input.jabatan_conselor}
              onChange={(e) => handleChange(e)}
              size="lg"
              variant="auth"
            />
            <Text fontSize="smaller" color="#422AFB" mb="24px">
              Jika jabatan lebih dari satu, pisahkan dengan dengan tanda koma
              dan spasi (ex: "Dosen,Psikolog")
            </Text>
          </InputGroup>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Deskripsi<Text color="black">*</Text>
          </FormLabel>
          <Textarea
            isRequired={true}
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: Sinta adalah seorang Psikolog anak dengan pengalaman lebih dari 3 tahun"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
            mb="24px"
            size="lg"
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Nomor HIMPSI<Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Masukkan nomor HIMPSI"
            name="no_himpsi"
            value={input.no_himpsi}
            onChange={(e) => handleChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Nomor Izin<Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Masukkan nomor izin"
            name="no_izin"
            value={input.no_izin}
            onChange={(e) => handleChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Harga<Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            placeholder="Ex: 99000"
            name="harga"
            value={input.harga}
            onChange={(e) => handleChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
          />
          {error ? (
            <Alert status="error" width="full">
              <AlertIcon />
              {error}
            </Alert>
          ) : null}
          {success ? (
            <Alert status="success" width="full">
              <AlertIcon />
              {success}
            </Alert>
          ) : null}
          <Flex justifyContent="space-between" align="center" mb="24px"></Flex>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            type="submit"
            w="100%"
            h="50"
            mb="24px"
            onClick={() => handleClick()}
          >
            Submit
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}
