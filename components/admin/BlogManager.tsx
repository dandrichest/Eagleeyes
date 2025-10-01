
import React, { useState } from 'react';
import { MOCK_BLOG_POSTS } from '../../constants/data';
import { BlogPost } from '../../types';

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Manage Blog Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-light">
            <tr>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Author</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{post.title}</td>
                <td className="py-2 px-4 border-b">{post.author}</td>
                <td className="py-2 px-4 border-b">{post.date}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline text-sm mr-2">Edit</button>
                  <button className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-6 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
        Create New Post
      </button>
    </div>
  );
};

export default BlogManager;
