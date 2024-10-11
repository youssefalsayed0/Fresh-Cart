import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Slider from "react-slick/lib/slider";

export default function Orders() {
  let { allOrders } = useContext(cartContext);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="orders-section main-p overflow-hidden">
        <div className="container">
          <div className="header">
            <h1 className="mb-3">My Orders</h1>
            <h5>Items: {allOrders?.length}</h5>
          </div>
          <hr />

          {/* Check if orders list is empty */}
          {allOrders?.length === 0 ? (
            <div className="text-center py-5">
              <h3>No Orders Available</h3>
            </div>
          ) : allOrders ? (
            allOrders.map((order) => (
              <div
                key={order._id}
                className="row d-flex align-items-center "
              >
                <div className="col-md-5 d-flex mb-3 mb-md-0">
                  <div>
                    <h4>Order Details: </h4>
                    <h6>
                      <Link to={`/productdetails/${order._id}`}>
                        Order #{order._id}
                      </Link>
                    </h6>
                    <p className="p-0 m-0">
                      <span>Name: {order.user.name}</span>
                      <br />
                      <span>Phone: {order.shippingAddress.phone}</span>
                      <br />
                      <span>Location: {order.shippingAddress.details}, {order.shippingAddress.city}</span>
                    </p>
                    <div>
                      <p className="p-0 m-0">
                        <span>Price: {order.totalOrderPrice} EGP</span>
                      </p>
                      <p className="p-0 m-0">
                        <span className="text-primary">
                          {order.paymentMethodType}
                        </span>
                      </p>
                      <p className="p-0 m-0">
                        <span className="text-black-50">
                          {order.updatedAt.slice(0, 10)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slider to show products in the order */}
                <div className="col-md-7">
                  <div className="slider-container">
                    <Slider {...sliderSettings}>
                      {order.cartItems.map((item) => (
                        <div key={item.product._id} className="image">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="img-fluid"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>

                <hr className="my-5" />
              </div>
            ))
          ) : (
            <div className="py-5 text-center bg-white">
              <InfinitySpin
                visible={true}
                width="200"
                color="black"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
