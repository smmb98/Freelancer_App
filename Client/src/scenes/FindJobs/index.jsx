import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FindJobs = (props) => {
  const [projectData, setProjectData] = useState([]);

  const { isLoading, setIsLoading } = useState(true);
  // ?filter=unassigned
  useEffect(() => {
    // setIsLoading(true);
    const fetchData = async () => {
      // console.log("USE EFFECT");
      await axios
        .get(
          `${
            process.env.APP_URL || "http://localhost:3000/"
          }api/projects?filter=unassigned`,
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
  }, []);

  return (
    <>
      <Box m="10px">
        <Header title="FIND JOBS" />
        {isLoading ? (
          <h5>Data is Loading...</h5>
        ) : (
          <Box>
            {Array.isArray(projectData) ? (
              projectData.map(function (project) {
                return (
                  <Accordion key={project.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{project.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <h5 style={{ margin: 1 }}>Description:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {project.description}
                      </p>
                      <h5 style={{ margin: 1 }}>Category:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {project.category}
                      </p>
                      <h5 style={{ margin: 1 }}>Budget:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {project.budget}
                      </p>
                      <h5 style={{ margin: 1 }}>Deadline:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {new Date(project.deadline).toDateString()}
                      </p>
                      <h5 style={{ margin: 1 }}>Email Address:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {project.emailAddress}
                      </p>
                      <h5 style={{ margin: 1 }}>Contact Number:</h5>
                      <p style={{ margin: 0 }}>{project.mobileNumber}</p>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Box textAlign="center">
                <h4>{projectData.message}</h4>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
export default FindJobs;
