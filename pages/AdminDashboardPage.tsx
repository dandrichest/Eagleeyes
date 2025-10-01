
import React, { useState } from 'react';
import InventoryManager from '../components/admin/InventoryManager';
import CourseManager from '../components/admin/CourseManager';
import BlogManager from '../components/admin/BlogManager';
import SmartQuoteGenerator from '../components/admin/SmartQuoteGenerator';

type Tab = 'inventory' | 'courses' | 'blog' | 'quote';

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('inventory');

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManager />;
      case 'courses':
        return <CourseManager />;
      case 'blog':
        return <BlogManager />;
      case 'quote':
        return <SmartQuoteGenerator />;
      default:
        return null;
    }
  };
  
  const TabButton = ({ tab, label }: { tab: Tab; label: string }) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === tab ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
        }`}
    >
        {label}
    </button>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl min-h-[600px]">
      <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-4">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton tab="inventory" label="Inventory Management" />
        <TabButton tab="courses" label="Course Management" />
        <TabButton tab="blog" label="Blog Management" />
        <TabButton tab="quote" label="Smart Quote Generator" />
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
