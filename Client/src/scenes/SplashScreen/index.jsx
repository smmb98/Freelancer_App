import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";

const SplashScreen = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src={logo}
        alt="example"
        style={{
          maxWidth: "20%",
          height: "auto",
        }}
      />
      <Typography
        variant={isSmallScreen ? "h6" : "h4"}
        sx={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(4),
        }}
      >
        Freelancer World
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          bottom: theme.spacing(2),
        }}
        onClick={props.skipLoadHandler}
      >
        Skip
      </Button>
    </Box>
  );
};

export default SplashScreen;
