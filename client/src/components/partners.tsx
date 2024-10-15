import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Partners = () => {
  const imageArray = [
    "/partners/test1.jpg",
    "/partners/test2.jpg",
    "/partners/test3.jpg",
    "/partners/test4.jpg",
    "/partners/test5.jpg",
    "/partners/test6.jpg",
    "/partners/test7.jpg",
    "/partners/test8.jpg",
    "/partners/test9.jpg",
    "/partners/test10.jpg",
    "/partners/test11.jpg",
    "/partners/test12.jpg",
    "/partners/test13.jpg",
    "/partners/test14.jpg",
    "/partners/test15.jpg",
    "/partners/test16.jpg",
    "/partners/test17.jpg",
    "/partners/test18.jpg",
    "/partners/test19.jpg",
    "/partners/test20.jpg",
  ];

  // Define a state variable for slidesToShow
  const [slidesToShow, setSlidesToShow] = useState(6);

  useEffect(() => {
    // Check window width only on the client side
    const handleResize = () => {
      setSlidesToShow(window.innerWidth > 768 ? 6 : 2);
    };

    // Set the correct number of slides on mount
    handleResize();

    // Add a resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use the state variable
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <Slider {...settings}>
      {imageArray.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`partner ${index + 1}`} className="object-cover h-40 mx-auto" />
        </div>
      ))}
    </Slider>
  );
};

export default Partners;
