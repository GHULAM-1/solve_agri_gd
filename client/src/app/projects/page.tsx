'use client'; // Marks this component as a Client Component

import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "@/components/project-components/projectCard";
import { PageInfo, Project } from "@/types/all-types";

interface ProductsPageProps {
  category: string;
  limit: number;
}

export default function ProjectsPage({
  category = "all",
  limit = 10,
}: ProductsPageProps) {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URI}/projects?category=${category}&limit=${limit}`
        );
        const data = res.data;
        setPageInfo({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
        });
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [category, limit]);

  return (
    <div className="w-full my-40 px-4 md:px-20 xl:px-40 grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-3">
      {loading && <div>Loading projects...</div>}
      {!loading && projects.length === 0 && (
        <div className="text-2xl font-medium">No projects found</div>
      )}
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
