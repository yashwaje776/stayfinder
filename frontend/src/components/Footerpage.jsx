import React from "react"
import { assets } from "../assets/assets"

const Footerpage = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 md:px-16 lg:px-24 xl:px-36">
      
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div>
          <img src={assets.stayfinderlogo} alt="StayFinder Logo" className="w-36 mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Discover the best stays and unforgettable experiences worldwide. Your journey begins here.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10">
          
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/rooms" className="hover:text-white transition">Rooms</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><p className="hover:text-white cursor-pointer">Contact</p></li>
              <li><p className="hover:text-white cursor-pointer">FAQ</p></li>
              <li><p className="hover:text-white cursor-pointer">Terms & Conditions</p></li>
              <li><p className="hover:text-white cursor-pointer">Privacy Policy</p></li>
            </ul>
          </div>

        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Connect with us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <img src={assets.facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
              <img src={assets.twitterIcon} alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <img src={assets.instagramIcon} alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
      </div>
      
    </footer>
  )
}

export default Footerpage
