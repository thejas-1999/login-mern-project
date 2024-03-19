import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/Validate";

const Register = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: "admin@admin.com",
      username: "admin123",
      password: "admin@123",
      confirm_pwd: "admin@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
    },
  });
  //Formik dosent support the file upload
  const onUpload = async (e) => {
    const base64 = "";
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
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
            <h4 className="text-5xl ">Register Now</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </label>
              <input type="file" name="profile" id="profile" />
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
