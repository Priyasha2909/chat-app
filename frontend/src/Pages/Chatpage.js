import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
// import { useTheme } from "../ThemeContext";

//function to fetch data from api
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  // const { themeMode } = useTheme(); // Retrieve theme mode

  return (
    <div style={{ width: "100%" }}>
      {/* only if user exists then show the side bar */}
      {user && <SideDrawer />}
      <Box
        // style={{
        //   backgroundColor: themeMode === "light" ? "white" : "gray.800",
        // }}
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"

        // bg={themeMode === "light" ? "white" : "gray.800"}
      >
        {/* only if user exists then render the chats in sidebar */}
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
