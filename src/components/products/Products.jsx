import GetProducts from "../getProducts/GetProducts";

export default function Products() {
  return (
    <>

    <section className="products main-p">
        <div className="container">
        <h1 className="main-title position-relative mb-5 pb-2 ">All Products</h1>
            <GetProducts/>
        </div>
    </section>
    </>
  )
}
