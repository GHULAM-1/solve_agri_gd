'use client';

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { ServicesData } from "@/data/services-data"; // Ensure the import path is correct
import { ServiceData } from "@/types/all-types";

// Dynamic services data
interface ServicesDataType {
  [key: string]: ServiceData;
}

// Convert the URL name to camelCase for matching keys in ServicesData
function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export default function ServicePage() {
  const params = useParams();
  
  // Retrieve the dynamic service name from the URL
  const name = Array.isArray(params?.services) ? params.services[0] : params?.services;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, [name]);

  // Convert the name from the URL to match the keys in ServicesData
  const data = (ServicesData as ServicesDataType)[toCamelCase(name || "")];

  // If no matching service is found, return a 404 page
  if (!data) {
    return notFound(); // Trigger a 404 page in Next.js
  }

  return (
    <main className="flex flex-col gap-20 mb-40">
      <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
        <img
          alt={data.hero.heading}
          src={
            data.hero.heading === "Advisory Services"
              ? "/services/AS_S.jpg"
              : data.hero.heading === "Community Development"
              ? "/services/CD_S.jpg"
              : data.hero.heading === "Solve Agri & Dairy Institute"
              ? "/services/ADI_S.jpg"
              : data.hero.heading === "Agricuture"
              ? "/services/AB_S.jpg"
              : "/services/AB_S.jpg" // Default fallback image
          }
          className="object-cover w-full h-full"
        />
        <h1 className="text-2xl md:text-5xl text-white font-semibold tracking-wide absolute top-[50%] left-1/2 -translate-x-1/2 bg-gradient-to-t bg-opacity-25 from-black to-transparent from-50% text-center h-full w-full">
          {data.hero.heading}
        </h1>
      </div>

      <div className="px-4 md:px-20 xl:px-40 w-full flex flex-col gap-20">
        <div className="w-full flex gap-20">
          <img
            src={data.image}
            alt={data.hero.heading}
            className="hidden lg:block w-full"
          />
          <section
            className="prose w-full"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-20">
          <section
            className="prose w-full"
            dangerouslySetInnerHTML={{ __html: data.advertisement }}
          />
          <section
            className="prose w-full"
            dangerouslySetInnerHTML={{ __html: data.about }}
          />
        </div>
      </div>
    </main>
  );
}
