'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ServiceData } from "@/types/all-types"; // Ensure this path is correct
import qs from 'qs';

// Dynamic services data
interface ServicesDataType {
  [key: string]: ServiceData;
}

export default function ServicePage() {
  const params = useParams();
  const serviceId = Array.isArray(params?.documentId) ? params.documentId[0] : params?.documentId; // Ensure `documentId` is always a string

  const [service, setService] = useState<ServiceData | null>(null); // State to hold service data
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    if (serviceId) {
      fetchServices(serviceId); 
    }
  }, [serviceId]);

  // Fetch the service data from the API
  async function fetchServices(id: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/services/${id}`;
      const url = new URL(path, baseUrl);

      // Use qs to populate the image
      url.search = qs.stringify({
        populate: {
          serviceImage: {
            fields: ["url", "alternativeText"], // Fetch the image URL and alt text
          },
          heroImage: {
            fields: ["url", "alternativeText"], // Fetch the hero image URL and alt text
          },
        },
      });

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`Failed to fetch service with id ${id}. Status: ${res.status}`);
      }

      const data = await res.json();
      const serviceData = data.data;

      if (!serviceData) {
        throw new Error(`Service not found for id ${id}`);
      }

      console.log("Fetched Service Data from API:", serviceData);
      setService(serviceData);
    } catch (error: any) {
      console.error("Error fetching the service:", error);
      setError(error.message || "An error occurred while fetching the service.");
    }
  }

  return (
    <main className="flex flex-col gap-20 mb-40">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : service ? (
        <>
          <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${service.heroImage?.url}`}
              alt={service.heroImage?.alternativeText || service.heroHeadings}
              className="object-cover w-full h-full"
            />
            <h1 className="text-2xl md:text-5xl text-white font-semibold tracking-wide absolute top-[50%] left-1/2 -translate-x-1/2 bg-gradient-to-t bg-opacity-25 from-black to-transparent from-50% text-center h-full w-full">
              {service?.heroHeadings}
            </h1>
          </div>

          <div className="px-4 md:px-20 xl:px-40 w-full flex flex-col gap-20">
            <div className="w-full flex gap-20">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${service.serviceImage?.url}`}
                alt={service.serviceImage?.alternativeText || service.heroHeadings}
                className="hidden lg:block w-[50%]"
              />
              <section
                className="prose w-full"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-20">
              <section
                className="prose w-full"
                dangerouslySetInnerHTML={{ __html: service.advertisement }}
              />
              <section
                dangerouslySetInnerHTML={{ __html: service.about }}
              />
            </div>
          </div>
        </>
      ) : (
        <p>Loading service data...</p>
      )}
    </main>
  );
}
