import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function GetProducts({ limit, filter }) {

  let { addProduct , addToWishList , } = useContext(cartContext);
   

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
};
  


  function handleAddCart(id) {
      if (localStorage.getItem("tkn") == null) {
        toast("You Have To Login First!", {
          icon: "😀",
        });
      } else {
        addCartProduct(id);
      }
  };
  
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
          success: (msg) => msg, // Show success message
          error: (error) => error.message, // Show error message
        }
      );
  };
  
  
  function handleAddWishlist(id) {
      if (localStorage.getItem("tkn") == null) {
        toast("You Have To Login First!", {
          icon: "😀",
        });
      }
      else {
        addWishlist(id);
      }
  };
  
  
  // function checkFavorite() {
  //       wishListDetails?.forEach(element => {
  //           if (element?.id == allProducts.id) {
  //               setIsFavorite(true);
  //           }
  //       });
  // };
  
  // async function deleteProductFromWishList(productId) {
  //     let res = await removeItemFromWishList(productId);
  //     if (res?.data?.status === 'success') {
  //         // setNumOfFavoriteItems(res?.data?.count);
  //         setIsFavorite(false);
  //         toast.success('Item removed Successfuly');
  //         getWishListInfo();
  //     }
  //     else {
  //         (res?.response?.data?.message === 'Expired Token. please login again') ?  toast.error("Failed to remove item") : "";
  //     }
  // };
  
  // async function addProductToWishList(productId) {
  //     let res = await addToWishList(productId);
  //     if (res?.data?.status === 'success') {
  //         // setNumOfFavoriteItems(res?.data?.data?.length);
  //         setIsFavorite(true);
  //         toast.success(res?.data?.message);
  //         getWishListInfo();
  //     }
  //     else {
  //         (res?.response?.data?.message === 'Expired Token. please login again') ? toast.error("Failed to remove item") : toast.error("Failed to remove item");
  //     }
  // };
  
    
function getAllProducts() {
      return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}

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
// Apply filter if provided
const filteredProducts = filter ? allProducts.filter(filter) : allProducts;
// Limit the products to the specified number
const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <>
      {displayedProducts.length > 0 ? (
        // Show the products if available
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
                  onClick={()=> handleAddWishlist(product.id)}
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
                        {product.category.name}
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
        // Show a message if no products are available
        <div className="text-center py-5">
          <h3>No products available </h3>
        </div>
      )}
    </>
  );
}
