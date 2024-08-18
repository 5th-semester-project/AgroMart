

import getTopDiscountedProducts from "@/actions/get-topDisProducts";
import Footer from "@/components/footer";
import { NavigationMenubar } from "@/components/mainNav-fontpage";
import CarouselPlugin from "@/components/ImageScrolling";
import FrontFullProducts from "@/components/frontFullProduct";



const HomePage = async() => {

  const disProducts = await getTopDiscountedProducts();

  return ( 
    <div >
      <div className="px-4 flex justify-between items-center">
          <h1>Logo</h1>
          <NavigationMenubar/>
      </div>
      <CarouselPlugin />
      <FrontFullProducts initialProduct={disProducts}/>
      <Footer/>
    </div>
   );
}
 
export default HomePage;