import { useParams } from "react-router-dom";
import GetProducts from "../getProducts/GetProducts";

export default function BrandProducts() {
  let { name } = useParams(); // Getting the category name and _id from the URL parameters

  // Filter function to show only products that belong to the specific category _id
  const filterByCategory = (x) => x.brand.name === name;

  return (
    <>
      <section className="main-p">
        <div className="container">
        <h1 className="main-title position-relative mb-5 pb-2 ">{name}</h1>
          <GetProducts filter={filterByCategory} />
        </div>
      </section>
    </>
  );
}
