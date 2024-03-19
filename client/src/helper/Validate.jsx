// Validate.jsx

import toast from "react-hot-toast";

// Validate login page username
export async function userNameValidate(values) {
  const errors = userNameVerify({}, values);

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
