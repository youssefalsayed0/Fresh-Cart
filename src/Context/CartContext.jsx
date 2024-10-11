import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
export const cartContext = createContext();
// eslint-disable-next-line react/prop-types
export default function CartContextProvider({ children }) {
  //states..............................................................
  const [allProducts, setAllProducts] = useState(null);
  const [allOrders, setAllOrders] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [numOfFavoriteItems, setNumOfFavoriteItems] = useState(null);
  const [wishListDetails, setWishListDetails] = useState(null);

  //..........................functions.................................
  function updateUi() {
    setAllProducts(null);
    setNumOfCartItems(null);
    setTotalCartPrice(0);
    setCartId(null);
  }
  // ----------->> cart <<-----------
  async function addProduct(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((response) => {
        getUserCart();
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((response) => {
        setAllProducts(response.data.data.products);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartId(response.data.data._id);
      })
      .catch((error) => {
      });
  }

  function updateCartItem(poductId, count) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${poductId}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return res;
      })
      .catch((error) => {
      
      });
  }

  async function deleteProductItem(poductId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${poductId}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  async function deleteAllCartItems() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  // ----------->> Wish List <<-----------
  function getLoggedWishList() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumOfFavoriteItems(res.data.count);
        setWishListDetails(res.data.data);
      })
      .catch((error) => error);
  }

  async function addToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        getLoggedWishList();
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  async function removeItemFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        getLoggedWishList();
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
 // ----------->> all orders <<-----------
  async function getLoggedUserOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${jwtDecode(localStorage.getItem('tkn')).id}`)
        .then((res) =>  {
          setAllOrders(res.data);
        })
        .catch((error) =>
           error);
}


  useEffect(() => {
    getUserCart();
    getLoggedWishList();
    getLoggedUserOrders();
  }, []);

  return (
    <>
      <cartContext.Provider
        value={{
          numOfCartItems,
          totalCartPrice,
          allProducts,
          wishListDetails,
          numOfFavoriteItems,
          cartId,
          setNumOfCartItems,
          addProduct,
          getUserCart,
          updateCartItem,
          deleteProductItem,
          deleteAllCartItems,
          setWishListDetails,
          setNumOfFavoriteItems,
          getLoggedWishList,
          addToWishList,
          removeItemFromWishList,
          setCartId,
          updateUi,
          allOrders
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
