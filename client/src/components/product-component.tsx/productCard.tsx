// src/components/product-component.tsx/ProductCard.tsx
import Link from "next/link";
import { Product } from "@/types/all-types";

export default function ProductCard({ product }: { product: Product }) {
   const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337"
  }${product.productImage?.url || '/default-image.jpg'}`; // Adjust image URL based on Strapi

  return (
    <Link
      href={`/product/${product.documentId}`} // Next.js routing
      className="w-full flex flex-col gap-8 cursor-pointer mx-44 items-center"
    >
      <div className="max-w-full overflow-hidden rounded-xl aspect-square">
        <img
          src={imageUrl} // Display product image or fallback to default
          className="w-full aspect-square object-contain object-center hover:scale-110 transition duration-300"
          alt={product.productTitle} // Adjusted for correct field
        />
      </div>
      <section className="flex flex-col gap-1 w-full mb-9">
        <h4 className="text-gray-900 font-bold text-lg tracking-wide">
          {product.productTitle} {/* Adjusted for correct field */}
        </h4>
        <div className="w-full flex justify-between items-center">
          <p className="italic text-xs text-gray-900">
            SKU: {product.SKU} {/* Display SKU */}
          </p>
        </div>
      </section>
    </Link>
  );
}
