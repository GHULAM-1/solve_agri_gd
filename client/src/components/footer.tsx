import { AiOutlineMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";
import { navLinks } from "@/data/constants";
import Newsletter from "./newsletter";


const Footer = () => {
  return (
    <div className="bg-DB flex flex-col items-center justify-center w-full px-4 md:px-20 xl:px-40 gap-12 md:py-20 py-8">
      <div className="h-0.5 w-1/2 bg-LG" />
      <div className="flex flex-col lg:flex-row w-full gap-12">
        <div className=" w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">About</h1>
          <div className="flex flex-col gap-1">
            <p className="text-white">
              L – 199, Model Town Extension, Lahore (54700) Pakistan
            </p>
            <p className="text-white">+92 304-1115566</p>
            <p className="text-white">+92 42 3585 6772-5</p>
            <p className="text-white">info@solveagripak.com</p>
          </div>
         <div className="md:block hidden">
         <Newsletter />
         </div>
          </div>
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white lg:mt-0 text-3xl font-medium">
            Quick Links
          </h1>
          <div className="flex flex-col gap-1">
            {navLinks[3]?.children?.map((link, index) => (
              <Link
                key={index}
                href={`/${link.slug}`}
                className="text-white hover:text-LG"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">Policies</h1>
          <div className="flex flex-col gap-1">
            <Link href={"/"} className="text-white hover:text-LG">
              Privacy Policy
            </Link>
            <Link href={"/"} className="text-white hover:text-LG">
              Shipping Policy
            </Link>
            <Link href={"/"} className="text-white hover:text-LG">
              Terms and Conditions
            </Link>
            <div className="md:flex hidden mt-8 flex-col lg:flex-row items-center">
              <img
                src="/footer/agridairy.png"
                alt="agridairy"
                className="h-[70px] mr-5 mt-1"
              />
              <img
                src="/footer/agrifeeds.png"
                alt="agrifeeds"
                className="h-[60px] mt-2 mr-5"
              />
              <img
                src="/footer/agrifoundation.png"
                alt="agrifoundation"
                className="h-[80px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-full justify-center flex-wrap">
        <a href="mailto:drliveluv@att.net" target="_blank" rel="noreferrer">
          <AiOutlineMail className="text-2xl text-LG hover:text-LLG" />
        </a>
        <a
          href="https://www.facebook.com/spoiledwit"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF className="text-2xl text-LG hover:text-LLG" />
        </a>
        <a
          href="https://www.twitter.com/spoiledwit"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter className="text-2xl text-LG hover:text-LLG" />
        </a>
        <a
          href="https://www.instagram.com/drliveluv"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram className="text-2xl text-LG hover:text-LLG" />
        </a>
        <a
          href="https://www.pinterest.com/drliveluv"
          target="_blank"
          rel="noreferrer"
        >
          <FaPinterest className="text-2xl text-LG hover:text-LLG" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
