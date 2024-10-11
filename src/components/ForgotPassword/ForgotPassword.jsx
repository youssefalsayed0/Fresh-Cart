import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";


export default function ForgotPassword() {
  const navigate = useNavigate();

  let user = {
    email: "",
  };

 async function sendCode(values) {
  toast.promise(
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values),
    {
      loading: "Sending...",
      success: (response) => {
        // Check if statusMsg is "success"
        if (response.data.statusMsg === "success") {
          setTimeout(() => {
            navigate("/verification");
          }, 1500);
          return "Code Sent To Your Email"; // Return success message
        } else {
          throw new Error("Unexpected response: " + response.data.statusMsg); // Handle unexpected statusMsg
        }
      },
      error: () => "Failed! Try Again Later Or Contact Us!",
    }
  );
}


  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: sendCode,
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid Email").required(),
   
    }),
  });

  return (
    <>
      <section className=" main-p ">
        <div className="container">
          <div className="row gy-5 align-items-center ">
            <div className="col-12 col-md-6 col-xl-7">
              <div className="d-flex justify-content-center ">
                <div className="col-12 col-xl-9">
                  <h1 className="fw-semibold text-uppercase">Fresh Cart</h1>
                  <hr className="border-primary-subtle mb-4" />
                  <h2 className="mb-4">
                    Discover Products That Elevate Your Lifestyle.
                  </h2>
                  <p className="lead mb-5">
                  Provide the email address associated with your account to recover your password.
                  </p>
                  <div className="text-endx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={48}
                      height={48}
                      fill="currentColor"
                      className="bi bi-grip-horizontal"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-5">
              <div className="card border-2  rounded-4 ">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-4">
                        <h2 className="h3">Forgot Password</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter your details to reset
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
