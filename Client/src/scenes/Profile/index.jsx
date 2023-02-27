import { useEffect, useState, forwardRef } from "react";
import { Box } from "@mui/material";
import UserForm from "../../components/userForm";
import Header from "../../components/Header";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
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

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
        }api/users/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        setInitialValues((value) => {
          return {
            name: result.data.name,
            password: "",
            email_address: result.data.email_address,
            mobile_number: result.data.mobile_number,
            skills: result.data.skills,
            address: result.data.address,
            experience: result.data.experience,
          };
        });
      })
      .catch((error) => {
      });
  }, []);

  const handleFormSubmit = (values) => {
    const payload = values;
    axios
      .put(
        `${
          import.meta.env.VITE_APP_API_URL || "http://localhost:3000/"
        }api/users/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        setInitialValues((value) => {
          return {
            name: result.data.name,
            password: "",
            email_address: result.data.email_address,
            mobile_number: result.data.mobile_number,
            skills: result.data.skills,
            address: result.data.address,
            experience: result.data.experience,
          };
        });
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
  };
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
            Profile updated successfully!!!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {state || "Something went wrong!!!"}
          </Alert>
        )}
      </Snackbar>
      <Box m="20px">
        <Header title="EDIT PROFILE" />

        <UserForm
          screen={"edit-profile"}
          initialValues={initialValues}
          handleFormSubmit={handleFormSubmit}
          isFormSubmitted={open}
        ></UserForm>
      </Box>
    </>
  );
};

export default Profile;
