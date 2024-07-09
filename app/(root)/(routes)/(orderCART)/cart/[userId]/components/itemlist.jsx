'use client'

import useCart from "@/hooks/addtocardStore";
import { X } from "lucide-react";
import { formatter } from "@/lib/utils";
import { cn } from "@/lib/utils";


const ItemList = () => {

    const cart = useCart();

    const getDisPrice = (price, discount) => {
        return price - (price * (discount / 100));
    }

    return ( 
        <div className="space-y-2 p-4">
            {cart.items.map((item)=>(
                <div key={item.id} className="relative flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-gray-100">
                    <div className="flex">
                        <img src={item.imageUrls[0].url} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                        <div className="ml-4">
                            <h1 className="font-bold text-lg">{item.name}</h1>
                            <div className="flex items-baseline gap-x-3 gap-y-0">
                                <p className={cn("text-lg font-bold text-black  ", (item.discount >0) && "line-through text-muted-foreground text-sm font-semibold italic")}>{formatter.format(item.price)}</p> 
                                { (item.discount >0) &&<p className={cn("text-lg font-bold text-black ")}>{formatter.format(getDisPrice(item.price,item.discount))}</p>}
                            </div>
                        </div>
                    </div>
                    <X 
                    size={32} 
                    className="absolute top-0 right-0 text-red-500 cursor-pointer bg-red-200 p-1.5 rounded-full hover:bg-red-500 hover:text-white" 
                    onClick={()=>cart.removeItem(item.id)}
                    />
                </div>
            ))}
            {cart.items.length === 0 && <p className="text-neutral-500 text-center">No Items added to cart</p>}
        </div>
     );
}
 
export default ItemList;