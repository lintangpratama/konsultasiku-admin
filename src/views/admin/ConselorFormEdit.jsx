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
  Select,
  Text,
} from "@chakra-ui/react";
import { convertToHTML } from "draft-convert";
import { convertFromRaw, convertFromHTML } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import axios from "axios";
import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Image } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

export default function ConselorForm() {
  const [input, setInput] = React.useState({
    category_id: "",
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
  const [formData, setFormData] = React.useState();
  const { id } = useParams();
  let history = useHistory();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
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
      setInput({
        ...formData,
        description: convertToHTML(editorState.getCurrentContent()),
      });
      axios
        .patch(`https://api.qerja.id/api/job/${id}`, input, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jobspot-admin")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setSuccess("Pekerjaan berhasil diubah!");
          setIsLoading(false);
          setError(null);
          setInput({
            category_id: "",
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
      const getFormData = () => {
        axios.get(`https://api.qerja.id/api/job/${id}`).then((res) => {
          setFormData(res.data.data);
          setInput(res.data.data);
          const contentState = stateFromHTML(res.data.data.description);
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
        });
      };
      getFormData();
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
              // {data.id === }
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
          <Box mb={10}>
            {formData?.banner.map((data, i) => (
              <Flex>
                <Image src={data} width={"full"} mb={5} />
                <Icon
                  onClick={() => {
                    let arr = formData?.banner;
                    arr.splice(i, 1);
                    console.log(arr);
                    setFormData({
                      ...formData,
                      banner: arr,
                    });
                  }}
                  cursor="pointer"
                  as={MdDelete}
                  w="18px"
                  h="18px"
                  color="red.400"
                />
              </Flex>
            ))}
          </Box>
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
