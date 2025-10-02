import { User, Role, Product, ProductCategory, BlogPost, Course } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', email: 'admin@eagleeyes.com', name: 'Admin User', role: Role.ADMIN, password: 'admin123' },
  { id: '2', email: 'customer@example.com', name: 'John Doe', role: Role.CUSTOMER, password: 'password123' },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    { id: 'cat1', name: 'Solar Panels' },
    { id: 'cat2', name: 'Inverters & Batteries' },
    { id: 'cat3', name: 'CCTV Systems' },
    { id: 'cat4', name: 'Security Gadgets' },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'prod1', 
    name: 'Luminous 5KVA Solar Inverter', 
    description: 'High-efficiency 5KVA solar inverter suitable for residential and small commercial use. Pure sine wave output ensures safety of your sensitive appliances.',
    price: 850000.00, 
    category: 'Inverters & Batteries',
    imageUrl: 'https://picsum.photos/seed/prod1/600/400', 
    stock: 25,
    specs: { 'Capacity': '5KVA', 'Type': 'Pure Sine Wave', 'Warranty': '2 Years' }
  },
  { 
    id: 'prod2', 
    name: '350W Monocrystalline Solar Panel', 
    description: 'Durable and highly efficient 350W solar panel. Built to withstand harsh weather conditions while providing maximum power output.',
    price: 150000.00, 
    category: 'Solar Panels', 
    imageUrl: 'https://picsum.photos/seed/prod2/600/400',
    stock: 150,
    specs: { 'Wattage': '350W', 'Cell Type': 'Monocrystalline', 'Efficiency': '21%' }
  },
  { 
    id: 'prod3', 
    name: '4-Channel HD CCTV Kit', 
    description: 'Complete high-definition CCTV kit with 4 weatherproof cameras, a 1TB DVR, and remote viewing capabilities via a mobile app.',
    price: 250000.00, 
    category: 'CCTV Systems', 
    imageUrl: 'https://picsum.photos/seed/prod3/600/400',
    stock: 40,
    specs: { 'Channels': '4', 'Resolution': '1080p Full HD', 'Storage': '1TB' }
  },
  { 
    id: 'prod4', 
    name: 'GPS Car Tracker', 
    description: 'Real-time GPS tracking device for any vehicle. Features include live tracking, geo-fencing, and engine cut-off functionality.',
    price: 45000.00, 
    category: 'Security Gadgets', 
    imageUrl: 'https://picsum.photos/seed/prod4/600/400',
    stock: 80,
    specs: { 'Network': 'GSM/GPRS', 'Battery': 'Internal Backup', 'Feature': 'Real-time Tracking' }
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog1',
    slug: '5-benefits-of-solar-energy',
    title: 'Top 5 Benefits of Switching to Solar Energy',
    author: 'Admin User',
    date: 'October 26, 2023',
    excerpt: 'Discover how investing in solar panels can reduce your electricity bills, increase your property value, and help the environment.',
    content: 'Switching to solar energy is one of the best decisions you can make for your home and the planet. Firstly, it drastically reduces or even eliminates your electricity bills. Secondly, you can earn tax credits and rebates. Thirdly, it increases the value of your property. Fourthly, it reduces your carbon footprint. Finally, solar panels are incredibly durable and require minimal maintenance.',
    imageUrl: 'https://picsum.photos/seed/blog1/800/600',
    tags: ['Solar', 'Energy', 'Sustainability']
  },
  {
    id: 'blog2',
    slug: 'choosing-the-right-cctv',
    title: 'How to Choose the Right CCTV System for Your Home',
    author: 'Admin User',
    date: 'November 5, 2023',
    excerpt: 'A comprehensive guide to selecting the perfect CCTV system. We cover camera types, resolution, storage, and smart features.',
    content: 'Choosing a CCTV system can be daunting. You need to consider several factors. What resolution do you need? 1080p is standard, but 4K offers more detail. Do you need indoor or outdoor cameras? Outdoor cameras must be weatherproof. How much storage is required? This depends on how long you want to keep recordings. Finally, consider smart features like motion detection and mobile alerts.',
    imageUrl: 'https://picsum.photos/seed/blog2/800/600',
    tags: ['Security', 'CCTV', 'Home Safety']
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'course1',
    title: 'Certified Solar Panel Installation Professional',
    description: 'A comprehensive, hands-on course covering everything from solar energy fundamentals to advanced installation techniques and safety protocols.',
    price: 250000.00,
    instructor: 'Dr. Michael Adebayo',
    duration: '6 Weeks',
    imageUrl: 'https://picsum.photos/seed/course1/600/400',
    modules: [
        { title: 'Module 1: Introduction to Photovoltaics', content: '...' },
        { title: 'Module 2: Site Assessment and System Design', content: '...' },
        { title: 'Module 3: Installation and Commissioning', content: '...' },
    ]
  },
  {
    id: 'course2',
    title: 'Advanced CCTV and Surveillance Systems',
    description: 'Learn to design, install, and manage complex CCTV systems, including IP cameras, NVRs, and video analytics for modern security challenges.',
    price: 180000.00,
    instructor: 'Jane Okoro',
    duration: '4 Weeks',
    imageUrl: 'https://picsum.photos/seed/course2/600/400',
    modules: [
        { title: 'Module 1: IP Networking for Security', content: '...' },
        { title: 'Module 2: Advanced Camera Technologies', content: '...' },
        { title: 'Module 3: Video Management Systems (VMS)', content: '...' },
    ]
  },
];