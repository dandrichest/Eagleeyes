
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS } from '../constants/data';
import { BlogPost } from '../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative h-48">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover"/>
        </div>
        <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{post.date} &bull; by {post.author}</p>
            <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <span className="font-semibold text-secondary group-hover:underline">Read More &rarr;</span>
        </div>
    </Link>
);

const BlogPage: React.FC = () => {
  return (
    <div>
      <div className="text-center bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-primary">Eagles Eye Blog</h1>
        <p className="text-gray-600 mt-2">Insights and updates on security and sustainable energy.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_BLOG_POSTS.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
