import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

const photos = [
  { name: "ATWCO_001.jpg", cid: "QmcbUjshj7RoHHLTXFMASwUTjHsKCTEVWVr4uHFLx4Du56", size: 2070796 },
  { name: "ATWCO_002.jpg", cid: "QmTcuyV5naUmqmapnYrsL9nyxM8d6uCBfAYHhxg8zgKBfr", size: 4768423 },
  { name: "ATWCO_003.jpg", cid: "QmYAbSX5yx6EA5NPYTqJSDWRqCNvZuC9uaa8ogiyTZbzJH", size: 2704952 },
  { name: "ATWCO_004.jpg", cid: "QmTzzjHoc6stWCzKrFmF15mEpK1ViMX9NDTgpUqdJcAgJr", size: 4789685 },
  { name: "ATWCO_005.jpg", cid: "QmVNdYtEWamJdYYsMeXdH99vtZeG2LmYUoQgQW12979PVj", size: 5577758 },
  { name: "ATWCO_006.jpg", cid: "QmWAWPUQCvQcEBJNKX2H7VwRdhLcVKwbQFzBE3YwcgKkc7", size: 2226451 },
  { name: "ATWCO_007.jpg", cid: "QmQTyxh4FtHcTn7WUBSaArvh19xyquN8P183vSSzE2wDRN", size: 6433446 },
  { name: "ATWCO_008.jpg", cid: "Qma8t8A6URV4xk4waSsHn51qMSmpdQM7PzkrFdKpiDv7uY", size: 3048987 },
  { name: "ATWCO_009.jpg", cid: "QmRJeriz3Gfi3M8sxHyoxqcctXhzo2kNSgJLZ87uZHdUom", size: 6920243 },
  { name: "ATWCO_010.jpg", cid: "QmVsqdXKCND4CMwFb4gqcnhNo7NPpa1SgaAqnyvbKceF2G", size: 4694696 },
  { name: "ATWCO_011.jpg", cid: "QmUFDyT1VFqgQWboY6Ab9cgRJKpPum9LynzQ55Fuiuz2Pa", size: 8695939 },
  { name: "ATWCO_012.jpg", cid: "QmPHp7d1Ks3ZK4MEDesWt4RWEg25p7HGxZCegQoCwt47bx", size: 3497000 },
  { name: "ATWCO_013.jpg", cid: "QmdUNR6o835ZxcLCpXUZ4YrZg4rK5wPySf4Th6HLKpu981", size: 7136083 },
  { name: "ATWCO_014.jpg", cid: "QmP1u81GFdeSqh6Zapxfu5pgXuAFoAAi7R2imbfdMRuaB2", size: 4492937 },
  { name: "ATWCO_015.jpg", cid: "QmUySqZKu1bvmumoKLKsBw5JXMi4dAewFnwEhU7yPzHyn8", size: 8620444 },
  { name: "ATWCO_016.jpg", cid: "QmbtFBNrMpvkhRTVLFRHEds4xCGNcCbxyMdweJUmhTqgRP", size: 2354684 },
  { name: "ATWCO_017.jpg", cid: "QmNyCK3JWSCLLHaNHYSMHyBvqc5FtRvHuPCLRGjAzCHe2s", size: 7389679 },
  { name: "ATWCO_018.jpg", cid: "QmfT7UZaAddCp639BJwKaLgtti8gafTSEiPZ4kJt6r1fAk", size: 6667444 },
  { name: "ATWCO_019.jpg", cid: "QmWaAp97GMG6LpCEK2wS69mY1mPQaMpHJLqcMX8XTAAp9H", size: 6856033 },
  { name: "ATWCO_020.jpg", cid: "QmahVBoh2ZkWEdieAZUas4PPgSTMvgK9ZzxzEfGdQdSNZz", size: 2700531 },
  { name: "ATWCO_021.jpg", cid: "QmacUpQusAdN5E85vCGpmJtkLD26NWDY3HcVCApzmtfbEb", size: 7682801 },
  { name: "ATWCO_022.jpg", cid: "QmYXtsJDktUDDtkr1k9sxVH5eyWVMGfHNkNzP6ZZGQwN1j", size: 2601268 },
  { name: "ATWCO_023.jpg", cid: "QmSQukZda22AoivL4Fx95a6NTyKYBCcfJ7gt84k8yjEcfo", size: 7216932 },
  { name: "ATWCO_024.jpg", cid: "QmWkY2hm1GEdZytio3ew7dNDguB9n4v17Ktak6fYihnYF9", size: 2522984 },
  { name: "ATWCO_025.jpg", cid: "QmfQzuAn11GzeSh77W59TXcBMbnduNusDZzXj7698194C2", size: 3252566 },
  { name: "ATWCO_026.jpg", cid: "QmdU6VpKfiuHmbLTdrJX3vJnJtSd6LeKe8pxkQLE5SXp7k", size: 2558665 },
  { name: "ATWCO_027.jpg", cid: "QmShTgmApdTjT6QjRcShLhwub1TeNvjMZFSDxeqV8RWsLM", size: 2540595 },
  { name: "ATWCO_028.jpg", cid: "QmapXp2fYcovy3nW8mC27UY1G8vnJiEhVznnz34GhbhhME", size: 7792567 },
  { name: "ATWCO_029.jpg", cid: "QmSwzu9BzTXGCppGcWBkLLMToBQG4bk8wanFNCbxdgyf8X", size: 7673379 },
  { name: "ATWCO_030.jpg", cid: "QmayT2v3LDqkbE7U8Mot3rQi9qHj2B3ZZEj49b5wDojtZ2", size: 6638994 },
  { name: "ATWCO_031.jpg", cid: "Qmd6jiPyFsLhrAkfiBoZx9LDvVodE8muZ62SoMHbWjmf3A", size: 9062438 },
  { name: "ATWCO_032.jpg", cid: "QmZVdFMJQ4MTcSKCPnj9Fni5sMXSMn2wiJjEfWVjvUm8oR", size: 3289334 },
  { name: "ATWCO_033.jpg", cid: "QmeoBrxMhDZodLz91T1tmcKPBgaqFVJ4SMab511VxTcPMH", size: 7478234 },
  { name: "ATWCO_034.jpg", cid: "QmPmC7uMRLEzYspyrxj1hFDT1wQK87kCoy3SZj4jTjWkth", size: 6856487 },
  { name: "ATWCO_035.jpg", cid: "QmdyBWktv8ufZSE8ZiPnvzDSpXW9SYUM1PgLWMm5qhv2yw", size: 7331274 },
  { name: "ATWCO_036.jpg", cid: "QmbnVbdc2NsFG7XY7TduZ3uNdAaQQh8j8nfJs6fFBw6XzX", size: 6830213 },
  { name: "ATWCO_037.jpg", cid: "QmYi6YhjsaMK6i4nNRvsyxuiv9GK7wUFyhFQCdhms8Vtts", size: 3931233 },
  { name: "ATWCO_038.jpg", cid: "Qmc57rt3wZUQ7gozV3kctQwcq3CJ1bcVzam57wYbrpN4vu", size: 4168578 },
  { name: "ATWCO_039.jpg", cid: "QmUsMQyM3JGptzWr9wZJKXZK64XxRdbTswzM3giCYRnUKb", size: 3151950 },
  { name: "ATWCO_040.jpg", cid: "QmZBtnuUZVbe66n51xxZGXGA29fFGQh3KJXx2T3GmWQGoS", size: 6648315 },
  { name: "ATWCO_041.jpg", cid: "QmNiFNA9kT6NKZ9RGyS5TecqFEKKGYRKZWNGnX3YBpgmYt", size: 8716614 },
  { name: "ATWCO_042.jpg", cid: "QmeAjt9DZZFDSH7CGseRef4GgkiVHBR9gkNBpASH8EJax2", size: 7226957 },
  { name: "ATWCO_043.jpg", cid: "QmVdz1jKiyKeYVAtV7LriofHPMJnZiNHC1mA34Bqx3yYdT", size: 3956193 },
  { name: "ATWCO_044.jpg", cid: "QmRN1Ljm6bLt9zsBhGbv4dezZyUppg6qVkH5BSKE4CcvrN", size: 7066594 },
  { name: "ATWCO_045.jpg", cid: "QmXpCp67vHcvFmYypBNP9ZqPeeYRh4e3t4jcqKMxztApUF", size: 5602071 },
  { name: "ATWCO_046.jpg", cid: "QmSDL1RMjAbvUbyJzqapQjMbzt1aFnGbquaaFMA3h16MGa", size: 8642518 }
];

const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://dweb.link/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/'
];

function Flipbook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [scale, setScale] = useState(1);
  const [selectedGateway, setSelectedGateway] = useState(IPFS_GATEWAYS[0]);
  const containerRef = useRef(null);
  const loadedImages = useRef({});

  useEffect(() => {
    const preloadImage = async () => {
      const currentCID = photos[currentIndex].cid;
      if (!loadedImages.current[currentCID]) {
        const img = new Image();
        img.src = `${selectedGateway}${currentCID}`;
        img.onload = () => {
          setIsLoading(false);
          loadedImages.current[currentCID] = true;
        };
        img.onerror = () => setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    preloadImage();
  }, [currentIndex, selectedGateway]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
    setIsLoading(true);
    setScale(1);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
    setIsLoading(true);
    setScale(1);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') goToPrevious();
    if (event.key === 'ArrowRight') goToNext();
    if (event.key === 'f') toggleFullscreen();
    if (event.key === 'i') setShowInfo((prev) => !prev);
    if (event.key === '+') setScale((prev) => Math.min(prev + 0.1, 3));
    if (event.key === '-') setScale((prev) => Math.max(prev - 0.1, 0.5));
  }, [goToPrevious, goToNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
      {...handlers}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">And The World Came Outside</h1>
        <div className="space-x-2 flex items-center">
          <button
            aria-label="Zoom Out"
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            -
          </button>
          <button
            aria-label="Zoom In"
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 3))}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            +
          </button>
          <button
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            onClick={toggleFullscreen}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <select
            aria-label="Select IPFS Gateway"
            value={selectedGateway}
            onChange={(e) => setSelectedGateway(e.target.value)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {IPFS_GATEWAYS.map((gateway, index) => (
              <option key={index} value={gateway}>
                Gateway {index + 1}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Viewer */}
      <main className="flex-grow flex items-center justify-center p-4 relative">
        <div className="relative w-full max-w-4xl aspect-[3/2] bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-400"></div>
            </div>
          )}
          <img
            src={`${selectedGateway}${photos[currentIndex].cid}`}
            alt={photos[currentIndex].name}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transform: `scale(${scale})` }}
          />
          <button
            aria-label="Previous Image"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 dark:bg-opacity-75 hover:bg-opacity-75 dark:hover:bg-opacity-50 text-white p-2 rounded-full"
            onClick={goToPrevious}
          >
            &#8592;
          </button>
          <button
            aria-label="Next Image"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 dark:bg-opacity-75 hover:bg-opacity-75 dark:hover:bg-opacity-50 text-white p-2 rounded-full"
            onClick={goToNext}
          >
            &#8594;
          </button>
          {showInfo && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 dark:bg-gray-800 text-white dark:text-gray-400 p-2">
              <p>{photos[currentIndex].name}</p>
              <p>Size: {(photos[currentIndex].size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer with Thumbnails */}
      <footer className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {photos.map((photo, index) => (
              <button
                key={photo.cid}
                aria-label={`Go to ${photo.name}`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsLoading(true);
                  setScale(1);
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  index === currentIndex ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  loading="lazy"
                  src={`${selectedGateway}${photo.cid}`}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Flipbook;