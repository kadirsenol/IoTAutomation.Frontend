import { ChakraProvider } from "@chakra-ui/react";
import { theme as chakraTheme } from "../components/profile/helpers";
import { Box, Image } from "@chakra-ui/react";
import { Container } from "@chakra-ui/layout";
import Content from "../components/profile/Content/Content";
import Sidebar from "../components/profile/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/slices/controlUISlice";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(0));
  }, []);

  return (
    <ChakraProvider theme={chakraTheme}>
      <Box h={60} overflow="hidden">
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src={"/cover2.jpg"}
          alt="Cover"
        />
      </Box>
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
        <Sidebar />
        <Content />
      </Container>
    </ChakraProvider>
  );
};

export default Profile;
