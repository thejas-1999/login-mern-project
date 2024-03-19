import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/Validate";

const Recovery = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
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
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl ">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to rcover password
            </span>
          </div>

          <form action="" className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbook flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP end to your email adress
                </span>
                <input
                  type="text"
                  placeholder="OTP"
                  className={styles.textbox}
                />
              </div>

              <button type="submit" className={`${styles.btn} bg-indigo-500`}>
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Cant't get OTP<span> </span>
                <button className="text-red-500">Recover Now</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Recovery;
