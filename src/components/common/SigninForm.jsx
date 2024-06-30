import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import axios from 'axios';



const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      email: "" // Update field name to email
    },
    validationSchema: Yup.object({
      email: Yup.string() // Update validation for email
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
    }),
    onSubmit: async values => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      try {
        const response = await axios.post("http://localhost:8000/api/v1/user/login", {
          email: values.email,
          password: values.password,
        }, {
          withCredentials: true,
        });

        if (response.status === 200) {
          if (response.data.token) {
            // Handle successful login
            console.log('Login successful', response.data);
            setIsLoginRequest(false);
            signinForm.resetForm();
            dispatch(setAuthModalOpen(false));
            toast.success("Sign in success");
            localStorage.setItem('token', response.data.token);
            window.location.reload()

          
          } else { 
            // Handle unsuccessful login (invalid credentials)
            console.error('Invalid credentials');
            setIsLoginRequest(false);
            setErrorMessage('Invalid email or password. Please try again.');
          }
        } else if (response.status === 401) {
          // Handle 401 Unauthorized status
          console.error('Invalid credentials');
          setIsLoginRequest(false);
          setErrorMessage('Invalid email or password. Please try again.');
        } else {
          // Handle unexpected status code
          console.error('Unexpected status code:', response.status);
          setIsLoginRequest(false);
          setErrorMessage('Unexpected error occurred. Please try again.');
        }
      } catch (error) {
        // Handle network errors or unexpected issues
        console.error('Error:', error.response?.data || error.message || 'Unknown error');
        setIsLoginRequest(false);
      
        if (error.response?.status === 401) {
          setErrorMessage('Invalid email or password. Please try again.');
        } else if (error.response?.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An unknown error occurred. Please try again.');
        }
      }
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Email"
          name="email" // Update field name to email
          fullWidth
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.email && signinForm.errors.email !== undefined}
          helperText={signinForm.touched.email && signinForm.errors.email}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.password && signinForm.errors.password !== undefined}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign In
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        Sign Up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};
export default SigninForm;
