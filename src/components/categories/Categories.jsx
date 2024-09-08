import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import useAllCategories from "../../CustomHooks/useAllCategories";

export default function Categories() {
  let {isError , isLoading , data} = useAllCategories();

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
  const categories = data.data.data;

  return (
    <>
        <section className="get-categories item main-p">
          <div className="container">
          <h1 className="main-title position-relative mb-5 pb-2 ">All Categories</h1>
            <div className="categories">
              <div className="row gy-5">
                {categories?.map((category) => (
                  <>
                    <div
                      key={category._id}
                      className="col-sm-6 col-md-4 col-lg-3 "
                    >
                      <Link to={`/categories/${category.name}`}>
                        <div className="d-flex flex-column align-items-center">
                          <div className="image overflow-hidden">
                            <img
                              src={category.image}
                              alt={category.slug}
                              className="img-fluid"
                            />
                          </div>
                          <div className="text mt-3 ">
                            <h5 className="category-title mb-1 ">
                              {category.name}
                            </h5>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
