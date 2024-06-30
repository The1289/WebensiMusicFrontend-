import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from 'axios';

import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { signUpUser } from "../../redux/actions/user";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isSignUpRequest, setIsSignUpRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      displayName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      displayName: Yup.string().required("Display Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      mobileNumber: Yup.string().required("Mobile Number is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .min(8, "Confirm Password must be at least 8 characters")
        .required("Confirm Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined);
      setIsSignUpRequest(true);

      try {
        // Make API request to register user
        const response = await axios.post("http://localhost:8000/api/v1/user/add-user", values);

        // Handle successful registration
        console.log('Registration successful', response.data);

        setIsSignUpRequest(false);
        dispatch(setAuthModalOpen(false));
        toast.success("Sign up success");
      } catch (error) {
        // Handle registration error
        console.error('Error:', error.response?.data?.error || 'Unknown error');
        setIsSignUpRequest(false);
        setErrorMessage(error.response?.data?.error || 'Unknown error');
      }
    }
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Full Name"
          name="name"
          fullWidth
          value={signupForm.values.name}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.name && signupForm.errors.name !== undefined}
          helperText={signupForm.touched.name && signupForm.errors.name}
        />
        <TextField
          type="text"
          placeholder="Display Name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
          helperText={signupForm.touched.displayName && signupForm.errors.displayName}
        />
        <TextField
          type="email"
          placeholder="Email"
          name="email"
          fullWidth
          value={signupForm.values.email}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.email && signupForm.errors.email !== undefined}
          helperText={signupForm.touched.email && signupForm.errors.email}
        />
        <TextField
          type="text"
          placeholder="Mobile Number"
          name="mobileNumber"
          fullWidth
          value={signupForm.values.mobileNumber}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.mobileNumber && signupForm.errors.mobileNumber !== undefined}
          helperText={signupForm.touched.mobileNumber && signupForm.errors.mobileNumber}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.password && signupForm.errors.password !== undefined}
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
          helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isSignUpRequest}
      >
        Sign up
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        Sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
