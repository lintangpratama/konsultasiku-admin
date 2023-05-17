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
  ButtonOptions,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { convertToHTML } from "draft-convert";
import axios from "axios";
import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function ConselorForm() {
  const [input, setInput] = React.useState({
    category_id: "",
    company_logo: "",
    company_name: "",
    location: "",
    title: "",
    type: "",
    banner: "",
    description: "",
    email: "",
    website_url: "",
  });
  const [editorState, setEditorState] = React.useState();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [jobCategories, setJobCategories] = React.useState();
  const [success, setSuccess] = React.useState();
  let history = useHistory();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };
  const handleImageLogoChange = (e) => {
    console.log(e.target.files);
    setInput({
      ...input,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleImageChange = (e) => {
    console.log(e.target.files);
    setInput({
      ...input,
      [e.target.name]: e.target.files,
    });
  };
  const handleClick = (e) => {
    if (!input.title) {
      setError("Isi semua data terlebih dahulu!");
    } else {
      setIsLoading(true);
      console.log(input);
      console.log(convertToHTML(editorState.getCurrentContent()));
      const data = new FormData();
      data.append("category_id", input.category_id);
      data.append("company_logo", input.company_logo);
      data.append("company_name", input.company_name);
      data.append("location", input.location);
      data.append("title", input.title);
      data.append("type", input.type);
      data.append("banner", input.banner);
      data.append(
        "description",
        convertToHTML(editorState.getCurrentContent())
      );
      data.append("email", input.email);
      data.append("website_url", input.website_url);
      axios
        .post("https://api.qerja.id/api/job", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jobspot-admin")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setSuccess("Pekerjaan berhasil ditambahkan!");
          setIsLoading(false);
          setError(null);
          setInput({
            category_id: "",
            company_logo: "",
            company_name: "",
            location: "",
            title: "",
            type: "",
            banner: "",
            description: "",
            email: "",
            website_url: "",
          });
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("jobspot-admin")) {
      window.location.href = "/#/auth/sign-in";
    } else {
      const getJobCategory = () => {
        axios.get("https://api.qerja.id/api/job-categories").then((res) => {
          setJobCategories(res.data.data);
        });
      };
      getJobCategory();
    }
  }, []);
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
            Job Posting Form
          </Heading>
          <Text mb="36px" ms="4px" fontWeight="400" fontSize="md">
            Enter the Job information below!
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
            Title Pekerjaan<Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: Customer Service"
            name="title"
            value={input.title}
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
            Kategori Pekerjaan <Text color="black">*</Text>
          </FormLabel>
          <Select
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            name="category_id"
            value={input.category_id}
            onChange={(e) => handleChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
          >
            {jobCategories?.map((data) => (
              <option id={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </Select>

          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Tipe Pekerjaan <Text color="black">*</Text>
          </FormLabel>
          <Select
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            name="type"
            value={input.type}
            onChange={(e) => handleChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
          >
            <option value="Work From Office">Work From Office (WFO)</option>
            <option value="Work From Home">Work From Home (WFH)</option>
            <option value="Hybrid">Hybrid</option>
          </Select>

          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Poster Pekerjaan <Text color="black">*</Text>
          </FormLabel>
          <Input
            id="banner"
            isRequired={true}
            className="custom-file-input"
            style={{ paddingTop: "8px" }}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="file"
            name="banner"
            onChange={(e) => handleImageChange(e)}
            mb="24px"
            fontWeight="500"
            size="lg"
            multiple
          />

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
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editor"
            onEditorStateChange={setEditorState}
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color="GrayText"
            mb="8px"
          >
            Nama Perusahaan <Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: Tokopedia"
            name="company_name"
            value={input.company_name}
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
            Logo Perusahaan <Text color="black">*</Text>
          </FormLabel>
          <Input
            id="logo"
            isRequired={true}
            className="custom-file-input"
            style={{ paddingTop: "8px" }}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="file"
            name="company_logo"
            onChange={(e) => handleImageLogoChange(e)}
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
            Lokasi <Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: Kota Tangerang, Banten"
            name="location"
            value={input.location}
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
            Email <Text color="black">*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: career@tokopedia.com"
            name="email"
            value={input.email}
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
            Website Lamaran Pekerjaan (opsional) <Text color="black"></Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="Ex: career.tokopedia.com"
            name="website_url"
            value={input.website_url}
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
            {!isLoading ? "Post Pekerjaan" : "Uploading..."}
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}
