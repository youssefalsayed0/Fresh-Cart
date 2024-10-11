import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cart from "./components/cart/Cart";
import Home from "./components/home/Home";
import NotFound from "./components/NotFound/NotFound";
import Layout from "./components/layout/Layout";
import Products from "./components/products/Products";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Categories from "./components/categories/Categories";
import WishList from "./components/wishList/WishList";
import AuthContext from "./Context/AuthContext";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import ProductDetails from "./components/productDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import Brands from "./components/brands/Brands";
import BrandProducts from "./components/brandProducts/BrandProducts";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./components/Payment/Payment";
import { Offline } from "react-detect-offline";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Verification from "./components/Verification/Verification";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Orders from "./components/Ordres/Orders";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "categories/:name", element: <CategoryProducts /> },
      { path: "brands/:name", element: <BrandProducts /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "productdetails/:id", element: <ProductDetails /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "Verification", element: <Verification /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "orders", element: <Orders /> },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const reactQueryConfig = new QueryClient();

export default function App() {
  return (
    <>
      <AuthContext>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>
      <Offline>
        <div className="offline">
          <h4 className="m-0 p-0">internet offline</h4>
        </div>
      </Offline>
    </>
  );
}
