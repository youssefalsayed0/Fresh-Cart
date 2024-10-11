import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Payment() {

  const [isOnline, setisOnline] = useState(false);
  let { cartId, updateUi, totalCartPrice, numOfCartItems, allProducts , getUserCart} =
    useContext(cartContext);

function detectAndCall (values){
  if (isOnline) {
    createOnlineOrder(values);
  }
  else{
    createCashOrder(values);
  }
}

  function createCashOrder(values) {
    const backendBody = { shippingAddress: values };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
         updateUi();
         getUserCart();
        
      })
      .catch((err) => {
      });
  }

  function createOnlineOrder(values) {
    const backendBody = { shippingAddress: values };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params : {
            url: "http://localhost:5173"
          }
        }
      )
      .then((res) => {
      
         window.open(res.data.session.url, '_self');
      })
      .catch((err) => {
      });
  }

  const paymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: detectAndCall,
  });

  return (
    <>
      <main>
        <section className="main-p payment">
          <div className="container ">
            <div className="row gy-5">
              <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-dark">Your cart</span>
                  <span className="badge bg-primary rounded-pill">
                    {numOfCartItems}
                  </span>
                </h4>
                <ul className="list-group mb-3">
                  { allProducts?.map((product) => (
                      <>
                        <li className="list-group-item d-flex justify-content-between align-items-center  lh-sm">
                          <div>
                            <div className="d-flex align-items-center">
                              <div className="image" style={{ width: 40 }}>
                                <img
                                  className="img-fluid"
                                  src={product.product.imageCover}
                                  alt={product.product.title}
                                />
                              </div>
                          <div className="ms-3">
                          <h6 className="my-0 "> {product.product.title.split(" ").slice(0, 3).join(" ")}{/* Limit to 4 words */}</h6>
                                <small className="  text-body-secondary">
                              x{product.count}
                            </small>
                          </div>
                            </div>
                          </div>
                          <span className="text-body-secondary">{product.price}£</span>
                        </li>
                      </>
                    ))}

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (EGB)</span>
                    <strong>{totalCartPrice} EGB</strong>
                  </li>

                  <Link to='/cart' className="text-decoration-underline mt-2 fs-6 text-end">Edit Cart </Link>
                </ul>
              </div>
              <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Billing address</h4>
                <form onSubmit={paymentFormik.handleSubmit} className="">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="details"
                          id="details"
                          placeholder="Address"
                          required
                          value={paymentFormik.values.details}
                          onChange={paymentFormik.handleChange}
                          onBlur={paymentFormik.handleBlur}
                        />
                        <label htmlFor="details" className="form-label">
                          Address
                        </label>
                      </div>
                      {paymentFormik.errors.details &&
                      paymentFormik.touched.details ? (
                        <div className="alert alert-danger" role="alert">
                          {paymentFormik.errors.details}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          id="phone"
                          placeholder="phone"
                          required
                          value={paymentFormik.values.phone}
                          onChange={paymentFormik.handleChange}
                          onBlur={paymentFormik.handleBlur}
                        />
                        <label htmlFor="phone" className="form-label">
                          phone
                        </label>
                      </div>
                      {paymentFormik.errors.phone &&
                      paymentFormik.touched.phone ? (
                        <div className="alert alert-danger" role="alert">
                          {paymentFormik.errors.phone}
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
                          name="city"
                          id="city"
                          placeholder="City"
                          required
                          value={paymentFormik.values.city}
                          onChange={paymentFormik.handleChange}
                          onBlur={paymentFormik.handleBlur}
                        />
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                      </div>
                      {paymentFormik.errors.city &&
                      paymentFormik.touched.city ? (
                        <div className="alert alert-danger" role="alert">
                          {paymentFormik.errors.city}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

            <div className="d-flex flex flex-wrap">
                    <button
                      className=" btn btn-dark px-3 py-2 me-2 rounded-pill mt-4 flex-grow-1"
                      type="submit"
                      onClick={() => setisOnline(false) }
                    >
                      Cash on delivery 
                    </button>
                    <button
                      className=" btn btn-dark px-3 me-2 py-2 rounded-pill mt-4 flex-grow-1"
                      type="submit"
                      onClick={() => setisOnline(true)}
                    >
                      Online Payment
                    </button>
            </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
