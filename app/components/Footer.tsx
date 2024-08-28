import React from 'react'
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 hover:select-none">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">BriefBuzz</h4>
            <p>All in one destination to get your news according to your preferences.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><a href="https://utkarshj.vercel.app/" className="hover:text-gray-300">Portfolio</a></li>
              <li><Link href="/features" className="hover:text-gray-300">Features</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Me</h4>
            <ul className="space-y-2">
            <li><a href="mailto:utkarshjha.4009@gmail.com" className="hover:text-gray-300">utkarshjha.4009@gmail.com</a></li>

              <li><a href="tel:+918595687296" className="hover:text-gray-300">+91-859-568-7296</a></li>
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
