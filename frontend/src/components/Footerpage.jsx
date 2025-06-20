import React from "react";
import { assets } from "../assets/assets";

const Footerpage = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 mt-20 py-10">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between gap-8 px-6 md:px-16 lg:px-24 xl:px-36">
        <div className="flex flex-col gap-4 w-1/3">
          <img src={assets.stayfinderlogo} alt="StayFinder Logo" className="w-36" />
          <p className="text-sm text-gray-400">
            Discover the best stays and unforgettable experiences worldwide. Your journey begins here.
          </p>
        </div>

        <div className="flex justify-between md:gap-10 w-3/4">
          <div className="mx-20">
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/rooms" className="hover:text-white transition">Rooms</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><p className="hover:text-white transition cursor-pointer">Contact</p></li>
              <li><p className="hover:text-white transition cursor-pointer">FAQ</p></li>
              <li><p className="hover:text-white transition cursor-pointer">Terms & Conditions</p></li>
              <li><p className="hover:text-white transition cursor-pointer">Privacy Policy</p></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition">
                <img src={assets.facebookIcon} alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition">
                <img src={assets.twitterIcon} alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition">
                <img src={assets.instagramIcon} alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
      </div>
    </div>
  );
};

export default Footerpage;
