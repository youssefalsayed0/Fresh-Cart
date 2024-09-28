import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  let {
    totalCartPrice,
    numOfCartItems,
    allProducts,
    getUserCart,
    updateCartItem,
    deleteProductItem,
    deleteAllCartItems,
  } = useContext(cartContext);

  async function deleteItem(productId) {
    await toast.promise(
      (async () => {
        let response = await deleteProductItem(productId);
        if (response === true) {
          return "Item deleted successfully!";
        } else {
          throw new Error("Failed to delete the item.");
        }
      })(),
      {
        loading: "Deleting ...",
        success: (msg) => msg,
        error: (error) => error.message,
      }
    );
  }

  async function deleteAllItems() {
    await toast.promise(
      (async () => {
        let response = await deleteAllCartItems();
        if (response?.data?.message === "success") {
          getUserCart();
          return "Done!";
        } else {
          throw new Error("Failed to delete all items.");
        }
      })(),
      {
        loading: "Deleting All Cart ...",
        success: (msg) => msg,
        error: (error) => error.message,
      }
    );
  }

  function updateCartCount(productId, count) {
    updateCartItem(productId, count);
  }

  return (
    <>
      <section className=" main-p">
        <div className="container  ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 ">
              <div className="card card-registration card-registration-2">
                <div className="card-body p-5">
                  <div className="row g-5">
                    <div className="">
                      <h6 className="mb-0">
                        <Link to="/products" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2" />
                          Back to shop
                        </Link>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <div className="d-flex justify-content-between align-items-end">
                        <h1 className="fw-bold mb-0">Shopping Cart</h1>
                      </div>
                      <hr className="my-4" />
                      <div className="text-end py-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteAllItems()}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>

                      {/* Check if cart is empty and show "No products in cart" */}
                      {allProducts?.length === 0 ? (
                        <div className="text-center py-5">
                          <h3>No products in cart</h3>
                        </div>
                      ) : allProducts ? (
                        allProducts.map((product) => (
                          <div
                            key={product.product.id}
                            className="row  d-flex justify-content-between align-items-center"
                          >
                            <div className="col-4 col-md-2 col-lg-2 col-xl-2 mb-3 mb-md-0">
                              <img
                                src={product.product.imageCover}
                                className="img-fluid rounded-3"
                                alt={product.product.imageCover}
                              />
                            </div>
                            <div className="col-8 col-md-3 col-lg-3 col-xl-3 mb-3 mb-md">
                              <h6 className="mb-0 text-decoration-underline">
                                <Link
                                  to={`/productdetails/${product.product.id}`}
                                >
                                  {product.product.title}
                                </Link>
                              </h6>
                            </div>
                            <div className="col-5 col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn px-2"
                                onClick={() =>
                                  updateCartCount(
                                    product.product.id,
                                    product.count - 1
                                  )
                                }
                              >
                                <i className="fas fa-minus" />
                              </button>
                              <input
                                id="form1"
                                name="quantity"
                                type="text"
                                disabled
                                className="form-control text-center px-2"
                                placeholder={product.count}
                              />
                              <button
                                className="btn px-2"
                                onClick={() =>
                                  updateCartCount(
                                    product.product.id,
                                    product.count + 1
                                  )
                                }
                              >
                                <i className="fas fa-plus" />
                              </button>
                            </div>
                            <div className="col-5 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">{product.price} EGB</h6>
                            </div>
                            <div className="col-1 col-md-1 col-lg-1 col-xl-1 text-end">
                              <button
                                onClick={() => deleteItem(product.product.id)}
                                className="text-muted btn"
                              >
                                <i className="fas fa-times" />
                              </button>
                            </div>
                            <hr className="my-4 " />
                          </div>
                        ))
                      ) : (
                        <div className="text-center bg-white">
                          <InfinitySpin
                            visible={true}
                            width="200"
                            color="black"
                            ariaLabel="infinity-spin-loading"
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-lg-4 ">
                      <div>
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">items</h5>
                          <h5>{numOfCartItems}</h5>
                        </div>

                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>{totalCartPrice} EGB</h5>
                        </div>

                        <Link to={numOfCartItems > 0 ? '/payment' : '#'}>
                          <button
                            type="button"
                            className="btn btn-dark w-100 rounded-pill"
                            onClick={() => {
                              if (numOfCartItems === 0) {
                                toast.error("Add some items to the cart first!");
                              }
                            }}
                          >
                            Checkout
                          </button>
                        </Link>
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
