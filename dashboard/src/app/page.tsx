"use client";

import React, { useState } from "react";

export default function Home() {
  const [hello, setHello] = useState<string | null>(null);

  const handleSayHello = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hello`);
      const data = await response.json();
      setHello(data.hello);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {hello && <h1 className="text-2xl font-bold mb-4">{hello}</h1>}
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        beatae vitae dicta sunt explicabo.
      </p>
      <button
        onClick={handleSayHello}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Say Hello
      </button>
    </div>
  );
}
