

import getBuyerData from "@/actions/get-buyerdata";
import DelivaryDetails from "./components/delivary-details";
import BuyerRegModal from "@/components/modals/delivary-modal";
import ItemList from "./components/itemlist";

export const revalidate =0;

const CartPage = async({params}) => {

    const buyer = await getBuyerData(params.userId);

    return ( 
        <div>
            <div>
                <BuyerRegModal initialdata={buyer}/>
                <DelivaryDetails
                    buyer={buyer}
                />
                <h1 className="font-bold text-xl px-4">Shopping Cart Items</h1>
                <ItemList/>
            </div>

        </div>
     );
}
 
export default CartPage;