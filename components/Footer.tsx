import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
                <h3 className="text-lg font-bold text-secondary mb-2">EAGLEEYES TECHNOLOGY</h3>
                <p className="text-sm text-gray-300">RC:1850670</p>
                <p className="mt-4 text-sm text-gray-400">Your trusted partner in sustainable energy and general security solutions.</p>
            </div>
            <div>
                <h3 className="text-lg font-bold text-secondary mb-2">Contact Us</h3>
                <p className="text-sm text-gray-300">Suite 0.18 Otibo Odinamadu Block, National Women Development, Opp. CBH HQ Central Business District Abuja</p>
                <p className="text-sm text-gray-300">Angi Junsction By First Baptist Church, Masaka</p>
            </div>
             <div>
                <h3 className="text-lg font-bold text-secondary mb-2">Quick Links</h3>
                <Link to="/login" className="text-sm text-gray-300 hover:text-secondary transition-colors">Admin Login</Link>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} Eagles Eye Technology. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;