import * as React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// require('dotenv').config();

const domains = [
  "SDE",
  "Web Development",
  "App Development",
  "Analytics",
  "Non-Tech",
];

const BASE_URL=process.env.REACT_APP_BASE_URL;

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 characters minimum."),

  firstName: yup
    .string("Enter your first name")
    .min(2, "First Name should be of minimum 2 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(2, "Last Name should be of minimum 2 characters length")
    .required("Last Name is required"),
  graduationYear: yup
    .string("Enter Your Graduation Year")
    .required("Graduation is Required"),
  date: yup.string(""),
  purpose: yup.string(""),
  role: yup.string("Enter your Role").required("Enter Your Role"),
  mode: yup
    .string("Mode is required")
    .when("role", (role, field) =>
      role === "Mentor" ? field.required("Mode is required") : field
    ),

  domain: yup
    .string("Domain is required")
    .when("role", (role, field) =>
      role === "Mentor" ? field.required("Domain is required") : field
    ),
});

export default function SignUp() {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      graduationYear: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mode: "",
      role: "",
      purpose: "",
      domain: "",
      date: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(process.env.REACT_APP_BASE_URL);
      fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "error") alert("Email already exist");
          else {
            alert("Registration Successfull");
            nav("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  const myStyle = {
    borderRadius: "5px",
    color: "white",
    backgroundColor: "#ffffff",
    padding: "10px",
    backgroundImage: "linear-gradient(to right,#BDC3C7, #2C3E50)",
  };

  // w

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          style={myStyle}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#010915" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            style={{
              fontFamily: "BarlowThicc",
              color: "#121212",
              fontSize: "3em",
            }}
            variant="h4"
          >
            Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type="password"
                  autoComplete="password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="Role_">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    label="Role"
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="Mentor">Mentor</MenuItem>
                    <MenuItem value="Mentee">Mentee</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formik.touched.role && formik.errors.role}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              {formik.values.role !== "" && (
                <Grid item xs={12} sm={7}>
                  <FormControl sx={{ width: 300 }}>
                    <InputLabel id="graduation_">Graduation Year</InputLabel>
                    {formik.values.role === "Mentor" ? (
                      <Select
                        labelId="graduationYear"
                        id="graduationYear"
                        name="graduationYear"
                        value={formik.values.graduationYear}
                        label="Graduation Year"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.graduationYear &&
                          Boolean(formik.errors.graduationYear)
                        }
                        helperText={
                          formik.touched.graduationYear &&
                          formik.errors.graduationYear
                        }
                      >
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                      </Select>
                    ) : (
                      <Select
                        labelId="graduationYear"
                        id="graduationYear"
                        name="graduationYear"
                        value={formik.values.graduationYear}
                        label="Graduation Year"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.graduationYear &&
                          Boolean(formik.errors.graduationYear)
                        }
                        helperText={
                          formik.touched.graduationYear &&
                          formik.errors.graduationYear
                        }
                      >
                        <MenuItem value={2025}>2025</MenuItem>
                        <MenuItem value={2026}>2026</MenuItem>
                        <MenuItem value={2027}>2027</MenuItem>
                        <MenuItem value={2028}>2028</MenuItem>
                      </Select>
                    )}
                    {formik.touched.graduationYear &&
                    formik.errors.graduationYear ? (
                      <FormHelperText
                        sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                      >
                        {formik.touched.graduationYear &&
                          formik.errors.graduationYear}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
              )}
              {formik.values.role === "Mentor" && (
                <>
                  <Grid item xs={12} sm={7}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel id="domain_">Domain</InputLabel>
                      <Select
                        labelId="domain"
                        id="domain"
                        name="domain"
                        value={formik.values.domain}
                        label="Domain"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.domain && Boolean(formik.errors.domain)
                        }
                        helperText={
                          formik.touched.domain && formik.errors.domain
                        }
                      >
                        {domains.map((val) => (
                          <MenuItem value={val}>{val}</MenuItem>
                        ))}
                      </Select>
                      {formik.touched.domain && formik.errors.domain ? (
                        <FormHelperText
                          sx={{
                            color: "#bf3333",
                            marginLeft: "16px !important",
                          }}
                        >
                          {formik.touched.domain && formik.errors.domain}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel id="mode_">Mode</InputLabel>
                      <Select
                        labelId="mode"
                        id="mode"
                        name="mode"
                        value={formik.values.mode}
                        label="Mode"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.mode && Boolean(formik.errors.mode)
                        }
                        helperText={formik.touched.mode && formik.errors.mode}
                      >
                        <MenuItem value="Online">Online</MenuItem>
                        <MenuItem value="Offline">Offline</MenuItem>
                      </Select>
                      {formik.touched.mode && formik.errors.mode ? (
                        <FormHelperText
                          sx={{
                            color: "#bf3333",
                            marginLeft: "16px !important",
                          }}
                        >
                          {formik.touched.mode && formik.errors.mode}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              style={{
                width: "90%",
                marginRight: "auto",
                marginLeft: "auto",
                display: "block",
                color: "black",
                fontFamily: "Barlow",
                backgroundImage:
                  "linear-gradient(90deg, #c9d6ff 0%, #e2e2e2 100%)",
              }}
              onClick={formik.handleSubmit}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
}
