

import getProduct from "@/actions/get-product";
import Info from "./component/info";
import CustomerReviews from "./component/reviewTab";
import getSubCatProducts from "@/actions/get-subCatProducts";


const ProductPage = async({params}) => {

    console.log("params ",params);
    const data = await getProduct(params.productId);
    

    console.log("product ",data);

    return ( 
        <div className="px-4">
          <Info product={data} />
          <CustomerReviews />
        </div>
     );
}
 
export default ProductPage;