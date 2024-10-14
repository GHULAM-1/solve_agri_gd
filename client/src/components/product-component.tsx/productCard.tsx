import Link from "next/link";
import { Product } from "@/types/all-types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product._id}`} // Next.js routing
      className="w-full flex flex-col gap-4 cursor-pointer"
    >
      <div className="max-w-full overflow-hidden rounded-xl aspect-square">
        <img
          src={product.image}
          className="w-full aspect-square object-contain object-center hover:scale-110 transition duration-300"
          alt={product.title} // Add alt attribute for better accessibility
        />
      </div>
      <section className="flex flex-col gap-1 w-full">
        <h4 className="text-gray-900 font-bold text-lg tracking-wide">
          {product.title}
        </h4>
        <div className="w-full flex justify-between items-center">
          <p className="italic text-xs text-gray-900">{`${product.category} > ${product.subcategory}`}</p>
        </div>
      </section>
    </Link>
  );
}
