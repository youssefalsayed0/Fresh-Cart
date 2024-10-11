import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function GetProducts({ searchTerm = "", categoryId = "all", limit, filter }) {
  const { addProduct, addToWishList } = useContext(cartContext);

  // Function to add product to cart
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
        success: (msg) => msg,
        error: (error) => error.message,
      }
    );
  }

  // Handler for adding to cart
  function handleAddCart(id) {
    if (!localStorage.getItem("tkn")) {
      toast("You Have To Login First!", { icon: "😀" });
    } else {
      addCartProduct(id);
    }
  }

  // Function to add product to wishlist
  async function addWishlist(id) {
    await toast.promise(
      (async () => {
        const resFlag = await addToWishList(id);
        if (resFlag === true) {
          return "Successfully Saved!";
        } else {
          throw new Error("Something Went Wrong!");
        }
      })(),
      {
        loading: "Saving Product...",
        success: (msg) => msg,
        error: (error) => error.message,
      }
    );
  }

  // Handler for adding to wishlist
  function handleAddWishlist(id) {
    if (!localStorage.getItem("tkn")) {
      toast("You Have To Login First!", { icon: "😀" });
    } else {
      addWishlist(id);
    }
  }

  // Function to fetch all products
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Use react-query to fetch products
  const { data, isError, isLoading } = useQuery({
    queryFn: getAllProducts,
    queryKey: "allProducts",
  });

  if (isError) {
    return (
      <div className="text-center py-5">
        <h3>Error loading products.</h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="vh-100 text-center align-content-center bg-white">
        <InfinitySpin
          visible={true}
          width="200"
          color="black"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  const allProducts = data.data.data;

 

  // Normalize search term to ensure it's a string
  const normalizedSearchTerm = typeof searchTerm === "string" ? searchTerm.toLowerCase() : "";

  // Filter products based on search term and category
  const filteredProducts = allProducts.filter((product) => {
    // Safeguard product title and category
    const productTitle = product.title ? product.title.toLowerCase() : "";
    const productCategoryId = product.category?._id || "";

    // Match by search term
    const matchesSearchTerm = productTitle.includes(normalizedSearchTerm);

    // Match by category, if "all" is not selected
    const matchesCategory = categoryId === "all" || productCategoryId === categoryId;

    return matchesSearchTerm && matchesCategory;
  });

 
  // Apply additional filter if provided
  const finalProducts = filter ? filteredProducts.filter(filter) : filteredProducts;

  // Limit the products to the specified number
  const displayedProducts = limit ? finalProducts.slice(0, limit) : finalProducts;

 
  return (
    <>
      {displayedProducts.length > 0 ? (
        <div className="get-products item">
          <div className="row gy-5">
            {displayedProducts.map((product) => (
              <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
                <div
                  className={
                    product.priceAfterDiscount
                      ? "sale position-relative"
                      : "position-relative"
                  }
                >
                  <button
                    onClick={() => handleAddCart(product.id)}
                    className="position-absolute btn add-cart"
                  >
                    <i className="fa-solid fa-cart-plus fa-lg"></i>
                  </button>
                  <button
                    onClick={() => handleAddWishlist(product.id)}
                    className="position-absolute btn add-whishlist"
                  >
                    <i className="fa-solid fa-heart fa-lg"></i>
                  </button>
                  <Link to={`/productdetails/${product.id}`}>
                    <div className="image overflow-hidden">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="text mt-2 px-3">
                      <span className="text-primary">
                        {product.category?.name || "Unknown Category"}
                      </span>
                      <h5 className="product-title mb-1">{product.title}</h5>
                      <div className="d-flex justify-content-between">
                        <div>
                          {product.priceAfterDiscount && (
                            <span className="text-decoration-line-through text-danger me-2">
                              {product.price} EGB
                            </span>
                          )}
                          <span>
                            {product.priceAfterDiscount || product.price} EGB
                          </span>
                        </div>
                        <span>
                          {product.ratingsAverage}
                          <i className="fa-solid fa-star fa-fw rating"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <h3>No products available.</h3>
        </div>
      )}
    </>
  );
}
