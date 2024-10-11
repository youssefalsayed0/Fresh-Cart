import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";



export default function ResetPassword() {

  
  const navigate = useNavigate();

  let user = {
      email: "",
      newPassword: "",
  };

  async function reset(values) {
    toast.promise(
      axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
        .then((response) => {
          // Check if statusMsg is "fail", throw an error with the custom message
          if (response.data.statusMsg === "fail") {
            throw new Error(response.data.message);
          }
  
          // Otherwise, show the success message
          setTimeout(() => {
            navigate("/Login");
          }, 1500);
  
          return "Password reset successfully!";
        })
        .catch((error) => {
          // Handle HTTP errors like status 400 and show custom messages
          if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message); // Show server error message
          } else {
            throw new Error("Failed! Try Again Later Or Contact Us!"); // Fallback error message
          }
        }),
      {
        loading: "Resetting...",
        success: "Password reset successfully!", // Show this message for a successful reset
        error: (err) => err.message || "Failed! Try Again Later Or Contact Us!", // Show custom error messages
      }
    );
  }
  


  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: reset,

    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid Email").required( "Email is required"),
      newPassword: yup.string().min(6).max(12).required("New Passowrd  is required"),

    }),
  });

  return (
    <>
      <section className="">
        <div className="container">
          <div className="row gy-5 align-items-center vh-100 justify-content-center">
        

            <div className="col-12 col-md-6 col-xl-5">
              <div className="card border-2  rounded-4 ">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-4">
                        <h2 className="h3">Reset Password</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter your details to Reset
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={registerFormik.handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            required
                            value={registerFormik.values.email}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                        {registerFormik.errors.email &&
                        registerFormik.touched.email ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.email}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            id="newPassword"
                            placeholder="newPassword"
                            required
                            value={registerFormik.values.newPassword}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="newPassword" className="form-label">
                          New Password
                          </label>
                        </div>
                        {registerFormik.errors.newPassword &&
                        registerFormik.touched.newPassword ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.newPassword}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                        <p className="m-0 text-secondary text-center">
                        Back to login ?
                          <Link className="link-primary " to="/login">
                             Login
                          </Link>
                        </p>
                      </div>
               
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
