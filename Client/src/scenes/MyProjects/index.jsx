import { Box, Button, Tabs, Tab } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadTabs from "../../components/tabs";

const MyProjects = (props) => {
  //   const isNonMobile = useMediaQuery("(min-width:600px)");

  const [selectedTab, setSelectedTab] = useState(0);
  const [projectData, setProjectData] = useState([]);

  function handleTabChange(index) {
    setSelectedTab(index);
  }

  const queryParams = {
    0: "?filter=assigned",
    1: "?filter=unassigned",
    2: "?filter=completed",
    3: "?filter=rejected",
  };

  const { isLoading, setIsLoading } = useState(true);
  // ?filter=unassigned
  useEffect(() => {
    // setIsLoading(true);
    const fetchData = async () => {
      // console.log("USE EFFECT");
      await axios
        .get(
          `${process.env.APP_URL || "http://localhost:3000/"}api/projects${
            queryParams[selectedTab]
          }&personal=true`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          console.log(result.data);
          setProjectData(result.data);
          setIsLoading(false);
        })
        .catch((error) => {
          // console.log("Error", error);
        });
    };
    fetchData();
  }, [selectedTab]);

  return (
    <>
      <Box m="10px">
        <Header title="MY PROJECTS" />
        {isLoading ? (
          <h5>Data is Loading...</h5>
        ) : (
          <HeadTabs
            page={"my-project"}
            selectedTab={handleTabChange}
            data={projectData}
          />
        )}
      </Box>
    </>
  );
};

export default MyProjects;
