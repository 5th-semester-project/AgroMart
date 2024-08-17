"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/ui/heading";

import SearchBar from "@/components/searchbar";
import HighestDesProductList from "@/components/buyer-components/highest-descounted-products";
import getSearchProducts from "@/actions/get-searchProduct";



const FrontFullProducts = ({ initialProduct }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [products, setProducts] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;


  const handleSearch = async (location, category) => {
    setLoading(true);

    try {
        const result = await getSearchProducts(location, category);
        setSearchResult(result);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setSearchResultDisplay(true);
  }

  return (
    <>
      <div className="flex absolute inset-0 justify-center items-center z-30">
      <SearchBar onSearch={handleSearch} />
      </div>
      
      {!searchResultDisplay && (
        <>
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
      </>
      )}

      {searchResultDisplay && <div>filterbox</div>}
    </>
  );
};

export default FrontFullProducts;
