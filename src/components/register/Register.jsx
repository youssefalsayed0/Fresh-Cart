import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {

const navigate = useNavigate();

  let user = {
    name: "",
    phone: "",
    password: "",
    rePassword: "",
    email: "",
  };

  async function registerUser(values) {
   
    toast.promise(
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values),
      {
        loading: 'Creating account...',
        success: 'Account created successfully!',
        error: (err) => err.response?.data?.message || 'Failed to create account',
      }
    ).then(() => {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    });
  }

  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: registerUser,

    // validate: (allData) => {
    //   const errors = {};
    //   const nameRegex = /^[A-Z][a-z]{2,12}$/;
    //   const phoneRegex = /^(20)?01[0125][0-9]{8}$/;
    //   if (! nameRegex.test(allData.name) ) {
    //     errors.name = "Name must start with capital letter";
    //   }
    //   if (phoneRegex.test(allData.phone) == false) {
    //     errors.phone = "Phone must be egyptain number";
    //   }
    //   if (
    //     allData.email.includes("@") == false ||
    //     allData.email.includes(".") == false
    //   ) {
    //     errors.email = "Invalid Email";
    //   }
    //   if (allData.password.length < 6 || allData.password.length > 12) {
    //     errors.password = "Password must be at least 6 characters long ";
    //   }
    //   if (allData.password !== allData.rePassword) {
    //     errors.rePassword = "Password and re password doesn't match ";
    //   }
    //   console.log(errors);

    //   return errors;// },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Minmum must be 3 character")
        .max(12, "Maxmum must be 12 character"),
      email: yup.string().email("Invalid Email").required(),
      phone: yup.string().required("Phone is req.").matches(/^01[0125][0-9]{8}$/, 'Add a correct Number'),
      password: yup.string().min(6).max(12).required(),
      rePassword: yup
        .string()
        .required("Re-password is req.")
        .oneOf([yup.ref("password")], "Re-password doesnt match password"),
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
                        <h2 className="h3">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter your details to register
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
                            name="name"
                            id="name"
                            placeholder="Name"
                            required
                            value={registerFormik.values.name}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                        </div>
                        {registerFormik.errors.name &&
                        registerFormik.touched.name ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.name}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

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
                            type="text"
                            className="form-control"
                            name="phone"
                            id="phone"
                            placeholder="Phone"
                            required
                            value={registerFormik.values.phone}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                        </div>
                        {registerFormik.errors.phone &&
                        registerFormik.touched.phone ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.phone}
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
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="rePassword"
                            id="rePassword"
                            placeholder="confirmassword"
                            required
                            value={registerFormik.values.rePassword}
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                          />
                          <label htmlFor="rePassword" className="form-label">
                            Repassword
                          </label>
                        </div>
                        {registerFormik.errors.rePassword &&
                        registerFormik.touched.rePassword ? (
                          <div className="alert alert-danger" role="alert">
                            {registerFormik.errors.rePassword}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">
                            Signup
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
                          <Link className="link-primary " to="/login">
                            Signin
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
