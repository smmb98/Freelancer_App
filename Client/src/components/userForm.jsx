import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik, getIn } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const UserForm = ({ screen, initialValues, handleFormSubmit }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    name:
      screen === "edit-profile"
        ? yup.string()
        : yup.string().required("Name is required"),
    password:
      screen === "edit-profile"
        ? yup.string()
        : yup.string().required("Password is required"),
    email_address:
      screen === "edit-profile"
        ? yup.string().email("invalid email")
        : yup.string().email("invalid email").required("Email is required"),
    mobile_number:
      screen === "edit-profile"
        ? yup.string().matches(phoneRegExp, "Phone number is not valid")
        : yup
            .string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Phone number is required"),
    address:
      screen === "edit-profile"
        ? yup.string()
        : yup.string().required("Address is required"),
    skills:
      screen === "edit-profile"
        ? yup.array().of(yup.string())
        : yup
            .array()
            .of(yup.string().required("Skills are required"))
            .min(1, "At least three skills are required"),
    experience:
      screen === "edit-profile"
        ? yup.string()
        : yup.string().required("Experience is required"),
  });

  return (
    <>
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
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
                type="text"
                label="Mobile Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobile_number}
                name="mobile_number"
                error={!!touched.mobile_number && !!errors.mobile_number}
                helperText={touched.mobile_number && errors.mobile_number}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              {values.skills.map((skill, index) => {
                return (
                  <Box key={index}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={`${index + 1}# Skill`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={skill}
                      name={`skills[${index}]`}
                      key={index}
                      error={
                        getIn(errors, `skills.${index}`) &&
                        getIn(touched, `skills.${index}`)
                      }
                      helperText={
                        getIn(touched, `skills.${index}`) &&
                        getIn(errors, `skills.${index}`)
                      }
                      sx={{ gridColumn: "span 4" }}
                      InputProps={{
                        ...(values.skills.length > 1 && {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => {
                                  const newSkills = [...values.skills];
                                  newSkills.splice(index, 1);
                                  handleChange({
                                    target: {
                                      name: "skills",
                                      value: newSkills,
                                    },
                                  });
                                }}
                              >
                                <RemoveIcon
                                  style={{
                                    color: "red",
                                  }}
                                ></RemoveIcon>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }),
                      }}
                    />
                  </Box>
                );
              })}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                type="button"
                onClick={() => {
                  const newSkills = [...values.skills, ""];
                  handleChange({
                    target: { name: "skills", value: newSkills },
                  });
                }}
              >
                <AddIcon style={{ color: "green" }}></AddIcon> Add Skill Box
              </button>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Experience"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.experience}
                name="experience"
                error={!!touched.experience && !!errors.experience}
                helperText={touched.experience && errors.experience}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {screen === "register" ? (
              <Box display="flex" justifyContent="space-between" mt="20px">
                <Link to="/login">or Login here</Link>
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
            ) : (
              <Box display="flex" justifyContent="end" mt="20px">
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
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
