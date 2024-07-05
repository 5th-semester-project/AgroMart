

import getBuyerData from "@/actions/get-buyerdata";
import DelivaryDetails from "./components/delivary-details";
import BuyerRegModal from "@/components/modals/delivary-modal";

export const revalidate =0;

const CartPage = async({params}) => {

    const buyer = await getBuyerData(params.userId);

    return ( 
        <div>
            <BuyerRegModal initialdata={buyer}/>
            <DelivaryDetails
                buyer={buyer}
            />
            

        </div>
     );
}
 
export default CartPage;