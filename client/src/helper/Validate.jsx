// Validate.jsx

import toast from "react-hot-toast";

// Validate login page username
export async function userNameValidate(values) {
  const errors = userNameVerify({}, values);

  return errors;
}

//valisate password
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
