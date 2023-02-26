import { Box, Button, Tabs, Tab } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadTabs from "../../components/tabs";

const MyJobs = (props) => {
  //   const isNonMobile = useMediaQuery("(min-width:600px)");

  const [selectedTab, setSelectedTab] = useState(0);
  const [projectData, setProjectData] = useState([]);

  function handleTabChange(index) {
    setSelectedTab(index);
  }

  const queryParams = {
    0: "?filter=pending",
    1: "?filter=working",
    2: "?filter=completed",
    3: "?filter=verified",
    4: "?filter=rejected",
  };

  const { isLoading, setIsLoading } = useState(true);
  // ?filter=unassigned
  useEffect(() => {
    // setIsLoading(true);
    const fetchData = async () => {
      // console.log("USE EFFECT");
      await axios
        .get(`http://localhost:3000/freelancers${queryParams[selectedTab]}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
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
        <Header title="MY JOBS" />
        {isLoading ? (
          <h5>Data is Loading...</h5>
        ) : (
          <HeadTabs
            page={"my-job"}
            selectedTab={handleTabChange}
            data={projectData}
          />
        )}
      </Box>
    </>
  );
};

export default MyJobs;
