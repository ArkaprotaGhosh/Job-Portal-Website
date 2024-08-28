import React from "react";

const Footer = () => {
  return (
    <>
      <section>
        <footer class="footer d-flex text-center align-items-center justify-content-center py-5" style={{ minHeight: "40vh", backgroundColor: "#2171D5", color:"white" }}>
          <div class="container">
            <div class="row justify-content-center mb-2">
            </div>
            <div class="row justify-content-center align-items-center">
              <div class="col-md-4" style={{textAlign:"left"}}>
                <ul style={{ listStyleType: "none",textAlign:"left"}}>
                  <li><h1>Get Jobs</h1><h6>Get your deam job</h6></li>
                  <li><a href="#" class="text-secondary mx-2">
                  <i class="fab fa-facebook-f"/>
                </a>
                <a href="#" class="text-secondary mx-2">
                  <i class="fab fa-linkedin-in"/>
                </a>
                <a href="#" class="text-secondary mx-2">
                  <i class="fab fa-twitter"/>
                </a>
                <a href="#" class="text-secondary mx-2">
                  <i class="fab fa-instagram"/>
                </a></li>
                </ul>
              </div>
              <div class="col-md-2 d-flex gap-2 justify-content-start">
                
                <ul style={{ listStyleType: "none", textAlign:"left"}}>
                  <li>Home</li>
                  <li>Job</li>
                  <li>Services</li>
                  <li>Blogs</li>
                </ul>
              </div>
              <div class="col-md-2">
               <ul style={{ listStyleType: "none", textAlign:"left"}}>
                  <li>FAQ</li>
                  <li>Terms</li>
                  <li>Privacy</li>
                  <li>Help</li>
                </ul>
              </div>
              <div class="col-md-4">
               <ul style={{ listStyleType: "none", textAlign:"left"}}>
                  <li>Address: 122 kolkata street </li>
                  <li>Contact no. : 8900029410</li>
                  <li>Email : ghosharkaprota5@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      <div className="footer">Copyright © 2024 Get Jobs. Built with Arka.</div>
      </section>
    </>
  );
};

export default Footer;
