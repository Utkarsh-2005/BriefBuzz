import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 hover:select-none mt-[100px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">BriefBuzz</h4>
            <p>All in one destination to get your news according to your preferences.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Features</a></li>
              <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Me</h4>
            <ul className="space-y-2">
              <li><a href="https://utkarshj.vercel.app/" className="hover:text-gray-300">utkarshj.vercel.app</a></li>
              <li><a href="#" className="hover:text-gray-300">+91-859-568-7296</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/utkarsh-jha-002b23266/" className="hover:text-blue-500"><FaLinkedin size={24} /></a>
              <a href="https://github.com/Utkarsh-2005" className="hover:text-green-400"><FaGithub size={24} /></a>
              <a href="https://www.instagram.com/utkarsh.905/" className="hover:text-pink-500"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>© 2023 BriefBuzz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
