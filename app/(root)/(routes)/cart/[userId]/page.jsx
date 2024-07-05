

import getBuyerData from "@/actions/get-buyerdata";

const CartPage = async({params}) => {

    const buyer = await getBuyerData(params.userId);
    return ( 
        <div>
            cart page
            {buyer.name}
        </div>
     );
}
 
export default CartPage;