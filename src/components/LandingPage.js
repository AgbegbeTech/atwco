import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const IPFS_GATEWAYS = [
  { name: "IPFS.io Gateway", url: "https://ipfs.io/ipfs/" },
  { name: "Dweb.link Gateway", url: "https://dweb.link/ipfs/" },
  { name: "Cloudflare Gateway", url: "https://cloudflare-ipfs.com/ipfs/" },
];

const IMAGE_CID = "QmcbUjshj7RoHHLTXFMASwUTjHsKCTEVWVr4uHFLx4Du56";

function LandingPage() {
  const [selectedGateway, setSelectedGateway] = useState(IPFS_GATEWAYS[0].url);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <ul>
            <li className="mb-2">
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={{
                  pathname: "/flipbook",
                  state: { selectedGateway },
                }}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
              >
                Flipbook
              </Link>
            </li>
            <li className="mb-2">
              <a
                href="https://www.amazon.com/World-Came-Outside-Brandon-Parker/dp/B0B2FCQVLK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
              >
                Buy the Photobook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <button
          className="text-gray-700 dark:text-gray-300"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          And The World Came Outside
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-4 py-8">
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center mb-8">
          In loving memory of George Floyd, and all of the lives lost to
          systemic racism and police brutality. "And The World Came Outside"
          memorializes the protests of George Floyd in Manhattan and Brooklyn,
          New York. This collection of images aims to show a different side of
          humanity through the lens of empathy and compassion.
        </p>
        <img
          src={`${selectedGateway}${IMAGE_CID}`}
          alt="And The World Came Outside"
          className="rounded shadow-lg max-w-full max-h-96 mb-8"
        />
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 text-center">
          Explore the interactive digital version or purchase the full photobook
          to own a piece of this journey.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <Link
            to={{
              pathname: "/flipbook",
              state: { selectedGateway },
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md text-center"
          >
            View the Digital Flipbook
          </Link>
          <a
            href="https://www.amazon.com/World-Came-Outside-Brandon-Parker/dp/B0B2FCQVLK"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md text-center"
          >
            Buy the Photobook
          </a>
        </div>
        <div className="mb-8">
          <label
            htmlFor="gateway-select"
            className="text-gray-700 dark:text-gray-300 mr-2"
          >
            Choose IPFS Gateway:
          </label>
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

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Brandon Parker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
