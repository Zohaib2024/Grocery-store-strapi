import React from "react";
import Image from "next/image";

const Slider = async () => {
  const data = await fetch("http://localhost:1337/api/Slider?populate=*");

  const response = await data.json();

  // Make sure to access the first image in the array if multiple images are present
  const imageUrl = response.data?.Image?.[0]?.formats?.large?.url
    ? `http://localhost:1337${response.data.Image[0].formats.large.url}`
    : "/Fruits.png"; // Fallback image if no image is found

  return (
    <div>
      <div>
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt={response.data?.title}
          className="w-screen"
          unoptimized
        />
        <hr />
      </div>
    </div>
  );
};

export default Slider;
