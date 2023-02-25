import * as React from "react";
import { Link } from "react-router-dom";
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

// function ResponsiveDrawer(props) {
const Nav = (props) => {
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to={"/"} style={{ textDecoration: "none", color: "#000000DE" }}>
          <ListItem key={"Home"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to={"hire-freelancer"}
          style={{ textDecoration: "none", color: "#000000DE" }}
        >
          <ListItem key={"Hire Freelancer"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText primary={"Hire Freelancer"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to={"my-projects"}
          style={{ textDecoration: "none", color: "#000000DE" }}
        >
          <ListItem key={"My Projects"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EngineeringIcon></EngineeringIcon>
              </ListItemIcon>
              <ListItemText primary={"My Projects"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to={"find-jobs"}
          style={{ textDecoration: "none", color: "#000000DE" }}
        >
          <ListItem key={"Find Jobs"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon></WorkIcon>
              </ListItemIcon>
              <ListItemText primary={"Find Jobs"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to={"my-jobs"}
          style={{ textDecoration: "none", color: "#000000DE" }}
        >
          <ListItem key={"My Jobs"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkHistoryIcon></WorkHistoryIcon>
              </ListItemIcon>
              <ListItemText primary={"My Jobs"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to={"profile"}
          style={{ textDecoration: "none", color: "#000000DE" }}
        >
          <ListItem key={"Profile Setting"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon></AccountBoxIcon>
              </ListItemIcon>
              <ListItemText primary={"Profile Setting"} />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={
          {
            // width: {
            //   sm: `calc(100% - ${drawerWidth}px)`,
            // },
            // ml: { sm: `${drawerWidth}px` },
          }
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              // display: { sm: "none" }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
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
            // display: { xs: "block", sm: "none" },
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

        {/*  */}
        {/* <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer> */}
        {/*  */}
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
        {/* <Toolbar /> */}
        {props.children}
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Nav;

// export default ResponsiveDrawer;
