'use client'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BsChevronCompactDown } from "react-icons/bs";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (inView) {
    controls.start("visible");
  }

  const images = ["/slide1.png", "slide2.jpg" , "goats.jpg" , "img6.jpg"];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };
  return (
    <div className="flex w-full items-center h-screen justify-center">
      <div
        className={`relative overflow-hidden`}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Slider {...settings}>
          {images.map((img, i) => {
            return (
              <div
                key={i}
                className="flex w-full h-screen justify-center items-center relative"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </Slider>
        <motion.div
          className="absolute bg-black bg-opacity-30 top-0 left-0 w-full h-full flex px-8 md:px-20 xl:px-40"
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -100 },
          }}
          transition={{ duration: 1 }}
        >
          <div className="flex px-4 flex-col w-full md:mt-20 justify-center md:justify-end items-start">
            <p className="text-white text-xl md:mb-28">
              <strong className=" text-green-600 text-3xl">SOLVE</strong> - Solutions for
              Livestock Value-added Enterprises
            </p>
          </div>
        </motion.div>
        <div className="absolute bottom-10 w-full flex animate-bounce justify-center items-center">
          <BsChevronCompactDown className="text-white text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
