
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <>
      <section className="landing overflow-hidden align-content-center">
        <div className="container">
          <div className=" text text-white ">
            <h1 className="mb-3">Shop The Top Brand Products</h1>
            <p className="fs-4">Get more for your money with every purchase!</p>
            <Link to="/products" className="btn btn-primary rounded-pill py-2 px-4">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
