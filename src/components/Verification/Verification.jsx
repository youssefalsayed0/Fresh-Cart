import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";


export default function Verification() {
  const navigate = useNavigate();

  let user = {
    resetCode: "",
  };

  async function sendCode(values) {
    toast.promise(
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
        .then((response) => {
          // Handle success based on the response data
          if (response.data.status === "Success") {
            setTimeout(() => {
              navigate("/reset-password");
            }, 1500);
            return "Code verified successfully!";
          } else if (response.data.statusMsg === "fail") {
            // Show custom error message from the response
            throw new Error(response.data.message);
          } else {
            // For unexpected statusMsg values
            throw new Error("Something went wrong, please try again later.");
          }
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
        loading: "Verifying",
        success: "Code verified successfully!",
        error: (err) => err.message || "Failed! Try Again Later Or Contact Us!",
      }
    );
  }
  
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: sendCode,
    validationSchema: yup.object().shape({
      resetCode: yup.string().required("Please Enter Your Verfication Code"),
    }),
  });

  return (
    <>
      <section className="  ">
        <div className="container">
          <div className="row align-items-center d-flex ali justify-content-center vh-100 ">
           <div className="col-12 col-md-6 col-xl-5">
              <div className="card border-2  rounded-4 ">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-4">
                        <h2 className="h3">Verfication Code</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter Code to reset
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={registerFormik.handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="resetCode"
                            id="resetCode"
                            placeholder="name@example.com"
                            required
                            value={registerFormik.values.code}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="resetCode" className="form-label">
                            Code
                          </label>
                        </div>
                        {registerFormik.errors.resetCode &&
                        registerFormik.touched.resetCode ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.resetCode}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">
                            Submit
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
