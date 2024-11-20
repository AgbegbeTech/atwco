import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const IPFS_GATEWAYS = [
  { name: 'IPFS.io Gateway', url: 'https://ipfs.io/ipfs/' },
  { name: 'Dweb.link Gateway', url: 'https://dweb.link/ipfs/' },
  { name: 'Cloudflare Gateway', url: 'https://cloudflare-ipfs.com/ipfs/' },
];

function LandingPage() {
  const [selectedGateway, setSelectedGateway] = useState(IPFS_GATEWAYS[0].url);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">And The World Came Outside</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          In loving memory of George Floyd, and all of the lives lost to systemic racism and police brutality. 
          "And The World Came Outside" memorializes the protests of George Floyd in Manhattan and Brooklyn, New York. 
          This collection of images aims to show a different side of humanity through the lens of empathy and compassion.
        </p>
      </header>

      <main className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Explore the interactive digital version or purchase the full photobook to own a piece of this journey.
        </p>
        <div className="space-x-4 mb-4">
          <Link 
            to={{
              pathname: "/flipbook",
              state: { selectedGateway },
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
          >
            View the Digital Flipbook
          </Link>
          <a 
            href="https://www.amazon.com/World-Came-Outside-Brandon-Parker/dp/B0B2FCQVLK" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md"
          >
            Buy the Photobook
          </a>
        </div>
        <div>
          <label htmlFor="gateway-select" className="text-gray-700 dark:text-gray-300 mr-2">Choose IPFS Gateway:</label>
          <select
            id="gateway-select"
            value={selectedGateway}
            onChange={(e) => setSelectedGateway(e.target.value)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {IPFS_GATEWAYS.map((gateway, index) => (
              <option key={index} value={gateway.url}>
                {gateway.name}
              </option>
            ))}
          </select>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
