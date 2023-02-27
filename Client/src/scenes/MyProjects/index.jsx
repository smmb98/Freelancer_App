import { Box, Button, Tabs, Tab } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadTabs from "../../components/tabs";

const MyProjects = (props) => {

  const [selectedTab, setSelectedTab] = useState(0);
  const [projectData, setProjectData] = useState([]);

  function handleTabChange(index) {
    setSelectedTab(index);
  }

  function updateProjectStatus(requestId, projectStatus, projectId) {
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
        }api/projects/${projectId}/status_update`,
        {
          status: projectStatus,
          requestId: requestId,
        },
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
    0: "?filter=assigned",
    1: "?filter=unassigned",
    2: "?filter=completed",
    3: "?filter=rejected",
  };

  const { isLoading, setIsLoading } = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
          }api/projects${queryParams[selectedTab]}&personal=true`,
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
        <Header title="MY PROJECTS" />
        {isLoading ? (
          <h5>Data is Loading...</h5>
        ) : (
          <HeadTabs
            page={"my-project"}
            selectedTab={handleTabChange}
            data={projectData}
            updateProjectStatus={updateProjectStatus}
          />
        )}
      </Box>
    </>
  );
};

export default MyProjects;
