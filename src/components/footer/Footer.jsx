export default function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start text-black main-p" >
        
        <div className="container">
        <div  className="d-flex justify-content-between p-4"  >
          
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
       
          <div>
            <a href="" className=" me-4">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="" className=" me-4">
              <i className="fab fa-twitter" />
            </a>
            <a href="" className=" me-4">
              <i className="fab fa-instagram" />
            </a>
            <a href="" className=" me-4">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>

          <div>
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                 
                  <h6 className="text-uppercase fw-bold">Fresh Cart</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Products</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <a href="#!" className="">
                      Women
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="">
                      Men
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="">
                      Electronics
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="">
                     Music
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <a href="#!" className="">
                      Products
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="">
                    Shipping Rates
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="">
                     Contact
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="">
                      Help
                    </a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fas fa-home mr-3" /> Giza, Fysal, Egypt
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3" /> youssef.elmehrzy0@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3" /> +201100760404
                  </p>
                  <p>
                    <i className="fas fa-print mr-3" /> +201550929581
                  </p>
                </div>
              </div>
            
            </div>
          </div>
  
          <div className="text-center p-3 bg-se">
          Copyright © 2024 FRESh CART. All Rights Reserved
          </div>

        </div>
      </footer>
    </>
  );
}
