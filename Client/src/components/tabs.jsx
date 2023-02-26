import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HeadTabs = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const projects = props.data;
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(projects);
  const handleTabChange = (event, newValue) => {
    props.selectedTab(newValue);
    setSelectedTab(newValue);
  };

  return (
    <>
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
                  <h4>{projects.message}</h4>
                </Box>
              )}
              {/* <Typography>The first tab</Typography> */}
            </Box>
          )}
          {selectedTab === 1 && (
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
                  <h4>{projects.message}</h4>
                </Box>
              )}

              {/* <Typography>The second tab</Typography> */}
              {/* <Typography>{JSON.stringify(props.data)}</Typography> */}
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
                  <h4>{projects.message}</h4>
                </Box>
              )}
              {/* <Typography>The first tab</Typography> */}
            </Box>
          )}
          {selectedTab === 1 && (
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
                  <h4>{projects.message}</h4>
                </Box>
              )}

              {/* <Typography>The second tab</Typography> */}
              {/* <Typography>{JSON.stringify(props.data)}</Typography> */}
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
                  <h4>{projects.message}</h4>
                </Box>
              )}
            </Box>
          )}
          {selectedTab === 4 && (
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
