import { useContext, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const navbarRef = useRef(null);
  const offcanvasRef = useRef(null); // Reference for offcanvas
  const location = useLocation();
  const navigate = useNavigate();

  const { token, setToken, userName, setUserName } = useContext(authContext);
  let {
    numOfFavoriteItems,
    numOfCartItems,
    setNumOfCartItems,
    setNumOfFavoriteItems,
  } = useContext(cartContext);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (window.scrollY > 230) {
        navbar.classList.add("fixed-top", "slide-down");
      } else {
        navbar.classList.remove("fixed-top", "slide-down");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [location]);

  // Handle opening/closing of off-canvas
  const toggleOffcanvas = () => {
    const offcanvasElement = offcanvasRef.current;
    offcanvasElement.classList.toggle("show");
  };

  const closeOffcanvas = () => {
    const offcanvasElement = offcanvasRef.current;
    offcanvasElement.classList.remove("show");
  };

  useEffect(() => {
    const navLinks = offcanvasRef.current.querySelectorAll(".nav-link");

    const handleNavLinkClick = () => {
      closeOffcanvas();
    };

    navLinks.forEach((link) =>
      link.addEventListener("click", handleNavLinkClick)
    );

    return () => {
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleNavLinkClick)
      );
    };
  }, []);

  function handleLogout() {
    setToken(null);
    setUserName(null);
    setNumOfCartItems(null);
    setNumOfFavoriteItems(null);
    localStorage.removeItem("tkn");
    localStorage.removeItem("usr");
    navigate("/login");
  }

  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-lg shadow-sm z-3 bg-white "
    >
      <div className="container">
        <NavLink className="navbar-brand fs-4 fw-semibold" to="/">
          <i className="fa-solid fa-cart-shopping me-1"></i>
          FreshCart
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={toggleOffcanvas}>
          <span className="navbar-toggler-icon" />
        </button>

        <div
          ref={offcanvasRef} // Reference to offcanvas
          className="offcanvas offcanvas-end"
          tabIndex="1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <Link
              to="/home"
              className="offcanvas-title"
              id="offcanvasNavbarLabel"
            >
              <h3>FreshCart</h3>
            </Link>
            <button type="button" className="btn-close" onClick={closeOffcanvas} aria-label="Close"></button>
          </div>
          <div className="offcanvas-body text-center align-content-center">
            <ul className="navbar-nav me-auto text-uppercase">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="products" activeClassName="active">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="categories" activeClassName="active">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="brands" activeClassName="active">
                  Brands
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0 text-uppercase d-flex align-items-center">
              {token ? (
                <li className="dropdown nav-item ">
                  <span
                    className="dropdown-toggle mx-2 py-2 d-inline-block"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userName}
                    <i className="fa-solid fa-user fa-lg fa-fw ms-2"></i>
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="orders" className="dropdown-item nav-link">
                        Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="help" className="dropdown-item nav-link ">
                        Need Help?
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="contact" className="dropdown-item nav-link">
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login" activeClassName="active">
                      Log in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register" activeClassName="active">
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="wishlist" activeClassName="active">
                  Wishlist
                  <i className="fa-solid fa-heart fa-lg fa-fw ms-2 position-relative" style={{ color: numOfFavoriteItems > 0 ? "red" : "" }}>
                    {numOfFavoriteItems > 0 ? <span className="wishlist-num position-absolute">{numOfFavoriteItems}</span> : null}
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="cart" activeClassName="active">
                  Cart
                  <i className="fa-solid fa-bag-shopping fa-lg fa-fw ms-2 position-relative" style={{ color: numOfCartItems > 0 ? "#5b8fff" : "" }}>
                    {numOfCartItems > 0 ? <span className="wishlist-num position-absolute">{numOfCartItems}</span> : null}
                  </i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
