'use client'

import { Trash2 ,CircleCheck ,CircleX } from "lucide-react";
import { formatter } from "@/lib/utils";
import watchCart from "@/hooks/watchlistStore";
import useCart from "@/hooks/addtocardStore";
import { useRouter } from "next/navigation";
import { useAuth } from '@clerk/clerk-react';
import { format } from "date-fns";



const SmallCard = ({product,type}) => {

    const {userId} = useAuth()
    const {removeItemWatch} = watchCart();
    const {removeItem} = useCart()

    const router = useRouter()
 
    const handleRemove = (id)=>{
        if(type === "watchlist"){
            removeItemWatch(id)
        }
        if(type === "cart"){
            removeItem(id)
        }
    }

    const handleRout = (id)=>{

        if(type === "watchlist"){
            router.push(`/product/${id}`)
        }

        if(type === "cart"){
            router.push(`/cart/${userId}`)
        }

    }

    //discount handling
    const discountPrice = product.price - (product.price * product.discount / 100);

    let price = product.price

    if(product.discount > 0  && product.discount){
         price  = discountPrice
    }



    return ( 
        <>
           { type === "watchlist" || type === "cart" ? 
           
           <div className="bg-gray-300 hover:bg-gray-400 my-1 py-2 px-5 mx-1 rounded-2xl">
                <div className="flex flex-row items-center justify-between ">
                    <div className="flex flex-row items-center cursor-pointer" onClick={()=>handleRout(product.id)}>
                        <img src={product.imageUrls[0].url} alt="" className="w-12 h-12 rounded-md"/>
                        <div className="flex flex-col ml-2">
                            <p className="text-sm font-semibold">{product.name}</p>
                            <p className="text-xs text-gray-500">{formatter.format(price)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <button className="text-xs text-red-700" onClick={() => handleRemove(product.id)}>
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
                :
            <div className="bg-gray-300 my-1 py-2 px-5 mx-1 rounded-2xl flex justify-between">
                <h4 className="text-gray-700 font-medium">
                    {product.message}
                    <p className="text-gray-500 text-xs">
                        {format(product.time, "MMM d, yyyy h:mm a")}
                    </p>
                </h4>
                <div>
                    {product.status === "SUCCESS" ? 
                    <div className="flex items-center text-green-500">
                        <CircleCheck size={20} />
                    </div>
                    :
                    <div className="flex items-center text-red-500">
                        <CircleX size={20} />
                    </div>
                    }
                </div>
                
            </div>
            }
        </>
     );
}
 
export default SmallCard;