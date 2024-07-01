

import getProduct from "@/actions/get-product";
import Info from "./component/info";
import CustomerReviews from "./component/reviewTab";


const ProductPage = async({params}) => {

    
    const data = await getProduct(params.productId);

    console.log("product",data);

    return ( 
        <div className="px-4">
          <Info product={data} />
          <CustomerReviews />
        </div>
     );
}
 
export default ProductPage;