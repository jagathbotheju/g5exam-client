import {
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";
import FileInputComponent from "react-file-input-previews-base64";
import blankprofile from "../images/blank-profile.png";
import { resetUser, userRegister } from "../redux/features/userSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, success, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(true);
  const [profileImage, setProfileImage] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string("Enter First Name").required(
      "First Name is required"
    ),
    lastName: Yup.string("Enter Last Name").required("Last Name is required"),
    email: Yup.string("Enter email")
      .required("Email is required")
      .email("Email is invalid"),
    school: Yup.string("Enter School").required("School is required"),
    grade: Yup.string("Enter Grade").required("Grade is required"),
    password: Yup.string("Enter password")
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string("Confirm password")
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    const user = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      school: formData.school,
      grade: formData.grade,
      profileImage,
    };
    dispatch(userRegister(user));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("User Register Success, plese Login");
      navigate("/login");
    }
    dispatch(resetUser());
  }, [error, success, user, navigate, dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <>
      <Stack mx="auto" my="5%" minWidth="40%" spacing={3}>
        <Stack alignItems="center">
          <Typography textAlign="center" gutterBottom variant="h4" mb={5}>
            <FaUserAlt /> Register
          </Typography>

          {/* image upload */}
          <Box position="relative">
            <FileInputComponent
              labelText="Profile Image"
              callbackFunction={(file_arr) => {
                const imageBase64 = file_arr[0].base64;
                setProfileImage(imageBase64);
              }}
              defaultFiles={[profileImage ? profileImage : blankprofile]}
              accept="image/*"
              buttonComponent={
                <IconButton
                  disableRipple
                  sx={{ position: "absolute", top: 50, right: 10 }}
                >
                  <MdImageSearch color="#ffc000" size={35} />
                </IconButton>
              }
            />
          </Box>
        </Stack>

        {/* FirstName Input */}
        <TextField
          id="firstName"
          variant="outlined"
          required
          type="text"
          name="firstName"
          label="First Name"
          size="small"
          {...register("firstName")}
          error={errors.firstName ? true : false}
          helperText={errors.firstName?.message}
        />

        {/* LastName Input */}
        <TextField
          id="lastName"
          variant="outlined"
          required
          type="text"
          name="lastName"
          label="Last Name"
          size="small"
          {...register("lastName")}
          error={errors.lastName ? true : false}
          helperText={errors.lastName?.message}
        />

        {/* email input */}
        <TextField
          id="email"
          variant="outlined"
          required
          type="email"
          name="email"
          label="Email"
          size="small"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
        />

        {/* School input */}
        <TextField
          id="school"
          variant="outlined"
          required
          type="text"
          name="school"
          label="School"
          size="small"
          {...register("school")}
          error={errors.school ? true : false}
          helperText={errors.school?.message}
        />

        {/* grade input */}
        <TextField
          id="grade"
          variant="outlined"
          required
          type="text"
          name="grade"
          label="Grade"
          size="small"
          {...register("grade")}
          error={errors.grade ? true : false}
          helperText={errors.grade?.message}
        />

        {/* password input */}
        <TextField
          required
          variant="outlined"
          type={showPassword ? "password" : "text"}
          name="password"
          label="Password"
          size="small"
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password input */}
        <TextField
          required
          variant="outlined"
          type={showPassword ? "password" : "text"}
          name="confirmPassword"
          label="Confirm Password"
          size="small"
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* submit button */}
        <Stack alignItems="center" spacing={2}>
          <Button
            fullWidth
            sx={{ fontWeight: "bold" }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Register
          </Button>
          <Typography
            component={Link}
            to="/login"
            variant="body2"
            sx={{ textDecoration: "none" }}
          >
            Already have Account ? Sing In
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default RegisterPage;
