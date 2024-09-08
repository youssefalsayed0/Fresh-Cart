import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function WishList() {
  let {
    wishListDetails,
    numOfFavoriteItems,
    removeItemFromWishList,
    addProduct,
  } = useContext(cartContext);

  async function addCartProduct(id) {
    await toast.promise(
      (async () => {
        const resFlag = await addProduct(id);
        if (resFlag === true) {
          return "Successfully Added!";
        } else {
          throw new Error("Something Went Wrong!");
        }
      })(),
      {
        loading: "Adding Product...",
        success: (msg) => msg, // Show success message
        error: (error) => error.message, // Show error message
      }
    );
  }

  function handleAddCart(id) {
    if (localStorage.getItem("tkn") == null) {
      toast("You Have To Login First!", {
        icon: "😀",
      });
    } else {
      addCartProduct(id);
    }
  }

  async function deleteWishlistItem(productId) {
    await toast.promise(
      (async () => {
        let response = await removeItemFromWishList(productId);
        if (response === true) {
          return "Done!";
        } else {
          throw new Error("Failed to delete the item.");
        }
      })(),
      {
        loading: "Deleting ...",
        success: (msg) => msg, // Show success message
        error: (error) => error.message, // Show error message
      }
    );
  }

  return (
    <>
      <section className="whishlis-section main-p">
        <div className="container">
          <div className="header">
            <h1 className="mb-3">My Wishlist</h1>
            <h5>Items: {numOfFavoriteItems}</h5>
          </div>
          <hr />

          {/* Check if wishlist is empty */}
          {wishListDetails?.length === 0 ? (
            <div className="text-center py-5">
              <h3>No items in wishlist</h3>
            </div>
          ) : wishListDetails ? (
            wishListDetails.map((product) => (
              <div
                key={product.id}
                className="row d-flex align-items-center justify-content-center"
              >
                <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                  <div className="image me-3" style={{ width: 85 }}>
                    <Link to={`/productdetails/${product.id}`}>
                      <img
                        className="img-fluid"
                        src={product.imageCover}
                        alt={product.title}
                      />
                    </Link>
                  </div>
                  <div>
                    <h6>
                      <Link to={`/productdetails/${product.id}`}>
                        {product.title}
                      </Link>
                    </h6>
                    <p className="p-0 m-0">{product.description}</p>
                    <div>
                      <p className="p-0 m-0">
                        <Link
                          to={`/categories/${product.category.name}`}
                          className="text-black-50 text-decoration-underline"
                        >
                          {product.category.name}
                        </Link>
                      </p>
                      <p className="p-0 m-0">
                        <Link
                          to={`/brands/${product.brand.name}`}
                          className="text-primary text-decoration-underline"
                        >
                          {product.brand.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3 text-center">
                  <p className="p-0 m-0">Price: {product.price} EGB</p>
                </div>
                <div className="col-3 col-md-1 text-center">
                  <button className="btn" onClick={() => handleAddCart(product.id)}>
                    <i className="fa-solid fa-cart-plus fa-lg"></i>
                  </button>
                </div>
                <div className="col-3 col-md-1 text-center">
                  <button
                    className="btn"
                    onClick={() => deleteWishlistItem(product.id)}
                  >
                    <i className="fa-solid fa-trash-can fa-lg"></i>
                  </button>
                </div>
                <hr className="py-3" />
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
