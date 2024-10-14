'use client'
import Contact from '@/components/contact-page-components/contactus'
import React from 'react'
import { useEffect } from 'react'

const ContactPage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="bg-DB w-full min-h-screen pt-16 px-8 md:px-20">
      <Contact/>
    </div>
  )
}

export default ContactPage;
