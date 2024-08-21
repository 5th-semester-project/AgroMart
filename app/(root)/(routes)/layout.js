

import { ProductPreview } from "@/components/buyer-components/expand-view";
import Chat from "@/components/chat";



const MainPageLayout = ({children}) => {
    return ( 
        <>
         <Chat/>
        <ProductPreview/>
        {children}
        
        </>
     );
}
 
export default MainPageLayout;