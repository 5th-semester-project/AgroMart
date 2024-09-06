import React from 'react';
import { FaGithub, FaFacebook, FaInstagram, FaTwitter, FaTwitch } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative w-full mt-24 bg-gray-200 text-slate-900 py-12">
      <div className="w-full max-w-screen-xl mx-auto flex flex-wrap justify-between px-4 md:px-8 relative z-10">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">AgroMart</h2>
          <p className="text-gray-600 mb-4">
            At AgroMart, we provide smart agronomy solutions to help farmers increase productivity and reduce crop wastage.
          </p>
          <p className="text-gray-600">Copyright © 2024 AgroMart</p>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
          <p className="text-gray-600 mb-4">
            AgroMart (Pvt) Ltd,<br />New Agriculture Complex,<br />Colombo, Sri Lanka.<br />Moratuwa
          </p>
          <a href="mailto:contact@agromart.com" className="text-gray-600 underline">
            contact@agromart.com
          </a>
        </div>
        <div className="w-full md:w-1/3 text-right">
          <img src="/logo.png" alt="AgroMart Logo" className="w-80 md:ml-auto ml-auto" />
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-8">
        <a href="https://github.com" aria-label="GitHub" className="hover:text-gray-500">
          <FaGithub size={24} />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-500">
          <FaFacebook size={24} />
        </a>
        <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gray-500">
          <FaInstagram size={24} />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-500">
          <FaTwitter size={24} />
        </a>
        <a href="https://twitch.com" aria-label="Twitch" className="hover:text-gray-500">
          <FaTwitch size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
