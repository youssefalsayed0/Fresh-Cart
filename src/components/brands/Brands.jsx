import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Brands() {
  
   function getAllBrands() {
   return  axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
  }


  const { data, isError, isLoading } = useQuery({
    queryFn: getAllBrands,
    queryKey: "allBrands",
  });

  if (isError) {
    return (
      <div className="text-center py-5">
        <h3>Error Loading Brands.</h3>
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
  const brands = data.data.data;

  return (
    <>
        <section className="get-brands item main-p">
           
          <div className="container">
             <h1 className="main-title position-relative mb-5 pb-2 ">All Brands</h1>
            <div className="brands">
              <div className="row gy-5">
                {brands?.map((brand) => (
                  <>
                    <div   key={brand._id}  className="col-sm-6 col-md-4 col-lg-3 " >
                      <Link to={`/brands/${brand.name}`} className=" ">
                        <div className="text-center box border-black">
                          <div className="image overflow-hidden">
                            <img
                              src={brand.image}
                              alt={brand.name}
                              className="img-fluid"
                            />
                          </div>
                          <div className="text mt-3 ">
                            <h5 className="category-title mb-1 ">
                              {brand.name}
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
 