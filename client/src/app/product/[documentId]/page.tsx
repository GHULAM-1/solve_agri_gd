'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/all-types";
import { toast } from "react-hot-toast";
import qs from 'qs';

export default function ProductPage() {
  const params = useParams();
  
  const productId = Array.isArray(params?.documentId) ? params.documentId[0] : params?.documentId;
  console.log("Product ID:", productId);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId); 
    }
  }, [productId]);

  async function fetchProduct(id: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/products/${id}`;
      const url = new URL(path, baseUrl);

      

      // Use qs to populate the image
      url.search = qs.stringify({
        populate: {
          productImage: {
            fields: ["url", "alternativeText"], // Fetch the image URL and alt text
          },
        },
      });

      const res = await fetch(url.toString());

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();
      const productData = data.data; 

      console.log("Fetched Product Data from API:", productData);

      setProduct(productData);
    } catch (error) {
      console.error("Error fetching the product:", error);
      toast.error("Error fetching the product.");
    }
  }

  return (
    <main className="my-40 px-4 md:px-20 xl:px-40 w-full flex flex-col">
      {product ? (
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Directly Display Product Image */}
          <div className="w-full md:w-1/2 flex flex-col gap-8 lg:gap-20">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.productImage?.url}`} // Assuming productImage is always present
              alt={product.productImage?.alternativeText || product.productTitle}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-8 lg:gap-20">
            <p className="text-sm font-bold text-gray-500 italic">{`${product.productCategory} > ${product.productSubCategory}`}</p>
            <section className="flex flex-col gap-4">
              <h2 className="md:text-2xl font-semibold tracking-wide">
                {product.productTitle}
              </h2>
              <p
                className="prose"
                dangerouslySetInnerHTML={{ __html: product.productDescription || "" }}
              />
            </section>
            <p className="md:text-lg border-t-2 pt-8">
              <span className="font-medium">SKU:</span> {product.SKU}
            </p>
            <p className="md:text-lg">
              <span className="font-medium">Price:</span> ${product.productPrice}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading product data...</p>
      )}
    </main>
  );
}
