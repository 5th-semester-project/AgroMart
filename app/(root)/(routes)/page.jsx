

import getTopDiscountedProducts from "@/actions/get-topDisProducts";
import Footer from "@/components/footer";
import { NavigationMenubar } from "@/components/mainNav-fontpage";
import HighestDesProductList from "@/components/buyer-components/highest-descounted-products";
import Heading from "@/components/ui/heading";

const HomePage = async() => {

  const disProducts = await getTopDiscountedProducts();

  return ( 
    <div >
      <div className="bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[80vh] w-full" style={{ backgroundImage: "url(/bg-images/brownField.jpg)" }}>
      <div className="px-4 flex justify-between items-center">
          <h1>Logo</h1>
          <NavigationMenubar/>
        </div>
      </div>

      <div className="flex my-5 w-full items-center justify-center">
          <Heading
              title="Top Discounted Products"
              description="Get the best deals on the top discounted products.Only for today!"
              className="text-center"
          />
      </div>
        <HighestDesProductList
          products={disProducts}
        />
      <Footer/>
    </div>
   );
}
 
export default HomePage;