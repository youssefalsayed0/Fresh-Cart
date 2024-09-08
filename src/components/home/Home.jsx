import { Link } from "react-router-dom";
import GetProducts from "../getProducts/GetProducts";
import Landing from "../landing/Landing";

// import slide_1 from "../../assets/images/cloth1.jpg";
// import slide_2 from "../../assets/images/cloth2.jpg";
// import slide_3 from "../../assets/images/cloth3.jpg";
// import slide_4 from "../../assets/images/headset.jpg";
// import slide_5 from "../../assets/images/smart.jpg";
// import slide_6 from "../../assets/images/vega.jpg";
// import landing from "../../assets/images/templatesdrive_3d_models_of_8_products_edited.webp";

export default function Home() {

  return (
    <>
      <Landing />

      <section className="new-arrivals main-p sec-background">
        <div className="container">
          <div className="d-flex justify-content-md-between align-items-md-end mb-4 flex-column flex-md-row">
            <h1 className="">New Arrivals</h1>
            <Link
              className="text-decoration-underline  text-dark-emphasis"
              to="/products"
            >
              SHOP ALL
            </Link>
          </div>
          
   
          <GetProducts limit={4} />
        </div>
      </section>

    </>
  );
}
