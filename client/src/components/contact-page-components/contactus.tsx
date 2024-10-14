'use client'
import ContactComp from "./contactComp";
import { motion } from "framer-motion";
import Globe from "../three-js/globe";

const Contact = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.9 }}
                className="flex px-4 md:px-20 xl:px-40 md:flex-row flex-col"
            >
                <div className="md:w-1/2 mt-10">
                    <ContactComp title={"Reach out to us!"} desc="Have any questions or need more information? Don't hesitate to reach out to us via this contact form." />
                </div>
                <div className="md:block hidden">
                    <Globe />
                </div>
            </motion.div>
        </>
    );
}

export default Contact;