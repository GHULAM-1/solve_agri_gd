'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Next.js useParams for dynamic routing
import axios from "axios";
import { toast } from "react-hot-toast";
import { Project } from "@/types/all-types"; // Adjust the import path as necessary

export default function ProjectPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // Ensure `id` is always a string

  const [project, setProject] = useState<Project | null>(null); // State to hold project data

  async function fetchProject(id: string) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/projects/${id}`);
      if (res.status === 200) {
        setProject(res.data); // Set the project data
      } else {
        toast.error("Unable to fetch the project.");
      }
    } catch (error) {
      toast.error("Error fetching the project.");
    }
  }

  useEffect(() => {
    if (id) {
      fetchProject(id); // Fetch the project data when `id` is available
    }
  }, [id]);

  // Render the project data or a loading state
  return project ? (
    <main className="flex my-40 flex-col gap-10 px-4 md:px-20 lg:px-32 xl:px-64">
      <section className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl md:text-3xl text-black tracking-wide font-semibold">
          {project.header}
        </h1>
        <h3 className="text-gray-500 tracking-wide">{project.title}</h3>
      </section>

      <div className="w-full grid-cols-1 rounded-3xl max-h-[600px] overflow-hidden gap-x-8 gap-y-12">
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.title}_${i}`}
            className="w-full object-cover object-center"
          />
        ))}
      </div>

      <section className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
    </main>
  ) : (
    <p>Loading...</p>
  );
}
