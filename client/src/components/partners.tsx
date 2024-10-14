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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth > 768 ? 6 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <Slider {...settings}>
      {imageArray.map((image, index) => {
        return (
          <div key={index}>
            <img src={image} alt="test" className="object-cover h-40 mx-auto" />
          </div>
        );
      })}
    </Slider>
  );
};

export default Partners;
