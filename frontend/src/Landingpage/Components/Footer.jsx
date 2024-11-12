import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <div className='container'>
      <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
            <h3>Useful Links</h3>
            <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
        <div className="footer-column">
            <h3>Policies</h3>
            <ul>
                <li><a href="#">Terms & Conditions</a></li>
            </ul>
        </div>
        <div className="footer-column">
            <h3>Contact</h3>
            <p><i className="fa fa-phone"></i> +91 9182184609</p>
            <div className="social-icons">
                <a href="#" class="fa fa-whatsapp"></a>
                <a href="#" class="fa fa-instagram"></a>
                <a href="#" class="fa fa-linkedin"></a>
                <a href="#" class="fa fa-facebook"></a>
            </div>
        </div>
    </div>
   </footer>
    </div>
  )
}

export default Footer;
