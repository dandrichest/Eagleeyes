
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
            <div className="bg-secondary p-3 rounded-full mr-4 text-white">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-primary">{title}</h3>
        </div>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

const ValueCard = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-light p-6 rounded-lg border-l-4 border-secondary">
        <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
        <p className="text-gray-700">{description}</p>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 px-6 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">Empowering Your Future</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up">Leading provider of innovative solar and security solutions for a safer, more sustainable, and connected life.</p>
          <div className="space-x-4">
            <Link to="/store" className="bg-secondary hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition duration-300">Explore Products</Link>
            <Link to="/training" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-3 px-8 rounded-full transition duration-300">Our Courses</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceCard 
            title="Sustainable Energy Installation"
            items={['Solar Panels', 'Batteries', 'Inverters', 'MPPT Charger Controller']}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          />
          <ServiceCard 
            title="General Security"
            items={['CCTV & Spy Cameras', 'Car Tracker & Fire Alarms', 'Video Door Phone', 'Electric Fence Installation']}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
          />
        </div>
      </section>

      {/* Core Values Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <ValueCard title="Innovation" description="We are passionate about developing and delivering cutting-edge solar and security products that meet the evolving needs of our customers."/>
            <ValueCard title="Customer-Centricity" description="Our customers are at the heart of everything we do. We strive to provide exceptional service and support."/>
            <ValueCard title="Integrity" description="We conduct our business with honesty, transparency, and ethical conduct, building trust with our partners and employees."/>
            <ValueCard title="Sustainability" description="We are committed to promoting sustainable practices and reducing our environmental impact."/>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
