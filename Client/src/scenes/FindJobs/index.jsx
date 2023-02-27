import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FindJobs = (props) => {
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState({
    open: false,
    state: "error",
  });
  const { open, state } = isSnackbarOpen;
  const handleClose = () => {
    setIsSnackbarOpen((item) => {
      return {
        state: item.state,
        open: false,
      };
    });
  };
  const { isLoading, setIsLoading } = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
          }api/projects?filter=unassigned`,
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
  }, []);

  async function onApplyHandler(projectId) {
    await axios
      .post(
        `${
          import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
        }api/freelancers/job_apply`,
        { projectId: projectId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {

        setTimeout(() => {
          setIsSnackbarOpen((item) => {
            return {
              state: item.state,
              open: false,
            };
          });
          navigate("/my-jobs");
        }, 3000);

        setIsSnackbarOpen((item) => {
          return {
            state: "pass",
            open: true,
          };
        });
      })
      .catch((error) => {
        setIsSnackbarOpen((item) => {
          return {
            state: error.response.data.message,
            open: true,
          };
        });
      });
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {state === "pass" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Applied for job successfully!!!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {state || "Something went wrong!!!"}
          </Alert>
        )}
      </Snackbar>
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
                      <Typography variant="h6">{project.title}</Typography>
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
                        Rs. {project.budget}
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
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button
                          onClick={() => onApplyHandler(project.id)}
                          type="submit"
                          color="secondary"
                          variant="contained"
                        >
                          Apply
                        </Button>
                      </Box>
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
