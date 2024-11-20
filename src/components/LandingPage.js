import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <header className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">And The World Came Outside</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          In loving memory of George Floyd, and all of the lives lost to systemic racism and police brutality. 
          "And The World Came Outside" memorializes the protests of George Floyd in Manhattan and Brooklyn, New York. 
          This collection of images aims to show a different side of humanity through the lens of empathy and compassion.
        </p>
      </header>

      <main className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Explore the interactive digital version or purchase the full photobook to own a piece of this journey.
        </p>
        <div className="space-x-4">
          <Link 
            to="/flipbook"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
          >
            View the Digital Flipbook
          </Link>
          <a 
            href="amazon.com/World-Came-Outside-Brandon-Parker/dp/B0B2FCQVLK" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md"
          >
            Buy the Photobook
          </a>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
