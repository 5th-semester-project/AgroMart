'use client'

import { ShoppingCart, CreditCard, MessageCirclePlus } from "lucide-react";
import { formatter } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import CustomButton from "@/components/ui/custom-button";
import Gallery from "@/components/buyer-components/gallery";
import useCart from "@/hooks/addtocardStore";
import StarRatings from "react-star-ratings";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Info = ({product}) => {
    
    const cart = useCart();
    
    const onAddToCard =(event)=>{
        event.stopPropagation();
  
        cart.addItem(product);
      }

    if(!product) return null;

    const discountPrice = product.price - (product.price * (product.discount / 100));
    
    return ( 
        <div className="py-6 w-full">
            <div className="flex flex-row justify-evenly">
                    <div className="w-2/5">
                        <Gallery images={product.imageUrls} />
                    </div>
                    <div className="w-2/5 pt-4">
                        <div>
                              <div className=" text-gray-800 text-2xl font-bold">{product.name}</div>
                              <h1 className="font-medium text-gray-800 text-semibold">{product.mainCategory} | {product?.category?.name}</h1>
                              <div className="flex gap-4 my-1">
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
                              </div>
                              <div className="flex items-baseline gap-x-3 gap-y-0 my-3">
                                <p className={cn("text-2xl font-bold text-black  ", (product.discount >0) && "line-through text-muted-foreground text-lg font-semibold italic")}>{formatter.format(product.price)}</p> 
                                { (product.discount >0) &&<p className={cn("text-3xl font-bold text-rose-800 ")}>{formatter.format(discountPrice)}</p>}
                              </div>
                              <Separator/>
                              <div className="flex gap-4 mt-2">
                                <CustomButton
                                    onClick={onAddToCard}
                                    icon={<ShoppingCart size={20} className="text-gray-600"/>}
                                    name="Add to cart"
                                />
                                <CustomButton
                                    onClick={()=>{}}
                                    icon={<CreditCard size={20} className="text-gray-600"/>}
                                    name="Buy now"
                                />
                                <CustomButton
                                    onClick={()=>{}}
                                    icon={<MessageCirclePlus size={20} className="text-gray-600"/>}
                                    name="Contact seller"
                                    variant="outline"
                                    className="bg-gray-50 hover:bg-gray-100"
                                />
                              </div>
                              <div className="pt-4">
                                <h2 className="text-md font-semibold text-gray-800 pb-3">Description</h2>
                                <p className="text-sm">{product.description}</p>
                              </div>
                              <Link
                                href={`/store/${product.storeId}`}
                              >
                                <h2 className="text-blue-600 font-semibold text-lg py-6">Explore More Products...</h2>
                              </Link>
                              
                        </div>
                    </div>
                </div>

        </div>
     );
}
 
export default Info;