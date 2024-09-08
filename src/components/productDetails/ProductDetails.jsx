import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(null); // Initialize as null
  let { id } = useParams();
  let { addProduct , addToWishList} = useContext(cartContext);

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
  function getProducrsDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryFn: getProducrsDetails,
    queryKey: ["productDetails", id],
  });

  useEffect(() => {
    if (data) {
      const details = data.data.data;
      setSelectedImage(details.imageCover); // Set the selected image after data is fetched
    }
  }, [data]);

  if (isError) {
    return (
      <div>error</div>
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

  const details = data.data.data;

  return (
    <section className="product-details main-p">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="product-image">
              {/* Display the selected image */}
              <img
                src={selectedImage}
                className="img-fluid"
                alt={details.title}
              />
            </div>
            <div className="row mt-4">
              {/* Update the selected image on click */}
              {details.images?.map((img, index) => (
                <div key={index} className="col-2 d-flex justify-content-center align-items-center">
              <div className=" image-prev ">    <img
                    className={`img-fluid ${selectedImage === img ? 'selected-image' : ''}`}
                    src={img}
                    alt={details.title}
                    onClick={() => setSelectedImage(img)} // Update state on click
                    style={{ cursor: 'pointer' }} // Indicate that the image is clickable
                  /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">{details.title}</h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <i className="fa fa-star" />
                  <span className="ms-1">4.5</span>
                </div>
                <span className="text-muted">
                  <i className="fas fa-shopping-basket fa-sm mx-1" />
                  {details.sold} orders
                </span>
                <span className="text-success ms-2">In stock</span>
              </div>
              <div className="mb-3">
                <span
                  className={
                    details.priceAfterDiscount
                      ? "text-decoration-line-through text-danger me-2 "
                      : "h5"
                  }
                >
                  {details.price}
                </span>
                <span className="h5">{details.priceAfterDiscount} EGB</span>
                <span className="text-muted">/per item</span>
              </div>
              <p>{details.description}</p>
              <div className="row">
                <dt className="col-3">Category</dt>
                <dd className="col-9">
                  <Link
                    to={`/categories/${details.category.name}`}
                    className="text-decoration-underline"
                  >
                    {details.category.name}
                  </Link>
                </dd>
                <dt className="col-3">Brand</dt>
                <dd className="col-9">
                  <Link
                    to={`/brands/${details.brand.name}`}
                    className="text-decoration-underline"
                  >
                    {details.brand.name}
                  </Link>
                </dd>
              </div>
              <hr />
              <div className="row mb-2">
               
              </div>
              <div className="d-flex flex-wrap">
                <button
             
                  className="btn btn-dark rounded-pill flex-grow-1 mt-2 me-2"
                  onClick={() => handleAddCart(id)}
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i>
                  Add to Cart
                </button>
                <button
                  className="btn btn-dark rounded-pill flex-grow-1 mt-2 me-2"
                 
                >
                  Buy Now
                </button>
                
                <button
                  className="btn btn-light rounded-pill border-black mt-2 flex-grow-1 flex-sm-grow-0"
                  onClick={() => handleAddWishlist(id)}
                >
                  <i className="me-1 fa fa-heart fa-lg" />
                  Save
                </button>
              </div>
              <div
                className="accordion accordion-flush mt-4"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Product Info
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      This is the space to describe the product. Write a short
                      overview that includes important features, pricing, and
                      other relevant info for a potential buyer. Consider adding
                      an image or video to show off the product and entice
                      visitors to make a purchase.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Return & Refund Policy
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      I’m a Return and Refund policy. I’m a great place to let
                      your customers know what to do in case they are
                      dissatisfied with their purchase. Having a
                      straightforward refund or exchange policy is a great way
                      to build trust and reassure your customers that they can
                      buy with confidence.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Shipping Info
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      I’m a shipping policy. I’m a great place to add more
                      information about your shipping methods, packaging, and
                      cost. Providing straightforward information about your
                      shipping policy is a great way to build trust and
                      reassure your customers that they can buy from you with
                      confidence.
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="pt-2">
                <div className="d-flex mb-3">
                  <Link
                    className="me-3 text-dark"
                    to="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-lg fa-twitter" />
                  </Link>
                  <Link
                    className="me-3 text-dark"
                    to="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-lg fa-facebook" />
                  </Link>
                  <Link
                    className="me-3 text-dark"
                    to="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-lg fa-instagram" />
                  </Link>
                  <Link
                    className="me-3 text-dark"
                    to="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-lg fa-pinterest" />
                  </Link>
                  <Link
                    className="me-3 text-dark"
                    to="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fab fa-lg fa-linkedin" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
