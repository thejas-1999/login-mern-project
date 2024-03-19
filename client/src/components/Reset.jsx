import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/Validate";

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl ">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Set New Password
            </span>
          </div>

          <form action="" className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbook flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="New Password"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                type="text"
                placeholder="Repeat New Password"
                className={styles.textbox}
              />
              <button type="submit" className={`${styles.btn} bg-indigo-500`}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Reset;
