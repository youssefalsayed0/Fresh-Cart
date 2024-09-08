import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";


export default function Login() {

  let { setToken , setUserName} = useContext(authContext);
  let { getUserCart , getLoggedWishList} = useContext(cartContext);
  
  const navigate = useNavigate();

  let user = {
    password: "",
    email: "",
  };

  async function loginUser(values) {
    toast
      .promise(
        axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        ),
        {
          loading: "Logging in...",
          success: (response) => "Welcome Back! " + response.data.user.name,
          error: (err) => err.response?.data?.message || "Failed to login",
        }
      )
      .then(function (response) {
        localStorage.setItem("tkn", response.data.token);
        localStorage.setItem("usr", response.data.user.name);
        setToken(response.data.token);
        setUserName(response.data.user.name);
        getUserCart();
        getLoggedWishList();
        setTimeout(() => {
      
          navigate("/home");
        }, 1500);
      });
  }


  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: loginUser,

    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid Email").required(),
      password: yup.string().min(6).max(12).required(),
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
                    Shop the latest trends, find everyday essentials, and
                    experience a seamless shopping journey with us.
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
                        <h2 className="h3">LOGIN</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter your details to login
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
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            value={registerFormik.values.password}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                        {registerFormik.errors.password &&
                        registerFormik.touched.password ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.password}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                        <p className="m-0 text-secondary text-center">
                          Already have an account?
                          <Link className="link-primary " to="/register">
                            Register
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
