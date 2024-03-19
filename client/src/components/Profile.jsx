import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/Validate";
import convertToBase64 from "../helper/Convert";
import { registrationValidation } from "../helper/Validate";
import { profileValidation } from "../helper/Validate";
import extend from "../styles/Profile.module.css";

const Profile = () => {
  const [file, setFile] = useState(null); // Initialize file state to null
  const formik = useFormik({
    initialValues: {
      firstName: "firstname",
      lastName: "lastname",
      email: "admin@admin.com",
      mobileNumber: "mobilenumber",
      address: "address",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const errors = await profileValidation(values);
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
          className={`${styles.glass} ${extend.glass}`}
          style={{
            height: "108vh",
            marginTop: "15vh",
            paddingTop: "20px",
            marginBottom: "3px",
            width: "45%",
          }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              you can update the details
            </span>
          </div>

          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar} // Use file or default avatar
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="First Name"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="Last Name"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="email"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
                <input
                  {...formik.getFieldProps("mobileNumber")}
                  type="text"
                  placeholder="Mobile Number"
                  className={`${styles.textbox} ${extend.textbox}`}
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="address"
                className={`${styles.textbox} ${extend.textbox}`}
              />

              <button type="submit" className={`${styles.btn} bg-indigo-500`}>
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Comeback Later<span> </span>
                <button className="text-red-500">Logout</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
