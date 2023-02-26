import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";
import EngineeringIcon from "@mui/icons-material/Engineering";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const HomePage = (props) => {
  const navigate = useNavigate();

  function handleButtonClick(url) {
    navigate(url);
  }

  return (
    <>
      <h1
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        Hi {localStorage.getItem("user")}
      </h1>
      <Typography
        variant="h6"
        component="div"
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          // textAlign: "center",
        }}
        paddingBottom={5}
      >
        Where do you want go?
      </Typography>
      {/*  */}
      <List>
        <ListItem key={"Hire Freelancer"} disablePadding>
          <ListItemButton onClick={() => handleButtonClick("/hire-freelancer")}>
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText primary={"Hire Freelancer"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"My Projects"} disablePadding>
          <ListItemButton onClick={() => handleButtonClick("/my-projects")}>
            <ListItemIcon>
              <EngineeringIcon></EngineeringIcon>
            </ListItemIcon>
            <ListItemText primary={"My Projects"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"Find Jobs"} disablePadding>
          <ListItemButton onClick={() => handleButtonClick("/find-jobs")}>
            <ListItemIcon>
              <WorkIcon></WorkIcon>
            </ListItemIcon>
            <ListItemText primary={"Find Jobs"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"My Jobs"} disablePadding>
          <ListItemButton onClick={() => handleButtonClick("/my-jobs")}>
            <ListItemIcon>
              <WorkHistoryIcon></WorkHistoryIcon>
            </ListItemIcon>
            <ListItemText primary={"My Jobs"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Profile Setting"} disablePadding>
          <ListItemButton onClick={() => handleButtonClick("/profile")}>
            <ListItemIcon>
              <AccountBoxIcon></AccountBoxIcon>
            </ListItemIcon>
            <ListItemText primary={"Profile Setting"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default HomePage;
