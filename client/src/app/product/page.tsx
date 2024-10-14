'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // For getting query params in app directory
import { PageInfo, Product, Project } from "@/types/all-types";
import ProductCard from "@/components/product-component.tsx/productCard"; // Adjust the import path
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const subcategory = searchParams.get("subcategory") || "all";
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [products, setProducts] = useState<Product[] | Project[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchProducts();
  // }, [category, subcategory, limit]);

  // async function fetchProducts() {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URI}/products?category=${category}&subcategory=${subcategory}&limit=${limit}`
  //     );
  //     const data = res.data;
  //     setPageInfo({
  //       currentPage: data.currentPage,
  //       totalPages: data.totalPages,
  //     });
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  //   setLoading(false);
  // }

  async function getTeamMembers() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const path = "/api/products";
  
    const url = new URL(path, baseUrl);
  
    const res = await fetch(url);
  
    if (!res.ok) throw new Error("Failed to fetch team members");
  
    const data = await res.json();
    console.log(data);
  
    return data;
  }
  
  
    const teamMembers = await getTeamMembers();
    console.log(teamMembers);
  
    
    return (
      <>
        <main className="w-full my-40 px-4 md:px-20 xl:px-40 grid gap-x-8 gap-y-16 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: limit }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Skeleton height={250} className="mb-3" width={230} />
                  <Skeleton count={2} width={230} />
                </div>
              ))
            : products.map((p) => (
                <ProductCard key={p._id} product={p as Product} />
              ))}
          {products.length === 0 && !loading && (
            <div className="text-2xl font-medium">No products found</div>
          )}
        </main>
        {pageInfo && (
          <div className="flex justify-center mt-10">
            {/* Add pagination buttons here based on pageInfo */}
          </div>
        )}
      </>
    );
  }


