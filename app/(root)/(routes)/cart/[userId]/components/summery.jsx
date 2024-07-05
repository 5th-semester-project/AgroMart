'use client'

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/addtocardStore";
import { formatter } from "@/lib/utils";



const Summery = () => {

    const cart = useCart();



    //subtotal 
    const basePriceTotal = cart.items.reduce((acc, item) => {
        return acc + item.price;
    },0)

    //discount
    const discountTotal = cart.items.reduce((acc, item) => {

        const discount_value  = (item.price * (item.discount / 100));

        return acc + discount_value;
    },0)

    //delivery charge
    const deliveryCharge = basePriceTotal*0.05;


    //subtotal
    const subTotal = basePriceTotal - discountTotal + deliveryCharge;

    return ( 
        <div className="rounded-lg bg-gray-100 px-10 py-5  md:mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-8">
                Order Summery
            </h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 ">
                        Base amount
                    </div>
                    <p>{formatter.format(basePriceTotal)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 ">
                        DiscountValue
                    </div>
                    <p className="text-red-700 font-semibold text-xs">- {formatter.format(discountTotal)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 ">
                    DeliveryCharge
                    </div>
                    <p className="text-green-700 font-semibold text-xs">+ {formatter.format(deliveryCharge)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-semibold text-gray-900 ">
                    SubTotal
                    </div>
                    <p className="font-bold">{formatter.format(subTotal)}</p>
                </div>
            </div>
            <Button disabled={cart.items.length === 0} className="w-full mt-6" onClick={()=>{}}>
                Checkout
            </Button>
        </div>
     );
}
 
export default Summery;