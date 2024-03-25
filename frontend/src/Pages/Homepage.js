import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
// import { useTheme } from "@mui/material/styles"; // Import useTheme hook
// import { useTheme } from "../ThemeContext"; // Assuming ThemeContext is where useTheme hook is defined

function Homepage() {
  // const { themeMode } = useTheme(); // Retrieve theme mode
  // // const theme = useTheme();

  //if user is already logged in, push him back to the chats page
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    // <div style={{ backgroundColor }}>

    <Container maxW="xl" centerContent>
      {/* <button onClick={handleToggleBackground}>Toggle Background</button> */}
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        bg="white"
        fontWeight="bold"
        color="black"
        // bg={themeMode === "light" ? "white" : "gray.800"} // Conditional background color
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"

          // color={themeMode === "light" ? "black" : "white"}
        >
          Let's Chat!!
        </Text>
      </Box>
      <Box
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        bg="white"
        // bg={themeMode === "light" ? "white" : "gray.800"} // Conditional background color
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    // </div>
  );
}

export default Homepage;
