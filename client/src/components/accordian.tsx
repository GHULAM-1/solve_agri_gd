import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  data,
  isOpen,
  onClick,
}: {
  data: { title: JSX.Element; content: JSX.Element };
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className=" text-green-500 tracking-wide text-lg flex items-center justify-between w-full cursor-pointer"
      >
        {data.title}
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }} className="h-4">
          <div className="h-4">
            <IoIosArrowUp size={16} />
          </div>
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { y: 32 }, open: { y: 0 } }}
              transition={{ duration: 0.2 }}
              className="w-full px-4 py-2 text-sm"
            >
              {data.content}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
