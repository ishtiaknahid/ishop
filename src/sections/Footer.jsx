import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-acqa text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contactUs">Contact Us</Link></li>
              <li><Link to="Careers">Careers</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-4">Developers</h2>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/ishtiak-nahid-624128185/" target="_blank" rel="noopener noreferrer">
                  Ishtiak Nahid
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mokter-hossain-7289941b9/" target="_blank" rel="noopener noreferrer">
                  Mokter Hossain
                </a>
              </li>
            
              
            </ul>
          </div>
        
          <div className="w-full md:w-1/4 go-to-section">
            <h2 className="text-lg font-bold mb-4">Go to</h2>
            <p>Ima'luum Advertisement</p>
            <a href="https://imaluum.iium.edu.my/" target="_blank" rel="noopener noreferrer">
              <button className="bg-white -500 text-acqa font-bold mt-2 p-2 rounded hover:scale-110 transition duration-300">
                Ima'luum
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center mt-8">
        <p className="text-s bg-acqa">
          &copy; 2023 ishop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
