'use client'

import { Trash2 } from "lucide-react";
import { formatter } from "@/lib/utils";
import watchCart from "@/hooks/watchlistStore";
import useCart from "@/hooks/addtocardStore";
import { useRouter } from "next/navigation";



const SmallCard = ({product,type}) => {

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
            router.push(`/product/${id}`)
        }
       
    }

    //discount handling
    const discountPrice = product.price - (product.price * product.discount / 100);

    let price = product.price

    if(product.discount > 0  && product.discount){
         price  = discountPrice
    }



    return ( 
        <div>
            <div className="flex flex-row items-center justify-between py-4 px-5">
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
     );
}
 
export default SmallCard;