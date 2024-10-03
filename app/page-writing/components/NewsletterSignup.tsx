import React from 'react';

const NewsletterSignup: React.FC = () => (
  <section className="bg-[#1a1a1a] py-12">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="text-xl text-gray-300 mb-8">
        Subscribe to my newsletter for the latest articles and insights
      </p>
      <form className="max-w-md mx-auto">
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-l-full bg-white text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-r-full transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </section>
);

export default NewsletterSignup;
