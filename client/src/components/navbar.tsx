'use client'; // Ensure this component is client-side only

import { useState, useEffect } from "react";
import { navLinks } from "@/data/navs";
import Link from "next/link"; // Use Next.js Link
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import Accordion from "./accordian";
import { IoMdArrowDropdown } from "react-icons/io";

type LinkWithChildren = {
  id: string;
  title: string;
  href: string;
  children: {
    id: string;
    href: string;
    title: string;
  }[];
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  const onBeforeNavigate = () => {
    setOpenIndex(-1);
    setIsOpen(false);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setIsVisible(!(lastScrollPos > currentScrollPos && currentScrollPos < 100));
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  return (
    <div>
      <RiMenu3Fill
        size={24}
        className={`md:hidden ${!isVisible ? "text-black" : "text-black"} cursor-pointer`}
        onClick={() => setIsOpen(true)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-screen absolute h-screen flex flex-col overflow-y-scroll top-0 left-0 bg-white border-b-[2px] shadow-xl border-gray-400 p-4 transition-all"
          >
            <div className="flex flex-col w-full">
              <AiOutlineClose
                className="w-[24px] self-end text-black cursor-pointer h-[24px]"
                onClick={() => setIsOpen(false)}
              />
              <motion.nav
                initial={{ y: 32 }}
                animate={{ y: 0 }}
                transition={{ ease: "easeOut", duration: 0.15 }}
                className="w-full flex flex-col"
              >
                {navLinks.map((link, i) => (
                  <div key={link.id} className="flex flex-col w-full">
                    {i !== 0 && (
                      <div className="h-[2px] bg-gray-200 w-1/2 self-center my-[6px]" />
                    )}
                    {link.children ? (
                      <Accordion
                        data={{
                          title: (
                            <Link
                              onClick={onBeforeNavigate}
                              href={link.href}
                              className="hover:text-green-500 text-gray-600 transition-all"
                            >
                              {link.title}
                            </Link>
                          ),
                          content: (
                            <div className="flex w-full my-3 text-sm text-gray-500">
                              <div className="w-[2px] bg-gray-300 mx-3 py-8" />
                              <div className="w-full">
                                {link.children.map((c) => (
                                  <Link
                                    onClick={onBeforeNavigate}
                                    key={c.id}
                                    href={c.href}
                                    className="w-full max-w-[200px] h-10 flex items-center hover:text-green-500 transition-all"
                                  >
                                    {c.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ),
                        }}
                        isOpen={i === openIndex}
                        onClick={() =>
                          i === openIndex ? setOpenIndex(-1) : setOpenIndex(i)
                        }
                      />
                    ) : (
                      <Link
                        onClick={onBeforeNavigate}
                        key={link.id}
                        href={link.href}
                        className="w-full max-w-[200px] flex items-center text-gray-700 hover:text-green-500 transition-all"
                      >
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </motion.nav>
            </div>
            <Link
              href="/"
              onClick={onBeforeNavigate}
              className="min-w-max self-center mt-8 grayscale"
            >
              <img src="/logo.png" alt="logo" className="h-24s" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [pathname, setPathname] = useState(""); // Store the pathname

  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeEle, setActiveEle] = useState<Element | null>(null);

  useEffect(() => {
    // Set the pathname using window.location.pathname in useEffect (client-side only)
    setPathname(window.location.pathname);
  }, []);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (pathname !== "/") {
      setIsVisible(true);
      return;
    }
    setIsVisible(!(lastScrollPos > currentScrollPos && currentScrollPos < 100));
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  useEffect(() => {
    const linkEles = document.getElementsByClassName("nav-links");
    for (let i = 0; i < linkEles.length; i++) {
      const ele = linkEles.item(i);
      ele?.addEventListener("mouseover", () => setActiveEle(ele));
      ele?.addEventListener("mouseleave", () => setActiveEle(null));
    }
  }, []);

  const LinkDropdown = ({ link }: { link: LinkWithChildren }) => {
    const isOpen = activeEle?.id === link.id;
    return (
      <motion.dialog
        id={link.id}
        open={isOpen}
        animate={{ opacity: 1.0, y: 0 }}
        initial={{ opacity: 0, y: 32 }}
        transition={{ ease: "circOut", duration: 0.15 }}
        className="px-0 rounded-xl z-[100] overflow-hidden min-w-max rounded-b-md shadow-xl shadow-black/[0.2] bg-white "
      >
        {link.children.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="w-full px-6 whitespace-nowrap text-xs h-10 flex items-center hover:text-green-500 hover:bg-gray-100 transition-all"
          >
            {c.title}
          </Link>
        ))}
      </motion.dialog>
    );
  };

  return (
    <header
      className={`${
        isVisible ? "bg-white border" : "pt-5"
      } mt-5 mx-5 rounded-full flex flex-col transition duration-200 ease-in-out z-50`}
    >
      <nav className="w-full flex py-3 items-center justify-between border-gray-200 px-4 xl:px-24">
        <Link href="/" className="min-w-max">
          <img src="/logo.png" alt="logo" className="h-[60px]" />
        </Link>
        <div className="w-full hidden md:block">
          <ul id="desktop-nav" className="w-full flex justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  id={link.id}
                  key={link.id}
                  className={`${
                    isActive
                      ? "text-green-500"
                      : `${
                          isVisible ? "text-black" : "text-black opacity-85"
                        } hover:text-green-500`
                  } relative p-3 text-xs lg:text-sm whitespace-nowrap tracking-wide font-poppins font-medium cursor-pointer transition-all nav-links `}
                >
                  <Link
                    href={link.href}
                    className="uppercase flex items-center font-semibold text-sm py-2"
                  >
                    <p className="text-xs">{link.title}</p>
                    {link.children && <IoMdArrowDropdown size={16} />}
                  </Link>
                  {link.children && <LinkDropdown key={link.id} link={link} />}
                </div>
              );
            })}
          </ul>
        </div>

        <div className="lg:hidden" />
        <MobileNav />
      </nav>
    </header>
  );
};

export default Navbar;
