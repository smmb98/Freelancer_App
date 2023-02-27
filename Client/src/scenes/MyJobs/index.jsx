import { Box, Button, Tabs, Tab } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadTabs from "../../components/tabs";

const MyJobs = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [projectData, setProjectData] = useState([]);

  function handleTabChange(index) {
    setSelectedTab(index);
  }

  function completeJob(jobId) {
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
        }api/freelancers/${jobId}/complete_status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
      })
      .catch((error) => {});
  }

  const queryParams = {
    0: "?filter=pending",
    1: "?filter=working",
    2: "?filter=completed",
    3: "?filter=verified",
    4: "?filter=rejected",
  };

  const { isLoading, setIsLoading } = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
          }api/freelancers${queryParams[selectedTab]}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          setProjectData(result.data);
          setIsLoading(false);
        })
        .catch((error) => {});
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
            completeJob={completeJob}
          />
        )}
      </Box>
    </>
  );
};

export default MyJobs;
