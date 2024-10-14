import Link from "next/link"; // Import Next.js Link component
import AnimateToView from "../AnimateToView";

const ServiceCat = () => {
  const cats = [
    {
      name: "Advisory Services",
      image: "/services/AS_S.jpg",
      slug: "advisory-services",
    },
    {
      name: "Project Consultancy...",
      image: "/services/123.jpg",
      slug: "community-development",
    },
    {
      name: "SADI - Solve Agri &...",
      image: "/services/training.jpeg",
      slug: "solve-agri-and-dairy-institute",
    },
    {
      name: "Agri Business",
      image: "/services/cd.jpg",
      slug: "agri-business",
    },
  ];

  return (
    <div className="px-4 md:px-20 xl:px-40 md:py-20 py-10 w-full">
      <AnimateToView>
        <h1 className="md:text-[40px] text-[30px] mb-3 text-DG">Our Services.</h1>
      </AnimateToView>
      <div className="flex flex-col gap-12 mt-5">
        <AnimateToView className=" flex w-full gap-4">
          <div className="h-[1px] ml-[-30px] mt-3 w-40 bg-DG" />
          <p className=" text-DG md:text-xl font-light">
            We are committed to offering dependable, high-quality solutions,
            services, and development projects that cater to all your livestock
            and dairy needs, regardless of the size of your operations. Our
            comprehensive range includes personalized solutions, expert
            services, and training programs for sustainable milk and meat
            production, empowering farmers, value chain partners, and processors
            to thrive and maximize their profits.
          </p>
        </AnimateToView>
        <div className="md:flex grid grid-cols-2 gap-4 flex-wrap md:gap-10">
          {cats.map((cat, index) => (
            <div key={index} className="flex md:max-w-[200px] flex-col h-full justify-end">
              <h1 className="md:text-lg text-DG">{cat.name}</h1>
              <div>
                <div className="w-full md:max-w-[200px] h-48 mt-2 rounded-lg mb-5 overflow-hidden">
                  <img
                    className="w-full h-full hover:scale-110 transition duration-200 cursor-pointer object-cover"
                    src={cat.image}
                    alt={cat.name}
                  />
                </div>
                <Link href={`/${cat.slug}`}>
                  <button
                    className="border border-green-600 text-green-600 bg-white py-2 px-12 rounded-full hover:bg-[#a8cf45] hover:text-white transition duration-300"
                  >
                    Learn more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCat;
