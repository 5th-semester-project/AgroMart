'use client'

import  React,{useState,useEffect} from "react"
import { cn, formatter } from "@/lib/utils";
import StarRatings from 'react-star-ratings';
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart,Bookmark } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProductCard({product}) {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])

    const discountPrice = product.price - (product.price * product.discount / 100);

    if(!isMounted) return null;

  return (
    <Card className="w-[270px] hover:scale-105 transition hover:shadow-md cursor-pointer">
        <CardHeader className="relative">
            <div className="absolute inset-y-4 ">
                <p className="bg-green-600 text-white text-xl font-semibold p-3 rounded-full italic">{product.discount}% </p>
            </div>
            <img 
                src={product.imageUrls[0].url}
                alt="product" 
                className="w-full h-[280px] object-cover rounded-lg" 
            />
            <div className="opacity-40  hover:opacity-100 transition absolute w-full bottom-5 ">
                  <div className="flex gap-x-5 justify-center items-center">
                      <IconButton
                          onClick={()=>{}}
                          icon={<Expand size={20} className="text-gray-600"/>}
                      
                      />
                      <IconButton
                          onClick={()=>{}}
                          icon={<ShoppingCart size={20} className="text-gray-600"/>}
                      />
                      <IconButton
                          onClick={()=>{}}
                          icon={<Bookmark size={20} className="text-gray-600"/>}
                      />
                  </div>
              </div>
        </CardHeader>
      <CardTitle className="px-3 overflow-hidden mr-3">{product.name}</CardTitle>
      <CardDescription className="ml-3 flex gap-4 my-1">

        {/* have to update after creating the rating schema */}
        <StarRatings
          rating={4}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="15px"
          starSpacing="0.5px"
          />

          {/* have to update after create the orders schema */}
        <p className="text-sm text-muted-foreground">5000+ sold</p>

      </CardDescription>
      <div className="flex items-baseline gap-x-3 gap-y-0 ml-3 my-4">
         <p className={cn("text-lg font-bold text-black  ", (product.discount >0) && "line-through text-muted-foreground text-sm font-semibold italic")}>{formatter.format(product.price)}</p> 
         { (product.discount >0) &&<p className={cn("text-lg font-bold text-black ")}>{formatter.format(discountPrice)}</p>}
      </div>
    </Card>
  )
}