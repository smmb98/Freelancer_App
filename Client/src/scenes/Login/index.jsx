import { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import Header from "../../components/Header";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkoutSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email_address: yup
      .string()
      .email("invalid email")
      .required("Email is required"),
  });

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
    password: "",
    email_address: "",
  });

  const handleFormSubmit = (values) => {
    const payload = values;
    axios
      .post("http://localhost:3000/auth/login", payload)
      .then((result) => {
        localStorage.setItem("token", result.data.token);

        setIsSnackbarOpen((item) => {
          return {
            state: "pass",
            open: true,
          };
        });

        setTimeout(() => {
          setIsSnackbarOpen((item) => {
            return {
              state: item.state,
              open: false,
            };
          });
          navigate("/");
        }, 3000);
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
            Logged In successfully!!!
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
        <Header title="LOGIN PAGE" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email_address}
                  name="email_address"
                  error={!!touched.email_address && !!errors.email_address}
                  helperText={touched.email_address && errors.email_address}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => handleClickShowPassword()}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mt="20px">
                <Link to="/register">or SignUp here</Link>
                <Box ml="auto">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={
                      !(Object.keys(touched).length > 0) ||
                      Object.keys(errors).length > 0
                    }
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
