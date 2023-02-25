import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import UserForm from "../../components/userForm";
import Header from "../../components/Header";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
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

  const [initialValues, setInitialValues] = useState({
    name: "",
    password: "",
    email_address: "",
    mobile_number: "",
    skills: [""],
    address: "",
    experience: "",
  });

  const handleFormSubmit = (values) => {
    const payload = values;
    axios
      .post("http://localhost:3000/auth/register", payload)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        setTimeout(() => {
          setIsSnackbarOpen((item) => {
            return {
              state: item.state,
              open: false,
            };
          });
          navigate("/");
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
        console.log("Error", error.response.data.message);
      });
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {state === "pass" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Account registered successfully!!!
            <br />
            Redirecting to HomePage
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {state || "Something went wrong!!!"}
          </Alert>
        )}
      </Snackbar>
      <Box m="20px">
        <Header title="REGISTER" />

        <UserForm
          screen={"register"}
          initialValues={initialValues}
          handleFormSubmit={handleFormSubmit}
        ></UserForm>
      </Box>
    </>
  );
};

export default Register;
