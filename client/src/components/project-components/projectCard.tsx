import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/all-types"; // Adjust the import path as needed

export default function ProjectCard({ project }: { project: Project }) {
  // Truncate the subtitle and title if they exceed the given length
  const truncatedSubtitle = project.projSubTitle.length > 30 
    ? project.projSubTitle.substring(0, 30) + "..." 
    : project.projSubTitle;

  const truncatedTitle = project.projTitle.length > 40 
    ? project.projTitle.substring(0, 40) + "..." 
    : project.projTitle;

    const imageUrl = `${
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
    }${project.projImage?.url || '/default-image.jpg'}`;

  return (
    <Link href={`/projects/${project.documentId}`} className="h-[430px] rounded-2xl shadow-md p-3 relative overflow-hidden">
      <div className="h-[240px] overflow-hidden">
        {/* Use Next.js Image component for optimized image loading */}
        <Image 
          src={imageUrl} 
          alt={project.projTitle} 
          className="rounded-2xl hover:scale-110 duration-300 transition cursor-pointer w-full h-full object-cover" 
          width={400} 
          height={300} 
        />
      </div>
      <h2 className="text-2xl text-center mt-5 font-semibold">
        {truncatedTitle}
      </h2>
      <h3 className="text-center text-gray-600 text-lg mt-5">
        {truncatedSubtitle}
      </h3>
    </Link>
  );
}
