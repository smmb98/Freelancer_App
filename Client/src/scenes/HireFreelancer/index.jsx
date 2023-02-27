import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HireFreelancer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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

  const initialValues = {
    title: "",
    description: "",
    mobileNumber: "",
    emailAddress: "",
    category: "",
    budget: "",
    deadline: "",
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    emailAddress: yup
      .string()
      .email("invalid email")
      .required("Email is required"),
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    category: yup.string().required("Category is required"),
    budget: yup.string().required("Budget is required"),
    deadline: yup.date().required("Deadline is required"),
  });

  const handleFormSubmit = (values) => {
    const payload = values;
    console.log(payload);
    axios
      .post(
        `${process.env.APP_URL || "http://localhost:3000/"}api/projects`,
        payload,
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
          navigate("/my-projects");
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
            Project added successfully!!!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {state || "Something went wrong!!!"}
          </Alert>
        )}
      </Snackbar>

      <Box m="20px">
        <Header title="ADD A PROJECT" />

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
            setFieldValue,
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
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emailAddress}
                  name="emailAddress"
                  error={!!touched.emailAddress && !!errors.emailAddress}
                  helperText={touched.emailAddress && errors.emailAddress}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Mobile Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobileNumber}
                  name="mobileNumber"
                  error={!!touched.mobileNumber && !!errors.mobileNumber}
                  helperText={touched.mobileNumber && errors.mobileNumber}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  variant="filled"
                  name="category"
                  id="category"
                  select
                  label="Category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value="Website Development">
                    Website Development
                  </MenuItem>
                  <MenuItem value="Logo Designing">Logo Designing</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Data Entry">Data Entry</MenuItem>
                  <MenuItem value="Video Editing">Video Editing</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Budget"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.budget}
                  name="budget"
                  sx={{ gridColumn: "span 2" }}
                  error={!!touched.budget && !!errors.budget}
                  helperText={touched.budget && errors.budget}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Deadline"
                    inputFormat="DD/MM/YYYY"
                    value={values.deadline}
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("deadline", value.toString());
                      // setFieldValue("deadline", Date.parse(value));
                    }}
                    name="deadline"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Deadline"
                        name="deadline"
                        sx={{ gridColumn: "span 2" }}
                        {...params}
                        error={!!touched.deadline && !!errors.deadline}
                        helperText={touched.deadline && errors.deadline}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={
                    !(Object.keys(touched).length > 0) ||
                    Object.keys(errors).length > 0 ||
                    open
                  }
                >
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default HireFreelancer;
