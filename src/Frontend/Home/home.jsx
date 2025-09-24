import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
];

const startyourcart = "localhost:3000/category/Sweets"

export default function App() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative w-full mx-auto h-[500px] mx-auto overflow-hidden shadow-lg">
        <div
          className="flex transition-transform ease-out duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <h1 className="mt-6 text-2xl font-bold text-gray-800 text-center">Most Popular Categories</h1>

      <h1 className="mt-6 text-2xl font-bold text-gray-800 text-center">Start Your Cart</h1>



    </div>
  );
}



{/* Most Popular 
        Start your cart 
        Best Deals 
        Footer */}
