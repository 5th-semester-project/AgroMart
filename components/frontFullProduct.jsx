"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/ui/heading";

import SearchBar from "@/components/searchbar";
import HighestDesProductList from "@/components/buyer-components/highest-descounted-products";



const FrontFullProducts = ({ initialProduct }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex absolute inset-0 justify-center items-center z-30">
        <SearchBar />
      </div>
      
      <div className="flex my-5 w-full items-center justify-center">
        <Heading
          title="Top Discounted Products"
          description="Get the best deals on the top discounted products.Only for today!"
          className="text-center"
        />
      </div>
      <HighestDesProductList products={initialProduct} />
      <div className="flex my-5 w-full items-center justify-center">
        <Heading
          title="Top selling Products"
          description="Top selling products of the week"
          className="text-center"
        />
      </div>
      <HighestDesProductList products={initialProduct} />
      <div className="flex my-5 w-full items-center justify-center">
        <Heading
          title="Top selling Stores"
          description="Explore more products from the top selling stores"
          className="text-center"
        />
      </div>
      <HighestDesProductList products={initialProduct} />

      <div>filterbox</div>
    </>
  );
};

export default FrontFullProducts;
