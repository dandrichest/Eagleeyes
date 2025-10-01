
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS } from '../constants/data';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-red-600">Post not found</h2>
      <Link to="/blog" className="text-secondary hover:underline mt-4 inline-block">Back to Blog</Link>
    </div>;
  }

  return (
    <article className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>By {post.author}</span>
        <span className="mx-2">&bull;</span>
        <span>{post.date}</span>
      </div>
      <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8 shadow-md" />
      <div className="prose lg:prose-xl max-w-none text-gray-800">
        <p>{post.content}</p>
      </div>
      <div className="mt-8 pt-6 border-t">
        <p className="text-sm text-gray-600">Tags: {post.tags.join(', ')}</p>
      </div>
    </article>
  );
};

export default BlogPostPage;
