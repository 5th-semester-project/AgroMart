'use client'

import { Trash2 } from "lucide-react";
import { formatter } from "@/lib/utils";
import watchCart from "@/hooks/watchlistStore";
import useCart from "@/hooks/addtocardStore";



const SmallCard = ({product,type}) => {

    const {removeItemWatch} = watchCart();
    const {removeItem} = useCart()
 
    const handleRemove = (id)=>{
        if(type === "watchlist"){
            removeItemWatch(id)
        }
        if(type === "cart"){
            removeItem(id)
        }
    }


    return ( 
        <div>
            <div className="flex flex-row items-center justify-between py-4 px-5">
                <div className="flex flex-row items-center">
                    <img src={product.imageUrls[0].url} alt="" className="w-12 h-12 rounded-md"/>
                    <div className="flex flex-col ml-2">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-gray-500">{formatter.format(product.price)}</p>
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