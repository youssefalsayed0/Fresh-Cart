import { useState } from "react";
import GetProducts from "../getProducts/GetProducts";
import { useQuery } from "react-query";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch categories
  const fetchCategories = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryFn: fetchCategories,
    queryKey: "categories",
  });

  if (isCategoriesLoading) {
    return (
      <div className="vh-100 text-center align-content-center bg-white">
        <InfinitySpin visible={true} width="200" color="black" />
      </div>
    );
  }

  if (isCategoriesError) {
    return (
      <div className="text-center py-5">
        <h3>Error loading categories.</h3>
      </div>
    );
  }

  const categories = categoriesData.data.data; // Adjust based on API response

  return (
    <>
      <section className="products main-p">
        <div className="container">
          <h1 className="main-title position-relative mb-5 pb-2">
            All Products
          </h1>

          <div className="row justify-content-end gy-3 mb-5">
            {/* Search Bar */}
            <div className="col-md-4 col-lg-3 position-relative">
              <i className="fas fa-search search-icon"></i> {/* Search Icon */}
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Category Filter */}

            <div className="col-md-4 col-lg-3">
              <select
                className="form-select "
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <GetProducts searchTerm={searchTerm} categoryId={selectedCategory} />
        </div>
      </section>
    </>
  );
}
