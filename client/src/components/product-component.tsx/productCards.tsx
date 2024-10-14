import LoadingButton from "../Button/LoadingButton";
import AnimateToView from "../AnimateToView";

const ProductCat = () => {

  const cats = [
    {
      name: "Animal Nutrition",
      image: "/productcard/Animal-Nutrition.jpeg",
      slug: "/products?category=animal-nutrition",
    },
    {
      name: "Calf",
      image: "/productcard/calf.jpg",
      slug: "/products?category=calf-rearing",
    },
    {
      name: "Genetics",
      image: "/productcard/genetics.png",
      slug: "/products?category=genetics",
    },
    {
      name: "Hygiene",
      image: "/productcard/hg.png",
      slug: "/products?category=genetics",
    },

    {
      name: "Equipment",
      image: "/productcard/equipment.jpg",
      slug: "/products?category=equipment-and-machinery",
    },
  ];

  return (
    <div className="px-4 md:px-20 xl:px-40 md:py-20 py-10 w-full">
      <AnimateToView>
        <h1 className="md:text-[40px] text-[30px] mb-3 text-white">Our featured products.</h1>
      </AnimateToView>
      <div className="flex mt-5">
        <div className=" w-full flex flex-col gap-12">
          <AnimateToView className=" flex w-full gap-4">
            <div className="h-[1px] ml-[-30px] mt-3 w-20 bg-DG" />
            <p className=" text-white text-lg md:text-xl font-light">
              Explore our carefully chosen featured products below, specifically
              curated to meet all your essential livestock needs with ease.{" "}
            </p>
          </AnimateToView>
          <div className="md:flex grid grid-cols-2 gap-4 flex-wrap md:gap-10">
            {cats.map((cat, index) => (
              <div key={index}>
                <h1 className="text-white md:text-lg">{cat.name}</h1>
                <div className="w-full h-48 mt-2 rounded-lg mb-5 overflow-hidden">
                  <img
                    className="w-full h-full md:max-w-[200px] hover:scale-110 transition duration-200 cursor-pointer object-cover"
                    src={cat.image}
                    alt=""
                  />
                </div>
                <LoadingButton
                  isLoading={false}
                //   onClick={() => {
                //     navigate(cat.slug);
                //   }}
                  text="See Products"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCat;
