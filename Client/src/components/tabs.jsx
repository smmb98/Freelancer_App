import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";

const HeadTabs = (props) => {
  const [openModel, setOpenModel] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  function toggleModel(project) {
    if (project) {
      setSelectedProject(project);
    } else {
      setSelectedProject("");
    }
    setOpenModel((state) => !state);
  }

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const projects = props.data;
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    props.selectedTab(newValue);
    setSelectedTab(newValue);
  };

  return (
    <>
      <Modal
        open={openModel}
        onClose={() => toggleModel("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "hidden" }}
      >
        <Box
          sx={{
            position: "absolute",
            maxHeight: "80%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isNonMobile ? 400 : "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            overflow: "scroll",
            p: 3,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Applicants
          </Typography>
          {Array.isArray(selectedProject.requests) && selectedTab !== 0
            ? selectedProject.requests.map(function (application) {
                return (
                  <Accordion key={application.freelancer.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6">
                        {application.freelancer.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <h5 style={{ margin: 1 }}>Skills:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {application.freelancer.skills}
                      </p>

                      <h5 style={{ margin: 1 }}>Experience:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {application.freelancer.experience}
                      </p>
                      <h5 style={{ margin: 1 }}>Contact Number:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {application.freelancer.mobile_number}
                      </p>
                      <h5 style={{ margin: 1 }}>Email Address:</h5>
                      <p style={{ margin: 0, marginBottom: 20 }}>
                        {application.freelancer.email_address}
                      </p>
                      <Box display="flex" justifyContent="center" mt="20px">
                        <Button
                          onClick={() => {
                            toggleModel();
                            setSelectedTab(0);
                            props.updateProjectStatus(
                              application.id,
                              "assigned",
                              selectedProject.id
                            );
                          }}
                          type="submit"
                          color="secondary"
                          variant="contained"
                        >
                          Assign Applicant
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            : Array.isArray(selectedProject.requests) &&
              selectedProject.requests
                .filter((request) => request.status !== "rejected")
                .map(function (application) {
                  return (
                    <Accordion key={application.freelancer.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">
                          {application.freelancer.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h5 style={{ margin: 1 }}>Skills:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {application.freelancer.skills}
                        </p>
                        <h5 style={{ margin: 1 }}>Experience:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {application.freelancer.experience}
                        </p>
                        <h5 style={{ margin: 1 }}>Contact Number:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {application.freelancer.mobile_number}
                        </p>
                        <h5 style={{ margin: 1 }}>Email Address:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {application.freelancer.email_address}
                        </p>
                        <h5 style={{ margin: 1 }}>Work Status:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {application.status}
                        </p>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mt="20px"
                        >
                          <Button
                            onClick={() => {
                              toggleModel();
                              setSelectedTab(2);
                              props.updateProjectStatus(
                                application.id,
                                "completed",
                                selectedProject.id
                              );
                            }}
                            type="submit"
                            color="secondary"
                            variant="contained"
                            disabled={application.status === "working"}
                          >
                            Complete
                          </Button>
                          <Box ml="auto">
                            <Button
                              onClick={() => {
                                toggleModel();
                                setSelectedTab(3);
                                props.updateProjectStatus(
                                  application.id,
                                  "rejected",
                                  selectedProject.id
                                );
                              }}
                              type="submit"
                              color="error"
                              variant="contained"
                            >
                              Reject
                            </Button>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              onClick={() => toggleModel()}
              type="submit"
              color="error"
              variant="contained"
            >
              close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          maxWidth: !isNonMobile ? { xs: 320, sm: 480 } : null,
          paddingBottom: 5,
          // bgcolor: "cyan",
        }}
      >
        {props.page === "my-project" ? (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant={!isNonMobile ? "scrollable" : null}
            scrollButtons="auto"
            centered={isNonMobile ? true : false}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Assigned" sx={{ fontWeight: "bold" }} />
            <Tab label="Unassigned" sx={{ fontWeight: "bold" }} />
            <Tab label="Completed" sx={{ fontWeight: "bold" }} />
            <Tab label="Rejected" sx={{ fontWeight: "bold" }} />
          </Tabs>
        ) : (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant={!isNonMobile ? "scrollable" : null}
            scrollButtons="auto"
            centered={isNonMobile ? true : false}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Pending" sx={{ fontWeight: "bold" }} />
            <Tab label="Working" sx={{ fontWeight: "bold" }} />
            <Tab label="Completed" sx={{ fontWeight: "bold" }} />
            <Tab label="Verified" sx={{ fontWeight: "bold" }} />
            <Tab label="Rejected" sx={{ fontWeight: "bold" }} />
          </Tabs>
        )}
      </Box>
      {props.page === "my-project" ? (
        <Box>
          {selectedTab === 0 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (project) {
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
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {project.mobileNumber}
                        </p>
                        <Box display="flex" justifyContent="end" mt="20px">
                          <Button
                            onClick={() => toggleModel(project)}
                            type="submit"
                            color="secondary"
                            variant="contained"
                          >
                            View Applicant
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 1 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (project) {
                  {
                  }
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
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {project.mobileNumber}
                        </p>
                        <h5 style={{ margin: 1 }}>Freelancers Applied:</h5>
                        <p style={{ margin: 0 }}>{project.requests.length}</p>
                        <Box display="flex" justifyContent="end" mt="20px">
                          <Button
                            onClick={() => toggleModel(project)}
                            type="submit"
                            color="secondary"
                            variant="contained"
                          >
                            View Applicants
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 2 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (project) {
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
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 3 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (project) {
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
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          {selectedTab === 0 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (job) {
                  return (
                    <Accordion key={job.project.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">
                          {job.project.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h5 style={{ margin: 1 }}>Description:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.description}
                        </p>
                        <h5 style={{ margin: 1 }}>Category:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.category}
                        </p>
                        <h5 style={{ margin: 1 }}>Budget:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          Rs. {job.project.budget}
                        </p>
                        <h5 style={{ margin: 1 }}>Deadline:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {new Date(job.project.deadline).toDateString()}
                        </p>
                        <h5 style={{ margin: 1 }}>Email Address:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.emailAddress}
                        </p>
                        <h5 style={{ margin: 1 }}>Contact Number:</h5>
                        <p style={{ margin: 0 }}>{job.project.mobileNumber}</p>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 1 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (job) {
                  return (
                    <Accordion key={job.project.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">
                          {job.project.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h5 style={{ margin: 1 }}>Description:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.description}
                        </p>
                        <h5 style={{ margin: 1 }}>Category:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.category}
                        </p>
                        <h5 style={{ margin: 1 }}>Budget:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          Rs. {job.project.budget}
                        </p>
                        <h5 style={{ margin: 1 }}>Deadline:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {new Date(job.project.deadline).toDateString()}
                        </p>
                        <h5 style={{ margin: 1 }}>Email Address:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.emailAddress}
                        </p>
                        <h5 style={{ margin: 1 }}>Contact Number:</h5>
                        <p style={{ margin: 0 }}>{job.project.mobileNumber}</p>
                        <Box display="flex" justifyContent="end" mt="20px">
                          <Button
                            onClick={() => {
                              setSelectedTab(2);
                              props.completeJob(job.id);
                            }}
                            type="submit"
                            color="secondary"
                            variant="contained"
                          >
                            Set to Complete
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 2 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (job) {
                  return (
                    <Accordion key={job.project.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">
                          {job.project.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h5 style={{ margin: 1 }}>Description:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.description}
                        </p>
                        <h5 style={{ margin: 1 }}>Category:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.category}
                        </p>
                        <h5 style={{ margin: 1 }}>Budget:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          Rs. {job.project.budget}
                        </p>
                        <h5 style={{ margin: 1 }}>Deadline:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {new Date(job.project.deadline).toDateString()}
                        </p>
                        <h5 style={{ margin: 1 }}>Email Address:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.emailAddress}
                        </p>
                        <h5 style={{ margin: 1 }}>Contact Number:</h5>
                        <p style={{ margin: 0 }}>{job.project.mobileNumber}</p>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 3 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (job) {
                  return (
                    <Accordion key={job.project.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{job.project.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h5 style={{ margin: 1 }}>Description:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.description}
                        </p>
                        <h5 style={{ margin: 1 }}>Category:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.category}
                        </p>
                        <h5 style={{ margin: 1 }}>Budget:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          Rs. {job.project.budget}
                        </p>
                        <h5 style={{ margin: 1 }}>Deadline:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {new Date(job.project.deadline).toDateString()}
                        </p>
                        <h5 style={{ margin: 1 }}>Email Address:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.emailAddress}
                        </p>
                        <h5 style={{ margin: 1 }}>Contact Number:</h5>
                        <p style={{ margin: 0 }}>{job.project.mobileNumber}</p>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 4 && (
            <Box>
              {Array.isArray(projects) ? (
                projects.map(function (job) {
                  return (
                    <Accordion key={job.project.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">
                          {job.project.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h5 style={{ margin: 1 }}>Description:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.description}
                        </p>
                        <h5 style={{ margin: 1 }}>Category:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.category}
                        </p>
                        <h5 style={{ margin: 1 }}>Budget:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          Rs. {job.project.budget}
                        </p>
                        <h5 style={{ margin: 1 }}>Deadline:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {new Date(job.project.deadline).toDateString()}
                        </p>
                        <h5 style={{ margin: 1 }}>Email Address:</h5>
                        <p style={{ margin: 0, marginBottom: 20 }}>
                          {job.project.emailAddress}
                        </p>
                        <h5 style={{ margin: 1 }}>Contact Number:</h5>
                        <p style={{ margin: 0 }}>{job.project.mobileNumber}</p>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box textAlign="center">
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default HeadTabs;
