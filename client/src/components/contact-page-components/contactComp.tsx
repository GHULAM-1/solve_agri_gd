'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import LoadingButton from '../Button/LoadingButton';
import axios from 'axios';

interface ContactCompProps {
    title: string;
    desc: string;
}

interface ContactInfo {
    phone1: string;
    phone2?: string;
    email: string;
    address: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
}

const ContactComp: React.FC<ContactCompProps> = ({
    title,
    desc
}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null); // State for contact info

    // Fetch contact information from Strapi API
    useEffect(() => {
        async function fetchContactInfo() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/api/contact`);
                setContactInfo(response.data.data.attributes); // Adjust based on your API structure
            } catch (error) {
                console.error("Error fetching contact information", error);
                toast.error('Error fetching contact information');
            }
        }

        fetchContactInfo();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (name.length === 0) {
            toast.error('Please enter your name');
            return;
        }
        if (email.length === 0 || !email.includes("@") || email.includes(" ") || !email.includes(".") || email.includes("@.")) {
            toast.error('Please enter a valid email');
            return;
        }
        if (message.length === 0) {
            toast.error('Please enter your message');
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/contact`, { name, email, message });
            toast.success('Message sent successfully');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className='w-full md:mt-20 flex'>
                <form className='w-full'>
                    <div className='flex flex-col md:w-2/3 gap-4'>
                        <h1 className='text-4xl text-white font-medium mb-4'>{title}</h1>
                        <p className='text-white'>{desc}</p>
                        <input
                            className="shadow bg-transparent text-white appearance-none placeholder:text-gray-200 border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value); }} />
                        <input
                            className="shadow placeholder:text-gray-200 appearance-none bg-transparent border text-white rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                        <textarea
                            className="shadow bg-transparent placeholder:text-gray-200 min-h-[90px] text-white appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Message" value={message} onChange={(e) => { setMessage(e.target.value); }}></textarea>

                        <div className='mt-4 max-w-[200px]'>
                            <LoadingButton
                                isLoading={submitting}
                                text="Submit"
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* Display Contact Information */}
            {contactInfo && (
                <div className="mt-8">
                    <h3 className="text-white text-xl">Contact Information:</h3>
                    <p className="text-white">Address: {contactInfo.address}</p>
                    <p className="text-white">Phone 1: {contactInfo.phone1}</p>
                    {contactInfo.phone2 && <p className="text-white">Phone 2: {contactInfo.phone2}</p>}
                    <p className="text-white">Email: {contactInfo.email}</p>

                    {/* Social Media Links */}
                    <div className="flex gap-4 mt-4">
                        {contactInfo.facebook && (
                            <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer">
                                <img src="/facebook-icon.png" alt="Facebook" />
                            </a>
                        )}
                        {contactInfo.instagram && (
                            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer">
                                <img src="/instagram-icon.png" alt="Instagram" />
                            </a>
                        )}
                        {contactInfo.linkedin && (
                            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                <img src="/linkedin-icon.png" alt="LinkedIn" />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactComp;
