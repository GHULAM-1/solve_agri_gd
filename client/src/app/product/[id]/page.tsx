'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Updated import to Next.js's way of handling params
import { Product } from "@/types/all-types"; // Assuming this is your type file path
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;

  // Ensure id is treated as a string, even if it's an array
  const productId = Array.isArray(id) ? id[0] : id;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      fetchProduct(productId); // Pass the adjusted productId
    }
  }, [productId]);

  async function fetchProduct(id: string) {
    try {
      const res = await axios.get(`http://localhost:4000/products/${id}`);
      if (res.status === 200) {
        setProduct(res.data);
      } else {
        toast.error("Unable to fetch the product.");
      }
    } catch (error) {
      toast.error("Error fetching the product.");
    }
  }

  return (
    <main className="my-40 px-4 md:px-20 xl:px-40 w-full flex flex-col">
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
        {product ? (
          <>
            <img
              src={product.image}
              alt={product.title}
              className="md:w-[420px] h-[420px] object-contain"
            />
            <div className="w-full md:w-1/2 flex flex-col gap-8 lg:gap-20">
              <p className="text-sm font-bold text-gray-500 italic">{`${product.category} > ${product.subcategory}`}</p>
              <section className="flex flex-col gap-4">
                <h2 className="md:text-2xl font-semibold to-black tracking-wide">
                  {product.title}
                </h2>
                <p
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: product.description || "" }}
                />
              </section>
              <p className="md:text-lg border-t-2 pt-8">
                <span className="font-medium">SKU:</span>
                {product.SKU}
              </p>
            </div>
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </main>
  );
}
