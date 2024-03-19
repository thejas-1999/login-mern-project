import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/Validate";
import convertToBase64 from "../helper/Convert";
import { registrationValidation } from "../helper/Validate";

const Register = () => {
  const [file, setFile] = useState(null); // Initialize file state to null
  const formik = useFormik({
    initialValues: {
      email: "admin@admin.com",
      username: "admin123",
      password: "admin@123",
      confirm_pwd: "",
    },
    validate: ralidationegistrationV,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const errors = await registrationValidation(values);
      if (Object.keys(errors).length === 0) {
        // Proceed with form submission if there are no errors
        values = Object.assign(values, { profile: file || "" });
        console.log("Form submitted with values:", values);
      }
    },
  });

  // Function to handle file upload
  const onUpload = async (e) => {
    /*  console.log("File selected:", e.target.files[0]); */
    const base64 = await convertToBase64(e.target.files[0]); // Corrected await position
    /* console.log("Base64 data:", base64); */
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{
            height: "108vh",
            marginTop: "15vh",
            paddingTop: "20px",
            marginBottom: "3px",
            width: "45%",
          }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl">Register Now</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar} // Use file or default avatar
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                name="profile"
                id="profile"
              />
            </div>

            <div className="textbook flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="email"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="username"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Password"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                type="text"
                placeholder="confirm paassword"
                className={styles.textbox}
              />
              <button type="submit" className={`${styles.btn} bg-indigo-500`}>
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register<span> </span>
                <Link to="/" className="text-red-500">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
