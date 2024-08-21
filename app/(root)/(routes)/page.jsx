
import getTopDiscountedProducts from "@/actions/get-topDisProducts";
import Footer from "@/components/footer";
import { NavigationMenubar } from "@/components/mainNav-fontpage";
import CarouselPlugin from "@/components/ImageScrolling";
import FrontFullProducts from "@/components/frontFullProduct";
import getTopSellingProducts from "@/actions/get-topSellings";
import getTopPerformStore from "@/actions/get-topStores";
import Chat from "@/components/chat";



const HomePage = async() => {

  const disProducts = await getTopDiscountedProducts();
  const topSelling  = await getTopSellingProducts();
  const stores = await getTopPerformStore();

  return ( 
    <>
 
      
      <div className="px-4 flex justify-between items-center">
          <h1>Logo</h1>  
          <NavigationMenubar/>
      </div>
      <Chat/> 
      <CarouselPlugin />
      <FrontFullProducts initialProduct={disProducts}topSelling={topSelling} stores={stores}/>
      <Footer/>
      
      
     
    
    </>
   );
}
 
export default HomePage;