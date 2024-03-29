// Validate.jsx

import toast from "react-hot-toast";

// Validate login page username
export async function userNameValidate(values) {
  const errors = userNameVerify({}, values);

  return errors;
}

//validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

// Validate the username
export function userNameVerify(error = {}, values) {
  if (!values.Username) {
    error.Username = toast.error("Username Required...!");
  } else if (/\s/.test(values.Username)) {
    error.Username = toast.error("Invalid Username");
  } else {
    delete error.Username; // Remove any existing error if the username is provided
  }

  return error;
}

//valdate password
const passwordVerify = (errors = {}, values) => {
  const specialChars = new RegExp("[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]");
  if (!values.password) {
    errors.password = toast.error("Password Required ");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Password doesn't allow whitespaces ");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password must be more than 4 characters ");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error(
      "Password must have at least one special character "
    );
  }
  return errors;
};

//Validate reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }
  return errors;
}

// validate registration validation
export async function registrationValidation(values) {
  let errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = toast.error("Email Required...!");
  } else if (!emailRegex.test(values.email)) {
    errors.email = toast.error("Invalid Email");
  } else {
    delete errors.email; // Change 'error' to 'errors'
  }

  // Validate username
  errors = { ...errors, ...(await userNameValidate(values)) }; // Change 'error' to 'errors'

  // Validate password
  errors = { ...errors, ...(await passwordValidate(values)) };

  // Validate password match
  errors = { ...errors, ...(await resetPasswordValidation(values)) };

  return errors;
}

// Validate profile fields
export async function profileValidation(values) {
  let errors = {};

  // Check if email is not a specific address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = toast.error("Email Required...!");
  } else if (!emailRegex.test(values.email)) {
    errors.email = toast.error("Invalid Email");
  } else {
    delete errors.email; // Change 'error' to 'errors'
  }

  // Check if first name is empty
  if (!values.firstName) {
    errors.firstName = toast.error("First Name is required");
  }

  // Check if last name is empty
  if (!values.lastName) {
    errors.lastName = toast.error("Last Name is required");
  }

  // Check if mobile number has 10 digits only
  if (!/^\d{10}$/.test(values.mobileNumber)) {
    errors.mobileNumber = toast.error("Mobile Number must be 10 digits");
  }

  // Check if address has more than 10 characters
  if (!values.address || values.address.length < 10) {
    errors.address = toast.error("Address must be at least 10 characters");
  }

  return errors;
}
