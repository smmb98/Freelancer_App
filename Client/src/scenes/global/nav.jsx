import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";
import EngineeringIcon from "@mui/icons-material/Engineering";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const Nav = (props) => {
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  function handleButtonClick(url) {
    navigate(url);
  }
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton onClick={() => handleButtonClick("/")}>
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

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
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Freelancer World
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 4,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Nav;
