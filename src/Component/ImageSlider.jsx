import { useEffect, useRef, useState } from "react";

function ImageSlider() {
  const [slider, setSlider] = useState(0);

  const timer = useRef();

  const images = [
    "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
    "https://img.freepik.com/free-photo/3d-rendering-pink-rectangle-shape_23-2150824456.jpg?size=626&ext=jpg",
    "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
    "https://replicate.delivery/mgxm/0958ab0c-8d26-45f8-a5f1-a27a1f2259cc/baby.jpg",
    "https://images.unsplash.com/photo-1596097101817-bcfbebb1c00a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxNDczODV8fGVufDB8fHx8fA%3D%3D",
    "https://cdn.pixabay.com/photo/2015/01/15/16/17/hands-600497_1280.jpg",
  ];

  function nextSliderHandler() {
    setSlider((prevSlider) =>
      prevSlider >= images.length - 1 ? 0 : prevSlider + 1
    );
  }

  function prevSliderHandler() {
    setSlider((prevSlider) =>
      prevSlider <= 0 ? images.length - 1 : prevSlider - 1
    );
  }

  useEffect(() => {
    document.body.style.backgroundColor = "black";
    timer.current = setTimeout(() => {
      setSlider((prevSlider) =>
        prevSlider >= images.length - 1 ? 0 : prevSlider + 1
      );
    }, 3000);

    return () => clearTimeout(timer.current);
  }, [slider]);

  function handleStopCarousel() {
    clearTimeout(timer.current);
  }

  function handleStartCarousel() {
    timer.current = setTimeout(() => {
      setSlider((prevSlider) =>
        prevSlider >= images.length - 1 ? 0 : prevSlider + 1
      );
    }, 3000);
  }
  
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">
      {/* Main Slider */}
      <div
        className="relative overflow-hidden h-80 rounded-lg shadow-lg"
        onMouseOver={handleStopCarousel}
        onMouseLeave={handleStartCarousel}
      >
        <img
          src={images[slider]}
          alt="Slider Image"
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          key={slider} // Ensure React re-renders on slider change
        />
        {/* Prev and Next Buttons */}
        <button
          onClick={prevSliderHandler}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 focus:outline-none"
        >
          Prev
        </button>
        <button
          onClick={nextSliderHandler}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 focus:outline-none"
        >
          Next
        </button>
      </div>

      {/* Image Previews */}
      <div className="flex justify-center gap-4 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Preview ${index}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-110 ${
              index === slider ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSlider(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
